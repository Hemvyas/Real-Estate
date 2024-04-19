import React from 'react'
import "./Newsletter.css"
const Newsletter = () => {
  return (
    <>
      <section className="newsletter">
        <div className="innerWidth paddings n-container">
          <div className="flexColCenter wrapper">
            <span className="primaryText">Join the ZenithZones Community</span>
            <span className="secondaryText">
              Subscribe to receive exclusive offers and latest insights on
              real estate deals
              <br />
              Discover your dream home with us.
            </span>
            <button className="btn">
              <a href="mailto:hats1469@gmail.com">Get Started</a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Newsletter