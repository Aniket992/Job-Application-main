import React from "react";
import c1 from "../../Assets/c1.png";
import c2 from "../../Assets/c2.png";
import c3 from "../../Assets/c3.png";
import c4 from "../../Assets/c4.png";
import c5 from "../../Assets/c5.png";
import "./Marquee.css";

const Marquee = () => {
  return (
    <>
      <div class="logos">
        <div className="heading-container">
          <p>Companies We Helped Grow</p>
        </div>
        <div class="logos-slide">
          <img src={c1} alt="Company Logo 1" />
          <img src={c2} alt="Company Logo 2" />
          <img src={c3} alt="Company Logo 3" />
          <img src={c4} alt="Company Logo 4" />
          <img src={c5} alt="Company Logo 5" />
        </div>
        <div class="logos-slide">
          <img src={c1} alt="Company Logo 1" />
          <img src={c2} alt="Company Logo 2" />
          <img src={c3} alt="Company Logo 3" />
          <img src={c4} alt="Company Logo 4" />
          <img src={c5} alt="Company Logo 5" />
        </div>
      </div>
    </>
  );
};

export default Marquee;
