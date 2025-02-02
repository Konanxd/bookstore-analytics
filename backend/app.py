from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from Flask!',
        'items': ['Book A', 'Book B', 'Book C']
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)