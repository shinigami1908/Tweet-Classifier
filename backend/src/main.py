import tweetnlp

model = tweetnlp.load_model('topic_classification')

def predict_labels(text_list):
    predicted_labels = []
    for text in text_list:
        result = model.topic(text)
        text_label = [label.replace('_', ' ').title() for label in result['label']]
        labels_str = ', '.join(text_label)
        predicted_labels.append(labels_str)
    
    return predicted_labels

def process_data(df):
    text_list = df['text'].tolist()
    processed_labels = predict_labels(text_list)
    df['category'] = processed_labels

    return df