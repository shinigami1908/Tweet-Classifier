from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import time
import joblib
import re

mlb_classes = [
        "Arts & culture",
        "Business & Entrepreneurs",
        "Celebrity & Pop Culture",
        "Diaries & Daily Life",
        "Family",
        "Fashion & Style",
        "Film TV & Video",
        "Fitness & Health",
        "Food & Dining",
        "Gaming",
        "Learning & Educational",
        "Music",
        "News & Social Concern",
        "Other Hobbies",
        "Relationships",
        "Science & Technology",
        "Sports",
        "Travel & Adventure",
        "Youth & Student Life"
    ]

def load_model_rf():    
    model_path = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\model\trained_model_rf.joblib'
    return joblib.load(model_path)

def load_model_nb():    
    model_path = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\model\trained_model_nb.joblib'
    return joblib.load(model_path)

def load_model_svm():    
    model_path = r'C:\Programming\VSC\Projects\Tweet Classifier\backend\model\trained_model_svm.joblib'
    return joblib.load(model_path)

model_rf = load_model_rf()
model_nb = load_model_nb()
model_svm = load_model_svm()

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

def map_labels_to_names(binarized_labels, mlb_classes):
    mapped_labels = []
    for i, label in enumerate(binarized_labels):
        if label == 1:
            mapped_labels.append(mlb_classes[i])
    return mapped_labels

def predict_labels(text_list, model):
    preprocessed_text = preprocess_text(text_list)
    predicted_labels = []
    for text in preprocessed_text:
        binary_labels = model.predict([text])[0]
        text_label = map_labels_to_names(binary_labels, mlb_classes)
        labels_str = ', '.join(text_label)
        predicted_labels.append(labels_str)
        
    return predicted_labels

def process_data(df):
    text_list = df['text'].tolist()
    processed_labels_rf = predict_labels(text_list, model_rf)
    df['category_rf'] = processed_labels_rf
    processed_labels_nb = predict_labels(text_list, model_nb)
    df['category_nb'] = processed_labels_nb
    processed_labels_svm = predict_labels(text_list, model_svm)
    df['category_svm'] = processed_labels_svm

    return df

# Time tests, remove before final
    
# texts = ['I like to listen music', 'Athletes are working for climate change', 'I like celebrities']
# for text in texts:
#     start = time.time()
#     binary_labels = model.predict([text])[0]
#     text_label = map_labels_to_names(binary_labels, mlb_classes)
#     end = time.time()
#     print(text_label)
#     print(end - start)