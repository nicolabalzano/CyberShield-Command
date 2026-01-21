from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)
DB_FILE = 'database.json'

def load_db():
    if not os.path.exists(DB_FILE):
        return {
            "users": {},
            "levels": {},
            "saveData": {
                "stars": {
                    "tutorial": 0,
                    "level1": 0,
                    "level2": 0,
                    "level3": 0,
                    "level4": 0,
                    "level5": 0,
                    "level6": 0,
                    "level7": 0,
                    "level8": 0,
                    "level9": 0
                },
                "settings": {
                    "language": "italiano",
                    "musicVolume": 10,
                    "sfxVolume": 50
                },
                "lastSaved": None
            }
        }
    with open(DB_FILE, 'r') as f:
        data = json.load(f)
        # Assicura che saveData esista
        if 'saveData' not in data:
            data['saveData'] = {
                "stars": {
                    "tutorial": 0,
                    "level1": 0,
                    "level2": 0,
                    "level3": 0,
                    "level4": 0,
                    "level5": 0,
                    "level6": 0,
                    "level7": 0,
                    "level8": 0,
                    "level9": 0
                },
                "settings": {
                    "language": "italiano",
                    "musicVolume": 10,
                    "sfxVolume": 50
                },
                "lastSaved": None
            }
        return data

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

@app.route('/api/save', methods=['GET'])
def get_save():
    """Carica i dati di salvataggio"""
    db = load_db()
    return jsonify(db.get('saveData', {}))

@app.route('/api/save', methods=['POST'])
def save_data():
    """Salva i dati di gioco"""
    data = request.json
    
    # Carica database
    db = load_db()
    current_data = db.get('saveData', {})
    
    # Aggiorna i dati
    if 'stars' in data:
        if 'stars' not in current_data:
            current_data['stars'] = {}
        current_data['stars'].update(data['stars'])
    
    if 'settings' in data:
        if 'settings' not in current_data:
            current_data['settings'] = {}
        current_data['settings'].update(data['settings'])
    
    # Aggiorna timestamp
    from datetime import datetime
    current_data['lastSaved'] = datetime.now().isoformat()
    
    # Salva nel database
    db['saveData'] = current_data
    save_db(db)
    
    return jsonify({"status": "saved", "data": current_data})

@app.route('/api/save/stars/<level_id>', methods=['POST'])
def update_stars(level_id):
    """Aggiorna le stelle per un livello specifico con controllo"""
    data = request.json
    new_stars = data.get('stars', 0)
    
    # Carica database
    db = load_db()
    current_data = db.get('saveData', {})
    
    if 'stars' not in current_data:
        current_data['stars'] = {}
    
    # Controllo: salva solo se le nuove stelle sono maggiori delle esistenti
    current_stars = current_data['stars'].get(level_id, 0)
    if new_stars > current_stars:
        current_data['stars'][level_id] = new_stars
        
        # Aggiorna timestamp
        from datetime import datetime
        current_data['lastSaved'] = datetime.now().isoformat()
        
        # Salva nel database
        db['saveData'] = current_data
        save_db(db)
        
        return jsonify({"status": "saved", "stars": new_stars, "updated": True})
    else:
        return jsonify({"status": "not_updated", "stars": current_stars, "updated": False})

if __name__ == '__main__':
    # Initialize db if needed
    if not os.path.exists(DB_FILE):
        default_db = {
            "users": {},
            "levels": {},
            "saveData": {
                "stars": {
                    "tutorial": 0,
                    "level1": 0,
                    "level2": 0,
                    "level3": 0,
                    "level4": 0,
                    "level5": 0,
                    "level6": 0,
                    "level7": 0,
                    "level8": 0,
                    "level9": 0
                },
                "settings": {
                    "language": "italiano",
                    "musicVolume": 10,
                    "sfxVolume": 50
                },
                "lastSaved": None
            }
        }
        save_db(default_db)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
