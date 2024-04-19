import React from 'react'
import data from "../../utils/accordion"
import "./Services.css"
import { Accordion,AccordionItem,AccordionItemButton,AccordionItemHeading,AccordionItemPanel,AccordionItemState } from 'react-accessible-accordion'
import "react-accessible-accordion/dist/fancy-example.css"
import {MdOutlineArrowDropDown} from "react-icons/md"
const Services = () => {
  return (
    <>
      <section className="services">
        <div className="innerWidth paddings flexCenter s-container">
          {/* left side */}
          <div className="s-left">
            <div className="img">
              <img src="./img2.jpeg" alt="service img" />
            </div>
          </div>
          {/* right side */}
          <div className="s-right flexColStart">
            <span className="orangeText">Our Services</span>
            <span className="primaryText">What We Provide</span>
            <span className="secondaryText">
              We're dedicated to enriching your life through
              exceptional real estate services. <br />
              We commit to guiding you to your dream space.
            </span>

            <Accordion
              className="accordian"
              allowMultipleExpanded={false}
              preExpanded={[0]}
            >
              {data.map((i) => (
                <AccordionItem className="accordianItem" key={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="flexCenter accordianButton">
                      <div className="icon flexCenter">{i.icon}</div>
                      <span className="primaryText accordianHead">
                        {i.heading}
                      </span>
                      <div className="flexCenter icon">
                        <MdOutlineArrowDropDown size={20} />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{i.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services
