import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  setTask, setTaskID,
  setCategory, setCategoryID,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setTimeEntry, onAddTime }) {
    
  return (
    <div id="timer-component">
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
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        setTimeEntry={setTimeEntry} 
        onAddTime={onAddTime} 
      />
      
      <div className="reset-reminder">
        <p className="reset-reminder">Dear erudites,</p>
        <p className="reset-reminder">some gentle reminders: </p>
        <ul className="reset-reminder">
          <li> After updating timer setting in preferences tab, press reset to activate the updated setting</li>
          <li>Only completed sessions that have task name and category label are saved as a time entry</li>
          <li>Timer is paused whenever you click a link to another page</li>
          <li>Please reset the timer before logging out</li>
        </ul>
      </div>
    </div>
  );
}

export default TimeItPage;
