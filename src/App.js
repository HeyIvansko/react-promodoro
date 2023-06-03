import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(1500); // Durée initiale en secondes (25 minutes)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (!isActive && time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(1500);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Pomodoro </h1>
      <div className={`timer ${isActive ? 'active' : ''}`}>{formatTime()}</div>
      <div className="controls">
        {!isActive ? (
          <button className="start" onClick={startTimer}>Start</button>
        ) : (
          <button className="pause" onClick={() => setIsActive(false)}>Pause</button>
        )}
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default App;
