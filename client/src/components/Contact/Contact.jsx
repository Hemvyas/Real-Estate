import React from 'react'
import "./Contact.css"
import {MdCall} from "react-icons/md"
import {BsFillChatDotsFill} from "react-icons/bs"
import {HiChatBubbleBottomCenter} from "react-icons/hi2"
const Contact = () => {
  return (
    <>
      <section className="contact">
        <div className="innerWidth paddings flexCenter co-container">
          {/* left side */}
          <div className="co-left flexColStart">
            <span className="orangeText">Get in Touch</span>
            <span className="primaryText">We're Here for You</span>
            <span className="secondaryText">
              At ZenithZones, we're committed to ensuring your journey to find
              the perfect home is seamless and enjoyable. We believe the right
              living space can transform lives.<br/> Reach out for any inquiries or
              support.
            </span>

            {/* first row */}
            <div className="flexColStart contacts">
              <div className="flexStart row">
                <div className="flexColCenter info">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <MdCall size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Call</span>
                      <span className="secondaryText">+17 699 212 14</span>
                    </div>
                  </div>
                  <div className="flexCenter btn">Call Now</div>
                </div>

                <div className="flexColCenter info">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Chat</span>
                      <span className="secondaryText">+17 699 212 14</span>
                    </div>
                  </div>
                  <div className="flexCenter btn">Chat Now</div>
                </div>
              </div>

              {/* second row */}

              <div className="flexStart row">
                <div className="flexColCenter info">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Video Call</span>
                      <span className="secondaryText">+17 699 212 14</span>
                    </div>
                  </div>
                  <div className="flexCenter btn">Video Call Now</div>
                </div>

                <div className="flexColCenter info">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <HiChatBubbleBottomCenter size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Message</span>
                      <span className="secondaryText">+17 699 212 14</span>
                    </div>
                  </div>
                  <div className="flexCenter btn">Message Now</div>
                </div>
              </div>
            </div>
          </div>
          {/* {rigt side} */}
          <div className="co-left">
            <div className="img">
              <img src="./img3.jpeg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact
