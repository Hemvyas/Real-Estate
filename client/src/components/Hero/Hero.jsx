import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Search from "../SearchBar/Search";
const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="paddings flexCenter m-container innerWidth">
          {/* left-side */}
          <div className="hero-left flexColStart">
            <div className="title">
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }}
              >
                Uncover Your Dream <br /> Home Today
              </motion.h1>
            </div>

            <div className="desc flexColStart">
              <span className="secondaryText">
                Explore a curated selection of properties tailored just for you.
              </span>
              <span className="secondaryText">
                Simplify your home search with our personalized and hassle-free
                service.
              </span>
            </div>

            <Search />

            <div className="counts">
              <div className="flexColCenter count">
                <span>
                  <CountUp start={8900} end={9000} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">Properties Listed</span>
              </div>

              <div className="count flexColCenter">
                <span>
                  <CountUp start={1970} end={2000} duration={4} />
                  <span>+</span>
                </span>
                <span className="secondaryText">Satisfied Clients</span>
              </div>

              <div className="count flexColCenter">
                <span>
                  <CountUp end={38} />
                  <span>+</span>
                </span>
                <span className="secondaryText">Awards Won</span>
              </div>
            </div>
          </div>
          {/* right-side */}
          <div className="hero-right flexCenter">
            <motion.div
              initial={{ x: "7rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
              className="img"
            >
              <img src="./img1.jpeg" alt="Hero Image" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
