from flask import Flask, request, jsonify
from flask_cors import CORS
import bs4 as bs
import requests
import newspaper
from newspaper import Article
import nltk
nltk.download('punkt')
import requests

app = Flask(__name__)
CORS(app) 

def is_gallery_in_url(url):
    lowercase_url = url.lower()

    return 'gallery' in lowercase_url

def is_live_in_url(url):
    lowercase_url = url.lower()

    return 'live' in lowercase_url

def is_av_in_url(url):
    lowercase_url = url.lower()
    
    

    return 'av' in lowercase_url

def is_shows_in_url(url):
    lowercase_url = url.lower()

    return 'shows' in lowercase_url
@app.route('/submit-data', methods=['POST'])


def submit_data():
    data = request.get_json()

    selected_option = data.get('selectedOption', '')
    checked_option = data.get('checkedOption', '')
    selected_image_url = data.get('selectedImageUrl', '') 

    title = []
    links_to_article = []

    print(f"Selected Option: {selected_option}")
    print(f"Checked Option: {checked_option}")
    print(f"Selected Image URL: {selected_image_url}")

    if checked_option == 'CNN':
        print("CNN is selected!")
        url = "https://edition.cnn.com/"
        url = url + selected_option
        source = requests.get(url)
        soup = bs.BeautifulSoup(source.content, 'html.parser')
        cnn_paper = newspaper.build(url, memoize_articles=False)
        links = []
        for article in cnn_paper.articles:
            links.append(article.url)
        for link in links:
            if link.startswith("https://edition.cnn.com/2023") and not is_gallery_in_url(link):
                links_to_article.append(link)
        for link in links_to_article:
            try:
                article = Article(link)
                article.download()
                article.parse()
                article.nlp()
                title.append(article.title)
            except newspaper.article.ArticleException as e:
                print(f"Error processing article at {link}: {e}")

        print(title)

    elif checked_option == 'BBC':
        print("BBC is selected!")
        url = "https://www.bbc.com"
        url = url + selected_option
        source = requests.get(url)
        soup = bs.BeautifulSoup(source.content, 'html.parser')
        cnn_paper = newspaper.build(url, memoize_articles=False)
        links = []
        for article in cnn_paper.articles:
            links.append(article.url)
        for link in links:
            if not is_live_in_url(link) or not is_av_in_url(link):
                links_to_article.append(link)
        for link in links_to_article:
            try:
                article = Article(link)
                article.download()
                article.parse()
                article.nlp()
                title.append(article.title)
            except newspaper.article.ArticleException as e:
                print(f"Error processing article at {link}: {e}")

        print(title)

    elif checked_option == 'GEO':
        print("GEO is selected!")
        url = "https://www.geo.tv/"
        url = url + selected_option
        source = requests.get(url)
        soup = bs.BeautifulSoup(source.content, 'html.parser')
        cnn_paper = newspaper.build(url, memoize_articles=False)
        links = []
        for article in cnn_paper.articles:
            links.append(article.url)
        for link in links:
            if not is_shows_in_url(link):
                links_to_article.append(link)
        for link in links_to_article:
            try:
                article = Article(link)
                article.download()
                article.parse()
                article.nlp()
                title.append(article.title)
            except newspaper.article.ArticleException as e:
                print(f"Error processing article at {link}: {e}")

    response_data = {'message': 'Data received successfully', 'articles': []}

    for t, l in zip(title, links_to_article):
        response_data['articles'].append({'title': t, 'link': l})

    return jsonify(response_data)

@app.route('/fetch-article', methods=['POST'])
def fetch_article():
    data = request.get_json()
    article_link = data.get('articleLink', '')

    try:
        article = Article(article_link)
        article.download()
        article.parse()
        article.nlp()

        article_text = article.text

        cleaned_text = article_text.replace('\n', '').strip()
        
        cleaned_text = cleaned_text.replace('CNN', '')

        cleaned_text = cleaned_text[:int(len(cleaned_text)/4)]
        print(cleaned_text)

        ngrok_public_url = 'https://c9db-104-197-74-102.ngrok-free.app/process-input'  
        # ngrok_url = ngrok_public_url + ':5002/receive-article'  # Assuming '/receive-article' is a route in your Colab notebook
        response = requests.get(ngrok_public_url, json={'context': cleaned_text})
        if response.status_code == 200:
            response.text = response.text.replace('\n', '').strip()
            response.text = response.text.replace('result:', '').strip()
            response.text = response.text.replace('1. Introduction:', '').strip()
            response.text = response.text.replace('2. Body', '').strip()
            response.text = response.text.replace('3. Conclusion:', '').strip()
            
            return jsonify({'message': response.text})
            # return response
        else:
            return jsonify({'error': f'Error sending data to ngrok: {response.text}'})

    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/edited-text', methods=['POST'])
def handle_edited_text():
    edited_text = request.json.get('editedText')
    print(f"Received edited text: {edited_text}")
    return "Text received successfully"

if __name__ == '__main__':
    app.run(debug=True)