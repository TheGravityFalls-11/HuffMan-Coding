                                                                                                                                                                                     // File: pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg"; // Placeholder for logo, replace with your logo asset

function HomePage() {
  return (
    <div className="homepage-root">
      {/* Header */}
      <header className="homepage-header">
        <div className="homepage-header-left">
          <img src={logo} alt="Reaching Roots Logo" className="homepage-logo" />
          <span className="homepage-logo-text">Reaching<br/>Roots.</span>
        </div>
        <nav className="homepage-nav">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <h1 className="homepage-hero-title">
            Rooted in Purpose,<br/>
            <span className="homepage-hero-green">Growing<br/>Together.</span>
          </h1>
          <div className="homepage-getstarted-btn-row">
            <Link to="/login" className="homepage-getstarted-btn">Get Started</Link>
          </div>
        </div>
        {/* <div className="homepage-hero-btn">
          <a href="#contact" className="homepage-getintouch-btn">Get In Touch</a>
        </div> */}
      </section>

      {/* Cards Row */}
      <section className="homepage-cards-row">
        <div className="homepage-card homepage-card-img-bw">
          {/* Replace with your own B&W image */}
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Woman" />
        </div>
        <div className="homepage-card homepage-card-img-color">
          {/* Replace with your own color image */}
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Shepherd" />
        </div>
        <div className="homepage-card homepage-card-mission">
          <p>
            Reaching Roots aims to create a societal impact through evidence-based and community–driven interventions at the intersection of agriculture, entrepreneurship, and climate change.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="homepage-section">
        <h2 className="homepage-section-title">Our Projects</h2>
        <div className="homepage-section-content">
          <p>Explore our ongoing and past projects focused on rural development, sustainable agriculture, and community empowerment.</p>
          {/* Add project cards or details here */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="homepage-section">
        <h2 className="homepage-section-title">About Us</h2>
        <div className="homepage-section-content">
          <p>Reaching Roots is dedicated to transforming rural communities through evidence-based interventions, capacity building, and innovative solutions in agriculture and entrepreneurship.</p>
          {/* Add more about content here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="homepage-section">
        <h2 className="homepage-section-title">Contact</h2>
        <div className="homepage-section-content">
          <p>Have questions or want to collaborate? Reach out to us at <a href="mailto:info@reachingroots.org">info@reachingroots.org</a> or use the form below.</p>
          {/* Add a contact form or more contact info here */}
        </div>
      </section>
    </div>
  );
}

export default HomePage;