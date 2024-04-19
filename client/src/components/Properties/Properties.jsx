import React, { useRef } from "react";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Cards from "../Cards/Cards";
const Properties = () => {

   const boxRef = useRef(null);
   const left = () => {
     if (boxRef.current) {
       let width = boxRef.current.clientWidth;
       boxRef.current.scrollLeft -= width;
     }
   };

   const right = () => {
     if (boxRef.current) {
       let width = boxRef.current.clientWidth;
       boxRef.current.scrollLeft += width;
     }
   };
  const {data,isLoading,isError}=useProperties();
   if (isError) {
     return (
       <div>
         <span>Error while fetching data</span>
       </div>
     );
   }
    if (isLoading) {
      return(
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="60"
          width="60"
          radius={1}
          color="#4066ff"
          arial-label="puff-loading"
        />
      </div>
      )
    }

  return (
    <>
      <section className="properties">
        <div className="innerWidth paddings p-container">
          <div className="p-title flexColStart">
            <span className="orangeText">Best Choices</span>
            <span className="primaryText">Popular Properties</span>
          </div>
          <div className="carousel" ref={boxRef}>
          {
            data && data?.slice(0,8).map((card,i)=>(<Cards card={card} key={i} />))
          }
          </div>
          <div className="button">
            <button className="bttn prev" onClick={left}>
              &lt;
            </button>
            <button className="bttn next " onClick={right}>
              &gt;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
