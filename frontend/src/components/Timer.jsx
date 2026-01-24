import React from 'react';

const Timer = ({ secondsRemaining }) => {
  // Formatta il tempo in MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-4xl font-mono font-bold text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
        {formatTime(secondsRemaining)}
      </div>
    </div>
  );
};

export default Timer;
