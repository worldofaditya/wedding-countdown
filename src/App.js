import React, { useState, useEffect } from 'react';
import weddingImage from './images/countdown251126.jpg';
import './App.css';

function App() {
  const [daysRemaining, setDaysRemaining] = useState('000');

  useEffect(() => {
    // Set your target date here (YYYY-MM-DD format)
    const targetDate = new Date('2026-11-25T00:00:00').getTime();

    const calculateDays = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // If the target date has passed, keep it at 000
      if (distance < 0) {
        setDaysRemaining('000');
        return;
      }

      // Calculate days and format as a 3-digit string
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      setDaysRemaining(days.toString().padStart(3, '0'));
    };

    calculateDays(); // Calculate immediately on mount

    // Update the calculation every hour so the countdown stays accurate
    // if the user leaves the page open over midnight
    const interval = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <div className="image-wrapper">
        {/* Responsive full-screen background image */}
        <img
          src={weddingImage}
          alt="Wedding Background"
          className="background-image"
        />

        {/* Overlay div elevated along the z-axis */}
        <div className="countdown-overlay">
          <div className="countdown-number">{daysRemaining}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
