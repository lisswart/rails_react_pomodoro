import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  task, category, errors,
  setTask, setTaskID,
  setCategory, setCategoryID,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime,
  enableLongBreak, longBreakLength,
  numberOfSessionsBeforeLongBreak
 }) {
    
  return (
    <div id="timer-component">
      <p style={{color: "red", backgroundColor: "white"}}>{errors}</p>
      <AddTaskForm 
        setTask={setTask} 
        setTaskID={setTaskID} 
      />
      <AddCategoryForm 
        setCategory={setCategory}
        setCategoryID={setCategoryID} 
      />
      <Timer 
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLength={breakLength}
        setBreakLength={setBreakLength}
        timerLabel={timerLabel}
        setTimerLabel={setTimerLabel}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        task={task}
        category={category}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        setTimeEntry={setTimeEntry} 
        onAddTime={onAddTime} 
        enableLongBreak={enableLongBreak}
        numberOfSessionsBeforeLongBreak={numberOfSessionsBeforeLongBreak}
        longBreakLength={longBreakLength}
      />
      
      <div className="reset-reminder">
        <p>Dear erudites,</p>
        <p>some gentle reminders: </p>
        <ul>
          <li>After updating timer setting in preferences tab, press reset to activate the updated setting</li>
          <li>Upon signup, when you're redirected to this page, please refresh the page to clear the browser cache before starting the timer to prevent issues with time_entries</li>
          <li>Only completed sessions that have task name and category label are saved as a time entry</li>
          <li>Timer is paused whenever you click a link to another page</li>
          <li>Please reset the timer before logging out</li>
        </ul>
      </div>
    </div>
  );
}

export default TimeItPage;
