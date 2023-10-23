from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'dataFile' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['dataFile']
        
        if file.filename.endswith('.csv'):
            data = pd.read_csv(file)
            json_data = data.to_json(orient='records')
        else:
            return jsonify({'error': 'Please select a valid CSV file'}), 400

        return json_data, 200
    except Exception as e:
        return jsonify({'error': 'File upload failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)
