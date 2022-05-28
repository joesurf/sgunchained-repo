import React from 'react'
import map from '../assets/map.png'
import people from '../assets/people.png'
import './style.css';


function LandingScreen() {
  return (
    <div className="unchained__header section__padding" id="home">
      <div className="unchained__header-content">
        <h1 className="gradient__text">Let&apos;s Build Something amazing with GPT-3 OpenAI</h1>
        <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>

        <div className="unchained__header-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Get Started</button>
        </div>

        <div className="unchained__header-content__people">
          <img src={people} />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="unchained__header-image">
        <img src={map} />
      </div>
    </div>
  )
}

export default LandingScreen