// ArticleList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ArticleList.css';

const ArticleList = ({ articles, setText }) => {
  const navigate = useNavigate();
  const SelectNews = async (event, link) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/fetch-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleLink: link,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from Flask API:', data.message);
      setText(data.message);
    } catch (error) {
      console.error('Error fetching article text:', error);
    }
  };
  const goToSelect = () => {
    navigate('/Select');
  };
  const goToEditor = () => {
    navigate('/editable-text');
  };
  return (
    <div className="article-list">
      <h2>Articles</h2>
      <div className="article-container">
        <ul>
          {articles.titles.map((title, index) => (
            <li key={index}>
              <a
                href={articles.links[index]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => SelectNews(e, articles.links[index])}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
          <button onClick={goToSelect}>Go to Main Page</button> 
          <button onClick={goToEditor}>Go to Editable Text</button>     

      </div>

      {/* <Link to="/Select" className="goBackLink">
        Go back to Main Page
      </Link>
      <Link to="/editable-text" className="goToEdit">
        Go to Editable Text
      </Link> */}
      
    </div>
  );
};

export default ArticleList;