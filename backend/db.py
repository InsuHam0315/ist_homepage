# db.py
import pymysql
from pymysql.cursors import DictCursor

def get_connection():
    return pymysql.connect(
        host='localhost',         # 또는 127.0.0.1
        user='root',
        password='1234',
        db='ist_lab',
        charset='utf8mb4',
        cursorclass=DictCursor
    )
