import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatTalkTales.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is TalkTales?" text="An AI-driven virtual narrator that dynamically curates and presents immersive content tailored to your choice: news, stories, info, or reviews." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination.</h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Dynamic Content Curation" text="Adapts in real-time to deliver fresh news updates, imaginative tales, insightful information, or in-depth reviews based on user preferences." />
      <Feature title="Immersive Visual Experience:" text="Enhances narratives with relevant visual elements and videos, elevating user engagement and comprehension." />
      <Feature title="Intelligent Interaction" text="The narrator's persona adjusts to different content types, ensuring a personalized and interactive storytelling experience for every user." />
    </div>
  </div>
);

export default WhatGPT3;