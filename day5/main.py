import flask
import sqlite3
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from functools import wraps

app = flask.Flask(
    __name__,
    static_folder="static",
    static_url_path="/"
)
app.secret_key = 'your-secret-key-change-this'

PASSWORD = 'hardik@123'

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day"],
    storage_uri="memory://",
)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'authenticated' not in flask.session:
            return flask.jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.post("/login")
@limiter.limit("5 per minute")
def login():
    data = flask.request.get_json()
    password = data.get('password')
    
    if password == PASSWORD:
        flask.session['authenticated'] = True
        return flask.jsonify({'success': True}), 200
    else:
        return flask.jsonify({'error': 'Invalid password'}), 401

conn = sqlite3.connect('gifts.db') 
cursor = conn.cursor()  
cursor.execute('''
    CREATE TABLE IF NOT EXISTS gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        gift TEXT NOT NULL
    )
''')
conn.commit()  
conn.close()

@app.get("/")
@limiter.limit("1 per second")
def index():
    return flask.send_from_directory("static", "index.html")

@app.post("/gifts")
@login_required
def create_gift():
    data = flask.request.get_json()
    name = data.get('name')
    gift = data.get('gift')
    
    conn = sqlite3.connect('gifts.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO gifts (name, gift) VALUES (?, ?)', (name, gift))
    conn.commit()
    conn.close()

    return '', 201
    
@app.get("/gifts")
@login_required
def get_gifts():
    conn = sqlite3.connect('gifts.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, name, gift FROM gifts')
    rows = cursor.fetchall()
    conn.close()
    
    gifts = [{'id': row[0], 'name': row[1], 'gift': row[2]} for row in rows]
    return flask.jsonify(gifts)



if __name__ == "__main__":
    app.run()