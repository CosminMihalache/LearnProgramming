import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Despre Noi</h3>
          <p>Asociația pentru Educație și Inteligență Artificială - dedicați educației gratuite în programare și AI.</p>
        </div>
        
        <div className="footer-section">
          <h3>Link-uri Rapide</h3>
          <ul>
            <li><Link to="/">Acasă</Link></li>
            <li><Link to="/courses">Cursuri</Link></li>
            <li><Link to="/volunteer">Devino Voluntar</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: contact@aeia.ro</li>
            <li>Tel: +40 XXX XXX XXX</li>
            <li>București, România</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Asociația pentru Educație și Inteligență Artificială. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
};

export default Footer; 