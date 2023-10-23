// Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import ImageSlider from './ImageSlider';


const Home = ({ articleData, setArticleData }) => {
  const navigate = useNavigate();
  const initialOptions = ['Default Option 1', 'Default Option 2', 'Default Option 3'];
  const [dropdownOptions, setDropdownOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState('');
  const [checkedOption, setCheckedOption] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const imageUrls = [
    '/images/iris.png',
    '/images/stewart.png',
  ];

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const SelectNewsDomain = (option) => {
    setCheckedOption(option);

    if (option === 'CNN') {
      setDropdownOptions(['us', 'world', 'politics', 'business', 'health', 'entertainment', 'travel', 'style', 'sports']);
    } else if (option === 'BBC') {
      setDropdownOptions(['news', 'sport']);
    } else if (option === 'GEO') {
      setDropdownOptions(['pakistan','latest', 'world', 'sports', 'showbiz', 'entertainment', 'business', 'sci-tech']);
    } else {
      setDropdownOptions(initialOptions);
    }
  };

  const SelectAvatar = (selectedImageUrl) => {
    setSelectedImageUrl(selectedImageUrl);
  };
  const sendDataToFlaskApi = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOption,
          checkedOption,
          selectedImageUrl,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response from Flask API:', data);
      console.log('Article titles:', data.articles.map(article => article.title));
  
      if (Array.isArray(data.articles)) {
        console.log('Received data is an array');
        setArticleData({ titles: data.articles.map(article => article.title), links: data.articles.map(article => article.link) });
        console.log('Article Data Set',articleData)
      } else {
        console.error('Invalid data structure received from Flask API:', data);
      }
    } catch (error) {
      console.error('Error sending data to Flask API:', error);
    }
  };
  const goToArticleList = () => {
    navigate('/article-list');
  };
  return (
    <div className="app-container">
      <h1 className="app-title">TalkTales</h1>

      <ImageSlider images={imageUrls} onImageSelect={SelectAvatar} />

      <div className="container">
        <div className="checkbox-container">
          <h2>Checkbox Options:</h2>
          {['CNN', 'BBC', 'GEO'].map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={checkedOption === option}
              onChange={() => SelectNewsDomain(option)}
            />
          ))}
        </div>

        <Dropdown options={dropdownOptions} selectedOption={selectedOption} onChange={handleDropdownChange} />
        <button onClick={sendDataToFlaskApi}>Send Data to Flask API</button>
        <button onClick={goToArticleList}>Go to Article List</button>      </div>
    </div>
  );
};

export default Home;
