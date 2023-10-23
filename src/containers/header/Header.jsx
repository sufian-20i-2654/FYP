import React from 'react'
import "./header.css"
import ai from "../../assets/Logo1.png"

const Header = () => {
  return (
    <div className="gpt3__header section_padding" id='home'>
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Let&apos;s Build Something amazing with TalkTales!</h1>
        <p>Introducing an AI-powered 2D virtual narrator that dynamically curates and presents content across news, stories, information, and reviews. Enhanced with visuals and videos, our platform offers an immersive experience tailored to user preferences. Dive into real-time news, captivating tales, insightful information, or in-depth reviews, all with the flair of our intelligent narrator. Experience content like never before!</p>
        
      </div>
      <div className="gpt3__header-image">
        <img src={ai} alt="Logo1" />
      </div>
    </div>
  )
}

export default Header