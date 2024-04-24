import React from "react";
import { useNavigate } from "react-router-dom";
import BusinessImage from "../../Assets/Business.png";
import TechnologyImage from "../../Assets/technology.png";
import EngineeringImage from "../../Assets/Engineering.png";
import MarketingImage from "../../Assets/marketing.png";
import SalesImage from "../../Assets/sales.png";
import DesignImage from "../../Assets/design.png";
import FinanceImage from "../../Assets/finance.png";
import HRImage from "../../Assets/hr.png";
import arrow from "../../Assets/arrow.png";
import "./JobByCategories.css";

const JobByCategory = () => {
  const categories = [
    { name: "Business", image: BusinessImage },
    { name: "Technology", image: TechnologyImage },
    { name: "Engineering", image: EngineeringImage },
    { name: "Marketing", image: MarketingImage },
    { name: "Sales", image: SalesImage },
    { name: "Design", image: DesignImage },
    { name: "Finance", image: FinanceImage },
    { name: "Human Resource", image: HRImage },
  ];

  const navigate = useNavigate(); 

  const handleCard = (category) => {
    navigate("/FindJobs", { state: { category } });
  }

  return (
    <div className="JobByCategory-container">
      <div className="heading-container">
        <p>Explore By Category</p>
      </div>
      <div className="category-cards">
        {categories.map((category, index) => (
          <div className="category-card" key={index} onClick={() => handleCard(category.name)}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <p>{/* Your jobs count here */} jobs available</p>
            <img src={arrow} alt="arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobByCategory;
