import base64
import hashlib
from datetime import datetime

import execjs
import os
from collections import defaultdict
from config.config import WORK_PATH


def compute_part_num(file_info, part_size):
    file_size = file_info.get("file_size")
    return file_size // part_size if file_size % part_size == 0 else file_size // part_size + 1


def get_file_info(file_path: str, access_token):
    res = dict()
    res["file_name"] = os.path.split(file_path)[-1]
    res["file_size"] = os.path.getsize(file_path)
    ctx = execjs.compile(open(os.path.join(WORK_PATH, "js", "en.js")).read())
    js = "0x" + ctx.eval(f"h(m('{access_token}'))")[0:16]
    left = res["file_size"] if res["file_size"] == 0 else int(js, 16) % res["file_size"]
    right = min(left + 8, res["file_size"])
    with open(file_path, 'rb') as f:
        byte_file = f.read()
        sha1 = hashlib.sha1()
        sha2 = hashlib.sha1()
        sha1.update(byte_file[:min(1024, res["file_size"])])
        sha2.update(byte_file)
        res["pre_hash"] = sha1.digest().hex()
        res["content_hash"] = sha2.digest().hex()
        res["proof_code"] = base64.b64encode(byte_file[left: right]).decode()
    return res


def parse_js_data(time):
    t = datetime.strptime(time, "%Y-%m-%dT%H:%M:%S.%fZ")
    return t.timestamp()


# 将所有文件添加到set中，如果
file_list = defaultdict(str)


def get_file_hash(path):
    has1 = hashlib.sha1()
    with open(path, "rb") as f:
        has1.update(f.read())
    return has1.digest().hex()
