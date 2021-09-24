import qrcode  # 导入库
import numpy
import os

from config.config import WORK_PATH


def create_qr(url):
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=1
    )  # 设置二维码的大小

    # 设置要转换的网址
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image()
    img.save(os.path.join(WORK_PATH, "static", "img", "qr.jpg"))
