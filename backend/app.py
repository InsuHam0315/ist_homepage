# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymysql
from werkzeug.utils import secure_filename
from datetime import date
from db import get_connection

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'profile'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/debug/db', methods=['GET'])
def debug_db_connection():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT NOW() AS current_time")
            result = cursor.fetchone()
        conn.close()
        return jsonify({
            "status": "success",
            "message": "DB 연동 성공",
            "current_time": result['current_time']
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"DB 연결 실패: {str(e)}"
        }), 500


@app.route('/api/news', methods=['POST'])
def create_news():
    title = request.form['title']
    summary = request.form['summary']
    author = request.form['author']
    category = request.form['category']
    content = request.form['content']
    featured = request.form.get('featured', 'false') == 'true'
    file = request.files.get('image')

    image = ''
    if file:
        filename = secure_filename(file.filename)
        image = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image)

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO news (title, summary, author, category, content, featured, image)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (title, summary, author, category, content, featured, image))
        conn.commit()
        return jsonify({'message': 'News created'}), 201
    finally:
        conn.close()

@app.route('/api/news', methods=['GET'])
def get_news():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM news ORDER BY id DESC")
            news = cursor.fetchall()
            for n in news:
                if n['image']:
                    n['image'] = '/' + n['image']  # 프론트용 필드 추가
            return jsonify(news)
    finally:
        conn.close()

@app.route('/api/members', methods=['POST'])
def create_member():
    name = request.form['name']
    position = request.form['position']
    research = request.form['research']
    email = request.form['email']
    file = request.files.get('image')

    image = ''
    if file:
        filename = secure_filename(file.filename)
        image = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image)
        image = f'profile/{filename}'.replace('\\', '/')

    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO members (name, position, research, email, image)
                VALUES (%s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (name, position, research, email, image))
        conn.commit()
        return jsonify({'message': 'Member created'}), 201
    finally:
        conn.close()

@app.route('/api/members', methods=['GET'])
def get_members():
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM members ORDER BY id DESC")
            members = cursor.fetchall()
            for m in members:
                if m['image']:
                    m['image'] = '/' + m['image']  # 프론트용 필드 추가
            return jsonify(members)
    finally:
        conn.close()

@app.route('/api/members/<int:member_id>', methods=['DELETE'])
def delete_member(member_id):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            # 먼저 이미지 파일 경로 가져오기
            cursor.execute("SELECT image FROM members WHERE id = %s", (member_id,))
            member = cursor.fetchone()
            
            if member and member['image']:
                # 파일 삭제
                try:
                    os.remove(member['image'])
                except:
                    pass  # 파일이 없어도 계속 진행
            
            # DB에서 삭제
            cursor.execute("DELETE FROM members WHERE id = %s", (member_id,))
        conn.commit()
        return jsonify({'message': 'Member deleted'}), 200
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
