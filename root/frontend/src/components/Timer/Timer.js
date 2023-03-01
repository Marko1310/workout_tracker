import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  let updatedS = seconds,
    updatedM = minutes,
    updatedH = hours;

  const start = () => {
    setInterval(() => {
      updatedS++;
      setSeconds(updatedS);
    }, 1000);
  };

  start();

  return (
    <div className="timer-container">
      <p>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

export default Timer;
