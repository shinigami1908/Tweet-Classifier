from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\data\input'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'csvFile' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['csvFile']

        if file and file.filename.endswith('.csv'):
            filename = file.filename
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            data = pd.read_csv(file_path)
            json_data = data.to_json(orient='records')

            return json_data, 200
        else:
            return jsonify({'error': 'Please select a valid CSV file'}), 400
    except Exception as e:
        return jsonify({'error': 'File upload failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)
