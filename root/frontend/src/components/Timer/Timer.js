import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const [timer, setTimer] = useState({ seconds: 0, minutes: 0, hours: 0 });

  let updatedS = timer.seconds,
    updatedM = timer.minutes,
    updatedH = timer.hours;

  const run = () => {
    if (updatedS > 9) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTimer({ seconds: updatedS, minutes: updatedM, hours: updatedH });
  };

  if (true) setInterval(run, 1000);

  return (
    <div className="timer-container">
      <p>
        {timer.hours < 10 ? "0" + timer.hours : timer.hours}:
        {timer.minutes < 10 ? "0" + timer.minutes : timer.minutes}:
        {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
      </p>
    </div>
  );
};

export default Timer;
