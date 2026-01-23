import React from 'react';
import hackerBad from '../assets/hacker_bad.png';
import helthCompany from '../assets/helth_company.png';

const HealthBar = ({ health }) => {
  // Calcola il colore in base alla vita: 120 (Verde) -> 0 (Rosso)
  const getHealthColor = (h) => {
    const hue = Math.max(0, Math.min(120, (h / 100) * 120)); 
    return `hsl(${hue}, 100%, 50%)`;
  };

  const currentColor = getHealthColor(health);

  return (
    <div className="flex items-center">
      <img 
        src={hackerBad} 
        alt="Hacker" 
        className="h-20 object-contain translate-x-8 relative z-10" 
      />
      
      <div className="relative w-50 h-8 overflow-hidden border border-cyber-black bg-gray-900">
         <div 
           className="h-full transition-all duration-500 ease-out" 
           style={{ 
             width: `${health}%`, 
             backgroundColor: currentColor,
             boxShadow: `0 0 15px ${currentColor}`
           }}
         />
      </div>

      <img 
        src={helthCompany} 
        alt="Company" 
        className="h-20 object-contain -translate-x-4 relative z-10" 
      />
    </div>
  );
};

export default HealthBar;
