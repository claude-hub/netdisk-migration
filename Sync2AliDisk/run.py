import logging

from bin.alipan import YxhpyAliPan
from flask import Flask, render_template
from config.config import ALI_FOLDER_NAME, LOCAL_FOLDER_NAME
from threading import Thread

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

def main():
    ali_pan = YxhpyAliPan()
    logging.info("同步开始，请勿在同步的时候删除文件")
    ali_pan.start_sync()
    logging.info("同步中，检测到文件被删除，等待重新同步")


# @app.route("/")
# def index():
#     data = {"ALI_FOLDER_NAME": ALI_FOLDER_NAME,
#             "LOCAL_FOLDER_NAME": LOCAL_FOLDER_NAME,
#             "info": YxhpyAliPan.info[-3:]}
#     return render_template("index.html", **data)


def start_web():
    app.run("0.0.0.0", 8081)


if __name__ == '__main__':
    t = Thread(target=start_web)
    t.start()
    main()
