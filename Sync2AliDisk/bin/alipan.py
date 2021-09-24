import base64
import json
import logging
import os
import re
import threading
import time
from collections import defaultdict
import requests

from config.config import UPLOAD_PART_SIZE, DEFAULT_HEADERS, LOCAL_FOLDER_NAME, ALI_FOLDER_NAME, SYNC_DELAY, \
    MAX_THREAD_NUM, WORK_PATH, REFRESH_TOKEN
from utils.file import get_file_info, compute_part_num, get_file_hash, parse_js_data
from utils.qrcodeUtils import create_qr


class BaseAliPan:
    info = []

    def __init__(self, token=None):
        self.token = ""
        self.token_type = ""
        self.refresh_token = token
        self.drive_id = None
        self.folders = {}
        self.headers = DEFAULT_HEADERS
        self.part_size = UPLOAD_PART_SIZE
        self.login_qr_check = {}
        self.login_session = None
        self.lock = threading.Lock()
        if not token or not self.refresh():
            self.get_login_qr()
        else:
            logging.info("token正确登录成功，无需扫描")

    def post(self, url, json=None):
        response = requests.post(url, json=json,
                                 headers=self.headers)
        return response

    def get(self, url, params=None):
        response = requests.get(url, params=params, headers=self.headers)
        return response

    '''
    过期刷新token
    '''

    def refresh(self):
        json = {"refresh_token": self.refresh_token}
        response = requests.post("https://api.aliyundrive.com/token/refresh", json=json)
        if response.status_code == 200:
            data = response.json()
            self.token = data.get("access_token")
            self.token_type = data.get("token_type")
            self.refresh_token = data.get("refresh_token")
            self.drive_id = data.get("default_drive_id")
            self.headers["authorization"] = f"{self.token_type} {self.token}"
            return True
        else:
            logging.error("token错误或已经过期，请扫描登录")
            return False
    '''
    判断文件是否是已经存在了
    '''

    def file_exists(self, parent_file_id, file_info: dict):
        part_num = compute_part_num(file_info, self.part_size)
        data = {"drive_id": self.drive_id,
                "part_info_list": [{"part_number": i + 1} for i in range(part_num)],
                "parent_file_id": parent_file_id,
                "name": file_info.get("file_name"),
                "type": "file",
                "check_name_mode": "auto_rename",
                "size": file_info.get("file_size"),
                "pre_hash": file_info.get("pre_hash")}
        response = self.post("https://api.aliyundrive.com/adrive/v2/file/createWithFolders", data)
        if response.status_code == 409:  # 表示已经存在文件了
            BaseAliPan.info.append("文件已经存在于服务器了")
            return False, response.json()
        else:
            BaseAliPan.info.append("这是一个新文件")
            return True, response.json()

    def complete(self, file_id, upload_id):
        data = {"drive_id": self.drive_id,
                "upload_id": upload_id,
                "file_id": file_id
                }
        response = self.post("https://api.aliyundrive.com/v2/file/complete", json=data)
        BaseAliPan.info.append(response.json())

    def create_with_folders(self, parent_file_id, file_info: dict, mode="file"):
        data = {}
        if mode == "file":
            part_num = compute_part_num(file_info, self.part_size)
            data = {"drive_id": self.drive_id,
                    "part_info_list": [{"part_number": i + 1} for i in range(part_num)],
                    "parent_file_id": parent_file_id,
                    "name": file_info.get("file_name"),
                    "type": "file",
                    "check_name_mode": "auto_rename",
                    "size": file_info.get("file_size"),
                    "content_hash": file_info.get("content_hash"),
                    "content_hash_name": "sha1",
                    "proof_code": file_info.get("proof_code"),
                    "proof_version": "v1"}
        if mode == "dir":
            data = {"drive_id": self.drive_id, "parent_file_id": parent_file_id, "name": file_info["name"],
                    "check_name_mode": "refuse", "type": "folder"}
        response = self.post("https://api.aliyundrive.com/adrive/v2/file/createWithFolders", data)
        return response.json()

    def file_list(self, parent_file_id="root"):
        json = {
            'all': False,
            'drive_id': self.drive_id,
            'fields': "*",
            'image_thumbnail_process': "image/resize,w_400/format,jpeg",
            'image_url_process': "image/resize,w_1920/format,jpeg",
            'limit': 100,
            'order_by': "updated_at",
            'order_direction': "DESC",
            'parent_file_id': parent_file_id,
            'url_expire_sec': 1600,
            'video_thumbnail_process': "video/snapshot,t_0,f_jpg,ar_auto,w_300",
        }
        if parent_file_id:
            json['parent_file_id'] = parent_file_id
        response = self.post("https://api.aliyundrive.com/v2/file/list", json)
        response_json = response.json()
        for item in response_json.get("items"):
            self.folders[item.get('name')] = item
        return response_json

    def get_file_id(self, file_name, parent_file_id="root"):
        self.file_list(parent_file_id)
        return self.folders[file_name]["file_id"]

    def upload_file(self, parent_file_id, file_path):
        start_time = time.time()
        file_info = get_file_info(file_path, self.token)
        status, data = self.file_exists(parent_file_id, file_info)
        if not status:
            # 如果文件已经存在于数据库之中，那么就开始秒传
            BaseAliPan.info.append(self.create_with_folders(parent_file_id, file_info))
        else:
            part_info_list = data.get("part_info_list")
            file_id = data.get("file_id")
            upload_id = data.get("upload_id")
            try:
                with open(file_path, "rb") as f:
                    for part_index, part_info in enumerate(part_info_list):
                        upload_url = part_info.get("upload_url")
                        data = f.read(self.part_size)
                        requests.put(upload_url, data=data)
                    f.close()
            except Exception as e:
                logging.error(e)
            # 确认发送完毕
            self.complete(file_id, upload_id)
        BaseAliPan.info.append(time.time() - start_time)
        BaseAliPan.info.append("完成")

    def get_login_qr(self):
        self.login_session = requests.session()
        self.login_session.get(
            "https://auth.aliyundrive.com/v2/oauth/authorize?client_id=25dzX3vbYqktVxyX&redirect_uri=https%3A%2F%2Fwww.aliyundrive.com%2Fsign%2Fcallback&response_type=code&login_type=custom&state=%7B%22origin%22%3A%22https%3A%2F%2Fwww.aliyundrive.com%22%7D")
        response = self.login_session.get(
            "https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&_csrf_token=8iPG8rL8zndjoUQhrQnko5&umidToken=27f197668ac305a0a521e32152af7bafdb0ebc6c&isMobile=false&lang=zh_CN&returnUrl=&hsiz=1d3d27ee188453669e48ee140ea0d8e1&fromSite=52&bizParams=&_bx-v=2.0.31")
        data = response.json()['content']['data']
        self.login_qr_check["ck"] = data['ck']
        self.login_qr_check["t"] = data['t']
        BaseAliPan.info.append("登录地址" + data['codeContent'])
        create_qr(data['codeContent'])
        self.get_qr_status()

    def get_qr_status(self):
        while True:
            response = self.login_session.post(
                "https://passport.aliyundrive.com/newlogin/qrcode/query.do?appName=aliyun_drive&fromSite=52&_bx-v=2.0.31",
                data=self.login_qr_check)
            data = response.json()["content"]['data']
            qr_code_status = data['qrCodeStatus']
            if qr_code_status == 'NEW':
                BaseAliPan.info.append("等待扫码登录")
            if qr_code_status == 'SCANED':
                BaseAliPan.info.append("请到手机端确认登录")
            if qr_code_status == 'CONFIRMED':
                BaseAliPan.info.append("登录成功")
                pds_login_result = json.loads(base64.b64decode(data['bizExt']).decode("gbk"))['pds_login_result']
                access_token = pds_login_result['accessToken']
                code = self.get_token_login_code(access_token)
                self.get_refresh_token(code)
                self.refresh()
                break
            if qr_code_status == 'EXPIRED':
                BaseAliPan.info.append("二维码已经过期")
                self.get_login_qr()
                break
            time.sleep(5)

    def get_token_login_code(self, token):
        json = {
            'token': token
        }
        headers = {
            "Referer": "https://auth.aliyundrive.com/v2/oauth/authorize?client_id=25dzX3vbYqktVxyX&redirect_uri=https%3A%2F%2Fwww.aliyundrive.com%2Fsign%2Fcallback&response_type=code&login_type=custom&state=%7B%22origin%22%3A%22https%3A%2F%2Fwww.aliyundrive.com%22%7D"
        }
        response = self.login_session.post("https://auth.aliyundrive.com/v2/oauth/token_login", json=json,
                                           headers=headers)
        code = re.findall(r"code=(.*?)\&", response.json()['goto'])[0]
        return code

    def get_refresh_token(self, code):
        json = {
            'code': code
        }
        response = self.login_session.post("https://api.aliyundrive.com/token/get", json=json)
        self.refresh_token = response.json()['refresh_token']
        #     将 refresh_token 备份到本地
        open(os.path.join(WORK_PATH, "static", "refresh_token"), mode='w', encoding="utf-8").write(self.refresh_token)

    def download_file(self, dir_path, file_name, file_id):
        data = {"drive_id": self.drive_id, "file_id": file_id}
        response = self.post("https://api.aliyundrive.com/v2/file/get_download_url", json=data)
        if response.status_code == 200:
            json = response.json()
            if json.get("streams_url"):
                download_url = json["streams_url"]["jpeg"]
            else:
                download_url = json["url"]
            if download_url:
                response = requests.get(download_url, headers={"Referer": "https://www.aliyundrive.com/"})
                if response.status_code == 200:
                    try:
                        with open(os.path.join(dir_path, file_name), "wb") as f:
                            f.write(response.content)
                    except Exception as e:
                        logging.error(e)

    def trash_file(self, file_id):
        json = {"drive_id": self.drive_id, "file_id": file_id}
        self.post("https://api.aliyundrive.com/v2/recyclebin/trash", json=json)

    def get_parent_file_id(self, full_path):
        path_list = full_path.replace(LOCAL_FOLDER_NAME, "").strip(os.path.sep).split(os.path.sep)
        parent_file_id = self.get_file_id(ALI_FOLDER_NAME)
        if path_list[0]:
            for path in path_list:
                parent_file_id = self.get_file_id(path, parent_file_id)
        return parent_file_id


