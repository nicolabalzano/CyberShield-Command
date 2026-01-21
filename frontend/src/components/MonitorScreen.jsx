import React from 'react';
import monitorReal from '../assets/monitor_real.png';

/**
 * A reusable component that frames content inside a monitor image.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to display inside the monitor screen.
 * @param {string} [props.className] - Additional classes for the outer container.
 */
const MonitorScreen = ({ children, className = "" }) => {
  return (
    <div className={`relative w-full max-w-5xl aspect-video bg-transparent ${className}`}>
      {/* This image acts as the monitor frame */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
            src={monitorReal} 
            alt="Monitor" 
            className="relative z-50 w-auto h-full max-h-[80vh] object-contain drop-shadow-2xl"
        />
        
        {/* Screen Content Overlay 
            The positioning hardcoded here matches 'monitor_real.png' screen area.
            If the image changes, these values might need adjustment.
        */}
        <div className="absolute z-[60] bg-cyber-black overflow-hidden font-mono text-sm leading-relaxed text-cyber-green
                        w-[70%] h-[70%] top-[4%] right-[15%]"> 
            
            {/* Inner Content Slot */}
            <div className="h-full w-full overflow-auto">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorScreen;
