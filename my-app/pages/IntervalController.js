import { useState, useCallback } from 'react';
import GraphInterface from './GraphInterface';
import withAuth from '../pages/withAuth';
import React from 'react';

// Memoize the GraphInterface component using React.memo()
const MemoizedGraphInterface = React.memo(GraphInterface);

function IntervalController() {
  // State variables to hold the current interval time, whether to show the menu button, and error message
  const [interval, setInterval] = useState(1000);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle changes to the interval time
  const handleIntervalChange = () => {
    const newInterval = window.prompt("Enter the new interval time (in ms):");
    if (newInterval) {
      const parsedInterval = parseInt(newInterval);
      if (Number.isInteger(parsedInterval)) {
        setInterval(parsedInterval);
        setErrorMessage('');
      } else {
        setErrorMessage('Please enter a valid integer.');
      }
    }
  }

  // Component rendering
  return (
    <div>
      {/* Interval time change UI */}
      <div className="interval-container">
        <button onClick={handleIntervalChange} className="interval-button">Change Interval</button>
        <label className="interval-label">Interval Time: {interval} ms</label>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      
      {/* Memoized GraphInterface UI */}
      <MemoizedGraphInterface interval = {interval} />

      {/* Menu button */}
      {
        <button onClick={() => window.location.href = 'http://localhost:3000'} className="menu-button">
          Menu
        </button>
      }

      {/* Styling */}
      <style jsx>{`
        .interval-container {
          position: fixed;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
        }

        .interval-button {
          padding: 10px 20px;
          margin-right: 10px;
        }

        .interval-label {
          font-size: 1.2em;
        }

        .menu-button {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          margin: 10px;
        }
        .error-message {
          position: fixed;
          top: 60px;
          left: 20px;
          color: red;
        }
      `}</style>
    </div>
  );
}

// Wrap the component in the withAuth HOC to require authentication before rendering
export default withAuth(IntervalController);