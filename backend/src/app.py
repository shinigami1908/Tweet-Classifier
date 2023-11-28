from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
# from main import process_data
from main_local_model import process_data

# Uncomment if you want to use local model out of random forest and naive bayes or tweetnlp model

app = Flask(__name__)
CORS(app)

processed_df = pd.DataFrame()

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'dataFile' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['dataFile']
        
        if file.filename.endswith('.csv'):
            data = pd.read_csv(file)
            processed_df = process_data(data)
            json_data = processed_df.to_json(orient='records')
        else:
            return jsonify({'error': 'Please select a valid CSV file'}), 400

        return json_data, 200
    except Exception as e:
        return jsonify({'error': 'File upload failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)