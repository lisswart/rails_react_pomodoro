import Timer from '../components/Timer';
import AddCategoryForm from '../components/AddCategoryForm';
import AddTaskForm from '../components/AddTaskForm';

function TimeItPage({ 
  task, category, errors,
  timeEntry, setTimeEntry,
  userID, taskID, categoryID,
  setTask, setTaskID,
  taskname, setTaskname,
  setCategory, setCategoryID,
  categoryLabel, setCategoryLabel,
  sessionLength, setSessionLength,
  breakLength, setBreakLength,
  timerLabel, setTimerLabel,
  secondsLeft, setSecondsLeft,
  timerRunning, setTimerRunning,
  setEnableLongBreak,
  enableLongBreak, longBreakLength,
  numberOfSessionsBeforeLongBreak,
  setNumberOfSessionsBeforeLongBreak,
  setLongBreakLength
 }) {
    
  return (
    <div id="timer-component">
      <p style={{color: "red", backgroundColor: "white"}}>{errors}</p>
      <AddTaskForm 
        setTask={setTask} 
        setTaskID={setTaskID} 
        taskname={taskname}
        setTaskname={setTaskname}
      />
      <AddCategoryForm 
        setCategory={setCategory}
        setCategoryID={setCategoryID} 
        categoryLabel={categoryLabel}
        setCategoryLabel={setCategoryLabel}
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
        userID={userID}
        taskID={taskID}
        task={task}
        categoryID={categoryID}
        category={category}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        timeEntry={timeEntry}
        setTimeEntry={setTimeEntry} 
        enableLongBreak={enableLongBreak}
        setEnableLongBreak={setEnableLongBreak}
        numberOfSessionsBeforeLongBreak={numberOfSessionsBeforeLongBreak}
        setNumberOfSessionsBeforeLongBreak={setNumberOfSessionsBeforeLongBreak}
        longBreakLength={longBreakLength}
        setLongBreakLength={setLongBreakLength}
      />
      
      <div className="session-saved">
        {
          timeEntry === undefined
          ? <p style={{width: "10rem", textAlign: "center", backgroundColor: "tomato", color: "whitesmoke"}}>Session failed to save</p>
          : timeEntry === 0
          ? <></>
          : <p style={{width: "10rem", textAlign: "center", color: "floralwhite"}}>{`${timeEntry} min. session is saved`}</p>
        }
      </div>
    </div>
  );
}

export default TimeItPage;
