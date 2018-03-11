import React from 'react';
import PropTypes from 'prop-types';
import './TimeBar.css';

const startMinutes = 7 * 60;
const endMinutes = 19 * 60;

const parseAvailableTime = availableTime =>
  availableTime.map((timeRange) => {
    const range = timeRange.split(' - ');
    const timeMinBoundary = range[0].split(':');
    const timeMaxBoundary = range[1].split(':');
    return [
      (parseInt(timeMinBoundary[0], 10) * 60) + parseInt(timeMinBoundary[1], 10),
      (parseInt(timeMaxBoundary[0], 10) * 60) + parseInt(timeMaxBoundary[1], 10),
    ];
  });


const getTimeIntervals = (availableTime) => {
  const timers = [];
  const parsedTimeSlot = parseAvailableTime(availableTime);
  for (let currentTime = startMinutes; currentTime < endMinutes; currentTime += 15) {
    const timeSlot = {
      isAvailable: parsedTimeSlot.some(timeRange =>
        timeRange[0] <= currentTime && currentTime < timeRange[1]),
      isHour: !!(currentTime % 60 === 0),
      time: currentTime,
    };
    timers.push(timeSlot);
  }
  return timers;
};

const TimeBar = ({ availableTime, height }) => (
  <div className="time-bar-container">
    {
      getTimeIntervals(availableTime).map(({ isAvailable, isHour, time }) => (
        <div
          key={time}
          className={`time-bar ${isAvailable ? 'available ' : ''} ${isHour ? 'hour' : ''}`}
          style={{ height }}
        >
          {
            isHour && (<span className="time-bar-hour">{time / 60}:00</span>)
          }
        </div>
      ))
    }
  </div>
);

TimeBar.propTypes = {
  availableTime: PropTypes.array,
  height: PropTypes.string,
};

TimeBar.defaultProps = {
  availableTime: ['07:00 - 08:15', '10:30 - 19:00'],
  height: '20px',
};

export default TimeBar;
