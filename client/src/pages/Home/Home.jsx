import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import JobByCategory from "../../Components/JobByCategory/JobByCategory";
import JobPostingBanner from "../../Components/JobPostingBanner/JobPostingBanner";
import Marquee from "../../Components/Marquee/Marquee"
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="MainBody">
      <JobByCategory/>
      <Marquee/>
      <JobPostingBanner/>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
