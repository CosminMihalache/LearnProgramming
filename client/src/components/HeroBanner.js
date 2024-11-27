import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <img 
        src="/images/ai-education-banner.webp" 
        alt="AI Education Banner"
        className="hero-image"
      />
      <div className="hero-content">
        <h1>Construiește viitorul cu noi – Învățare Gratuită în Programare și Inteligență Artificială</h1>
        <p>Master modern programming skills with our comprehensive courses</p>
      </div>
    </div>
  );
};

export default HeroBanner; 