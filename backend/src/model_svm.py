import pandas as pd
import os
import joblib
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.multiclass import OneVsRestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score, classification_report
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

def preprocess_text(text_list):
    stop_words = set(stopwords.words('english'))
    ps = PorterStemmer()

    preprocessed_text = []
    for text in text_list:
        text = text.replace('\\r', ' ').replace('\\"', ' ').replace('\\n', ' ')
        text = re.sub('[^A-Za-z0-9]+', ' ', text)
        words = [word for word in text.split() if word.isalpha() if word.lower() not in stop_words]
        stemmed_words = [ps.stem(word) for word in words]
        preprocessed_text.append(' '.join(stemmed_words))

    return preprocessed_text

def load_and_preprocess_data(directory_path):
    df = pd.DataFrame()

    for filename in os.listdir(directory_path):
        if filename.endswith('.csv'):
            file_path = os.path.join(directory_path, filename)
            data = pd.read_csv(file_path, header=None)
            df = pd.concat([df, data], ignore_index=True)
                
    text_list = df[1].tolist()
    labels = df.iloc[:, 3:22].values.tolist()

    preprocessed_text = preprocess_text(text_list)
    
    return preprocessed_text, labels

def train_svm_model(X_train, y_train):
    model = make_pipeline(TfidfVectorizer(), OneVsRestClassifier(SVC(kernel='linear')))
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    class_labels = [str(label) for label in model.classes_]
    report = classification_report(y_test, y_pred, target_names=class_labels, zero_division=1)
    print(f'Accuracy: {accuracy}\nClassification Report:\n{report}')

def save_model(model, file_path):
    joblib.dump(model, file_path)
    print(f'Model saved to {file_path}')

if __name__ == "__main__":
    file_path = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\data'
    model_path = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\model\trained_model_svm.joblib'
    preprocessed_text, labels = load_and_preprocess_data(file_path)
    
    X_train, X_test, y_train, y_test = train_test_split(preprocessed_text, labels, test_size=0.2, random_state=42)

    model = train_svm_model(X_train, y_train)

    evaluate_model(model, X_test, y_test)

    save_model(model, model_path)