class YxhpyAliPan(BaseAliPan):
    def __init__(self):
        # token_path = os.path.join(WORK_PATH, "static", "refresh_token")
        # if os.path.exists(token_path):
        #     token = open(token_path, mode='r', encoding="utf-8").read()
        # else:
        #     token = ""
        token = REFRESH_TOKEN
        BaseAliPan.__init__(self, token)
        self.start_file_list = defaultdict(bool)
        self.start(LOCAL_FOLDER_NAME)

    '''
    启动的时候遍历所有本地文件
    '''

    def start(self, path):
        path_list = os.listdir(path)
        for path_item in path_list:
            full_path = os.path.join(path, path_item)
            if os.path.isfile(full_path):
                self.start_file_list[full_path] = True
            else:
                self.start_file_list[full_path] = True
                self.start(full_path)

    '''
    用于同步已经存在的文件
    '''

    def sync_path_exists(self, items, path):
        ali_file_dict = {item["name"]: item for item in items}
        for full_path_item, path_item in [(os.path.join(path, path_item), path_item) for path_item in os.listdir(path)]:
            if os.path.isfile(full_path_item):
                file_hash = get_file_hash(full_path_item)
                ali_file_info = ali_file_dict.get(path_item, None)
                if ali_file_info:
                    if file_hash.upper() != ali_file_info["content_hash"].upper():
                        # 版本不一致需要更新版本，查看更新时间更新为最新的
                        local_update_at = os.path.getatime(full_path_item)
                        ali_updated_at = parse_js_data(ali_file_info["updated_at"])
                        if local_update_at > ali_updated_at:
                            # 本地最新上传
                            logging.info("本地文件更改上传最新版本" + full_path_item)
                            self.trash_file(ali_file_dict[path_item]["file_id"])
                            self.upload_file(ali_file_dict[path_item]["parent_file_id"], full_path_item)
                        else:
                            # 远程下载
                            logging.info("网盘文件被更新下载最新版本" + full_path_item)
                            self.download_file(path, path_item, ali_file_dict[path_item]["file_id"])

    def sync_path(self, local_path, parent_file_id):
        items = self.file_list(parent_file_id).get("items", [])
        ali_file_dict = {item["name"]: item for item in items}
        ali_pan_file_list = set(items["name"] for items in items if items['type'] == 'file')
        ali_pan_path_list = set(items["name"] for items in items if items['type'] == 'folder')
        local_file_list = set(
            path for path in os.listdir(local_path) if os.path.isfile(os.path.join(local_path, path)))
        local_path_list = set(
            path for path in os.listdir(local_path) if os.path.isdir(os.path.join(local_path, path)))

        upload_file_list = local_file_list - ali_pan_file_list
        download_file_list = ali_pan_file_list - local_file_list
        # 改变的进行同步
        self.sync_path_exists(items, local_path)
        # # 同步到本地
        # for download_path in ali_pan_path_list:
        #     full_download_path = os.path.join(local_path, download_path)
        #     full_ali_pan_path_id = self.get_file_id(download_path, parent_file_id)
        #     if not self.start_file_list[full_download_path]:
        #         if not os.path.exists(full_download_path):
        #             logging.info("网盘文件夹被同步到本地" + full_download_path)
        #             os.mkdir(full_download_path)
        #             self.start_file_list[full_download_path] = True
        #         self.sync_path(full_download_path, full_ali_pan_path_id)
        for upload_path in local_path_list:
            full_upload_path = os.path.join(local_path, upload_path)
            upload_path_info = ali_file_dict.get(upload_path, None)
            if not upload_path_info:
                logging.info("本地文件夹同步到网盘" + full_upload_path)
                self.start_file_list[full_upload_path] = True
                path_id = self.create_with_folders(parent_file_id, {"name": upload_path}, mode="dir")["file_id"]
            else:
                path_id = upload_path_info["file_id"]
            self.sync_path(full_upload_path, path_id)
        # for download_file in download_file_list:
        #     file_id = self.folders[download_file]["file_id"]
        #     full_file = os.path.join(local_path, download_file)
        #     if not self.start_file_list[full_file]:
        #         logging.info("网盘文件同步到本地" + full_file)
        #         self.download_file(local_path, download_file, file_id)
        #         self.start_file_list[full_file] = True
        # 同步到服务器
        for download_file in upload_file_list:
            full_upload_file = os.path.join(local_path, download_file)
            logging.info("本地文件同步到网盘" + full_upload_file)
            self.start_file_list[full_upload_file] = True
            self.upload_file(parent_file_id, full_upload_file)
            # 同步后，删除文件以及文件夹
            self.del_folder(full_upload_file)
            

    # def remove_sync(self):
    #     for full_file in self.start_file_list:
    #         if self.start_file_list[full_file] and not os.path.exists(full_file):
    #             self.trash_file(self.get_parent_file_id(full_file))
    #             self.start_file_list[full_file] = False
    #             for i in self.start_file_list:
    #                 if i.startswith(full_file):
    #                     self.start_file_list[i] = False
    #             logging.info("本地文件(夹)被删除同步到网盘" + full_file)

    def start_sync(self):
        file_id = self.get_file_id(ALI_FOLDER_NAME)
        while True:
            self.sync_path(LOCAL_FOLDER_NAME, file_id)
            # self.remove_sync()
            time.sleep(SYNC_DELAY)

    def watch_remove(self, t):
        is_break = False
        while not is_break:
            for full_file in self.start_file_list:
                if self.start_file_list[full_file] and not os.path.exists(full_file):
                    t.stop()
                    is_break = True
                    break
            time.sleep(0.1)

    def del_folder(self, path):
        # 同步后，删除文件
        if os.path.exists(path):
            os.remove(path)
        else:
            logging.info('文件不存在，删除失败!')
        # 删除文件夹
        splitPath = path.split(LOCAL_FOLDER_NAME)

        if(len(splitPath) == 2):
            pathArr = splitPath[1].split('/')
            while len(pathArr) > 2:
                pathArr.pop()
                folder = LOCAL_FOLDER_NAME + '/'.join(pathArr)
                try:
                    os.rmdir(folder)
                except Exception as e:
                    break
