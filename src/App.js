// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ArticleList from './components/ArticleList';
import EditableText from './components/EditableText';
import { Footer, Header, WhatGPT3,Login,SignUp } from "./containers";
import Navbar from "./components/navbar/Navbar";

import './styles.css'
const App = () => {
  const [articleData, setArticleData] = useState({ titles: [], links: [] });
  const [text, setText] = useState('');

  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/" element={ 
            <div className="gradient__bg">
              <Navbar />
              <Header />
              <WhatGPT3 />
              <Footer />
            </div>
          } />
        <Route
          path="/Select"
          element={<Home articleData={articleData} setArticleData={setArticleData} />}
        />

        <Route path="/article-list" element={<ArticleList articles={articleData}  setText={setText}/>} />

        <Route path="/editable-text" element={<EditableText initialText={text} />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
