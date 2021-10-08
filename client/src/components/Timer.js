import { useEffect, useState } from 'react';

function Timer({ 
  task, category, userID, taskID,
  categoryID, setEnableLongBreak,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  enableLongBreak, 
  longBreakLength, setLongBreakLength,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak
 }) {

  const [counter, setCounter] = useState(1);
  const [timerLabel, setTimerLabel] = useState("Session");  
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeEntry, setTimeEntry] = useState(0);

  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  useEffect(() => {
    fetch('/api/me')
      .then(r => r.json())
      .then(userObj => {
        setSecondsLeft(userObj.session_length * 60);
        setBreakLength(userObj.break_length);
        setEnableLongBreak(userObj.enable_long_break);
        setLongBreakLength(userObj.long_break_length);
        setNumberOfSessionsBeforeLongBreak(userObj.no_of_sessions_before_long_break);
      });
  }, [setBreakLength, setEnableLongBreak, setLongBreakLength, setSecondsLeft,
      setNumberOfSessionsBeforeLongBreak]);

  useEffect(() => {

    function handleAddTime(sessionLength) {
      fetch('/api/time_entries', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID,
          taskID,
          categoryID,
          duration: sessionLength
        })
      }).then((r) => r.json())
        .then((timeAdded) => {
          console.log(timeAdded);
          setTimeEntry(timeAdded.duration);
        });
    }

    function handleSwitch() {
      if (enableLongBreak) {
        if (timerLabel === 'Session') {
          if (counter >= numberOfSessionsBeforeLongBreak) {
            setTimerLabel('Long Break');
            setSecondsLeft(longBreakLength * 60);
            setTimeEntry(sessionLength);
            handleAddTime(sessionLength);
            setCounter(1);
          } else {
            setTimerLabel('Short Break');
            setSecondsLeft(breakLength * 60);
            setTimeEntry(sessionLength);
            handleAddTime(sessionLength);
            setCounter(counter => counter + 1);
          }
        } else if (timerLabel === 'Short Break' || timerLabel === 'Long Break') {
          setTimerLabel('Session');
          setSecondsLeft(sessionLength * 60);
        }
      } else {
        if (timerLabel === 'Session') {
          setTimerLabel('Break');
          setSecondsLeft(breakLength * 60);
          setTimeEntry(sessionLength);
          handleAddTime(sessionLength);
        } else if (timerLabel === 'Break') {
          setTimerLabel('Session');
          setSecondsLeft(sessionLength * 60);
        }
      }
    }

    let intervalID = null;
    if (timerRunning && secondsLeft > 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 10);
    } 
    else if (timerRunning && secondsLeft === 0) {
      intervalID = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 10);
      handleSwitch();
    }
    else {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);

  }, [sessionLength, breakLength, timerLabel, 
    setTimerLabel, setSecondsLeft, secondsLeft,
    timerRunning, setTimeEntry, counter, 
    numberOfSessionsBeforeLongBreak,
    longBreakLength, setBreakLength,
    setTimerRunning, enableLongBreak,
    categoryID, userID, taskID
  ]);

  function handleStart() {
    if (task && category) {
    setTimerRunning(true);
    setBreakLength(breakLength);
    } else {
      alert("Please enter a task and press ENTER to submit AND a category and press ENTER to submit, pressing ENTER each time after filling out each input field.  Thank you : )");
    }
  }

  function handleStop() {
    setTimerRunning(false);
  }

  function handleReset() {
    setSessionLength(sessionLength);
    setBreakLength(breakLength);
    setSecondsLeft(sessionLength * 60);
    setTimerLabel('Session');
    setTimerRunning(false);
  }

  return (
    <div className="timer-component">
      <div className="timer-container">
        <h2 className="timer-label">{timerLabel}</h2>
        <h3 className="time-left">
          {
            minutes < 10
            ? ("0" + minutes).slice(-2)
            : minutes
          }:{
            seconds < 10
            ? ("0" + seconds).slice(-2)
            : seconds
          }
        </h3>
      
        <div className="button-container">
          <button className="start-stop"
            onClick={timerRunning ? handleStop : handleStart}
          >
            {
              timerRunning
              ? "Pause"
              : "Start"
            }
          </button>
          <button className="reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        {
          timeEntry !== 0
          ? <p>{`${timeEntry} minutes session is saved`}</p>
          : <></>
        }
      </div>
    </div>
  );
}

export default Timer;
