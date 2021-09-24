import os

# 将文件切分上传时最大上传大小
UPLOAD_PART_SIZE = 10 * 1024 * 1024
DEFAULT_HEADERS = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
}
# 10秒同步一次
SYNC_DELAY = 10

WORK_PATH = os.path.dirname(os.path.dirname(__file__))

ALI_FOLDER_NAME = "sync"
LOCAL_FOLDER_NAME = "/Users/claude/Downloads/同步阿里网盘"

MAX_THREAD_NUM = 20

REFRESH_TOKEN = ''