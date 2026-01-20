from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)
DB_FILE = 'database.json'

def load_db():
    if not os.path.exists(DB_FILE):
        return {"users": {}, "levels": {}}
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/progress', methods=['GET'])
def get_progress():
    db = load_db()
    # Mock user ID for now
    user_id = "default_user" 
    return jsonify(db.get("users", {}).get(user_id, {}))

@app.route('/api/progress', methods=['POST'])
def save_progress():
    data = request.json
    user_id = "default_user"
    percentage = data.get('percentage', 0)
    level = data.get('level')
    
    db = load_db()
    if "users" not in db:
        db["users"] = {}
    if user_id not in db["users"]:
        db["users"][user_id] = {}
        
    db["users"][user_id][level] = percentage
    save_db(db)
    
    return jsonify({"status": "saved"})

if __name__ == '__main__':
    # Initialize db if needed
    if not os.path.exists(DB_FILE):
        save_db({"users": {}, "levels": {}})
    app.run(host='0.0.0.0', port=5000, debug=True)
