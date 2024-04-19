import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="paddings innerWidth flexCenter f-container">
          {/* left side */}
          <div className="f-left flexColStart">
            <h1 className="primaryText">Zenith Zones</h1>
            <span className="secondaryText">
              Discover your perfect space with ZenithZones.<br/> Empowering your
              lifestyle with ideal living solutions.
            </span>
          </div>

          {/* right side */}
          <div className="f-right flexColStart">
            <span className="primaryText">Address</span>
            <span className="secondaryText">
              187 Las Vegas, Hall Street, USA
            </span>
            <div className="flexCenter f-items">
              <span>Property</span>
              <span>Services</span>
              <span>Product</span>
              <span>About Us</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
