import { makeStyles } from '@mui/styles';
import React from 'react';
import Countdown from 'react-countdown';

const Completionist = () => <span>You are good to go!</span>;
// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="sh-countdown-timer">
        <p className="time-counting">
          <span>{days}</span>
          <span>{hours}</span>
          <span>{minutes}</span>
          <span>{seconds}</span>
        </p>
        <p className="time-label">
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MINUTES</span>
          <span>SECONDS</span>
        </p>
      </div>
    );
  }
};

const ShCountDown = () => {
  return <Countdown date={Date.now() + 5000000} renderer={renderer} />;
};

export default ShCountDown;
