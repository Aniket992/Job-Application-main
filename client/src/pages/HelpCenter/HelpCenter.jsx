import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./HelpCenter.css";
import SideBar from "../../Components/SideBar/SideBar";
import NotificationDisplay from "../../Components/Notificationdisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I create an account?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, dolor. Et, sequi! Ut voluptate blanditiis delectus incidunt sint, qui id. Incidunt eligendi amet illo et nam nihil delectus maxime! Enim asperiores voluptates laudantium quas itaque? Aperiam quaerat harum quod id blanditiis inventore eos quis, nostrum molestiae veritatis a excepturi dolorum assumenda iste adipisci reiciendis perferendis nam in quae exercitationem eius perspiciatis suscipit nesciunt odit. Ad adipisci, accusantium autem sit culpa repudiandae delectus id, nisi mollitia sequi fuga perferendis ratione provident deserunt in consequuntur vero eveniet qui corporis pariatur ipsam iure ab quae corrupti. Maiores eos explicabo soluta reiciendis debitis. Cupiditate.",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      question: "How do I apply for a job?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, dolor. Et, sequi! Ut voluptate blanditiis delectus incidunt sint, qui id. Incidunt eligendi amet illo et nam nihil delectus maxime! Enim asperiores voluptates laudantium quas itaque? Aperiam quaerat harum quod id blanditiis inventore eos quis, nostrum molestiae veritatis a excepturi dolorum assumenda iste adipisci reiciendis perferendis nam in quae exercitationem eius perspiciatis suscipit nesciunt odit. Ad adipisci, accusantium autem sit culpa repudiandae delectus id, nisi mollitia sequi fuga perferendis ratione provident deserunt in consequuntur vero eveniet qui corporis pariatur ipsam iure ab quae corrupti. Maiores eos explicabo soluta reiciendis debitis. Cupiditate.",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      question: "How do I apply for a job?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, dolor. Et, sequi! Ut voluptate blanditiis delectus incidunt sint, qui id. Incidunt eligendi amet illo et nam nihil delectus maxime! Enim asperiores voluptates laudantium quas itaque? Aperiam quaerat harum quod id blanditiis inventore eos quis, nostrum molestiae veritatis a excepturi dolorum assumenda iste adipisci reiciendis perferendis nam in quae exercitationem eius perspiciatis suscipit nesciunt odit. Ad adipisci, accusantium autem sit culpa repudiandae delectus id, nisi mollitia sequi fuga perferendis ratione provident deserunt in consequuntur vero eveniet qui corporis pariatur ipsam iure ab quae corrupti. Maiores eos explicabo soluta reiciendis debitis. Cupiditate.",
      likes: 0,
      dislikes: 0,
    },
  ]);

  const handleThumbsUp = (id) => {
    const updatedFaqs = faqs.map((faq) => {
      if (faq.id === id) {
        return { ...faq, likes: faq.likes + 1 };
      }
      return faq;
    });
    setFaqs(updatedFaqs);
  };

  // Function to handle thumbs down
  const handleThumbsDown = (id) => {
    const updatedFaqs = faqs.map((faq) => {
      if (faq.id === id) {
        return { ...faq, dislikes: faq.dislikes + 1 };
      }
      return faq;
    });
    setFaqs(updatedFaqs);
  };

  // Function to render FAQ items
  const renderFAQs = () => {
    return faqs.map((faq) => (
      <div className="faq" key={faq.id}>
        <h3 className="faq-question">{faq.question}</h3>
        <p className="faq-answer">{faq.answer}</p>
        <div className="faq-feedback">
          <button onClick={() => handleThumbsUp(faq.id)}>
            <FaThumbsUp  /> {faq.likes}
          </button>
          <button onClick={() => handleThumbsDown(faq.id)}>
            <FaThumbsDown /> {faq.dislikes}
          </button>
        </div>
        <hr />
      </div>
    ));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send form data to server)
    alert("Form submitted!");
  };
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="help-center">
      <SideBar />
      <div className="help-container">
        <div className="page-header">
          <h1>FAQs</h1>
          <div className="notification-navigation">
            <button onClick={handleClick}>Back to HomePage</button>
            <div className="notification">
              <NotificationDisplay />
            </div>
          </div>
        </div>

        <div className="faqs-contact-container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <h2>Didn't find what you are looking for?</h2>
              <h3>
                Contact Us.Our client executive will be in touch through mail.{" "}
              </h3>

              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required />

              <button type="submit">
                Submit <i className="pi pi-send"></i>
              </button>
            </form>
          </div>
          <div className="faqs">
            {renderFAQs()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
