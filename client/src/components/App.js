import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import NavBar from './NavBar';
import Login from '../pages/Login';
import PreferenceForm from './PreferenceForm';
import AllTimeEntries from '../pages/AllTimeEntries';
import TimeItPage from '../pages/TimeItPage';

function App() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState("");
  const [task, setTask] = useState("");
  const [taskname, setTaskname] = useState("");
  const [taskID, setTaskID] = useState("");
  const [category, setCategory] = useState("");  
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categoryID, setCategoryID] = useState("");

  const [sessionLength, setSessionLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);

  const [enableLongBreak, setEnableLongBreak] = useState(false);
  const [numberOfSessionsBeforeLongBreak, setNumberOfSessionsBeforeLongBreak] = useState(0);
  const [longBreakLength, setLongBreakLength] = useState(0);

  const [timerLabel, setTimerLabel] = useState('Session');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeEntry, setTimeEntry] = useState(0);

  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then(userObj => {
            setUser(userObj);
            setUserID(userObj.id);
            setSessionLength(userObj.session_length);
            setBreakLength(userObj.break_length);
            setEnableLongBreak(userObj.enable_long_break);
            setNumberOfSessionsBeforeLongBreak(userObj.no_of_sessions_before_long_break);
            setLongBreakLength(userObj.long_break_length);
          });
        }
      });
  }, []);

  function updatePreferences(formData) {
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((r) => {
      if (r.ok) {
        r.json().then(userObj => {
          setErrors("");
          setUser(userObj);
          setSessionLength(userObj.session_length);
          setEnableLongBreak(userObj.enable_long_break);
          setBreakLength(userObj.break_length);
        });
      } else {
        r.json().then(err => {
          console.log(err);
          alert(err.errors);
          setErrors(err.errors);
        });
      }
    });      
  }

  if (!user) {
    return (
      <Login onLogin={setUser} 
        setUserID={setUserID} />
    );
  }

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="page-on-view">
        <Switch>
          <Route path='/time-entries'>
            <AllTimeEntries
              userID={userID}
              taskID={taskID}
              setTaskID={setTaskID}
              categoryID={categoryID}
              setCategoryID={setCategoryID}
              setCategory={setCategory}
              categoryLabel={categoryLabel}
              task={task}
              setTask={setTask}
              taskname={taskname}
              setTaskname={setTaskname}
              timeEntry={timeEntry}
              setTimeEntry={setTimeEntry}
            />
          </Route>
          <Route path='/preferences'>
            <PreferenceForm 
              sessionLength={sessionLength}
              setSessionLength={setSessionLength}
              breakLength={breakLength}
              setBreakLength={setBreakLength}
              enableLongBreak={enableLongBreak}
              setEnableLongBreak={setEnableLongBreak}
              numberOfSessionsBeforeLongBreak={numberOfSessionsBeforeLongBreak}
              setNumberOfSessionsBeforeLongBreak={setNumberOfSessionsBeforeLongBreak}
              longBreakLength={longBreakLength}
              setLongBreakLength={setLongBreakLength}
              updatePreferences={updatePreferences} />
          </Route>
          <Route path='/'>
            <TimeItPage 
              user={user}
              sessionLength={sessionLength}
              setSessionLength={setSessionLength}
              breakLength={breakLength}
              setBreakLength={setBreakLength}
              timerLabel={timerLabel}
              setTimerLabel={setTimerLabel}
              timerRunning={timerRunning}
              setTimerRunning={setTimerRunning}
              timeEntry={timeEntry}
              setTimeEntry={setTimeEntry}
              userID={userID}
              task={task}
              taskID={taskID}
              setTask={setTask} 
              setTaskID={setTaskID}
              taskname={taskname}
              setTaskname={setTaskname}
              categoryID={categoryID}
              category={category}
              categoryLabel={categoryLabel}
              setCategoryLabel={setCategoryLabel}
              setCategory={setCategory} 
              setCategoryID={setCategoryID}
              enableLongBreak={enableLongBreak}
              setEnableLongBreak={setEnableLongBreak}
              numberOfSessionsBeforeLongBreak={numberOfSessionsBeforeLongBreak}
              setNumberOfSessionsBeforeLongBreak={setNumberOfSessionsBeforeLongBreak}
              longBreakLength={longBreakLength}
              setLongBreakLength={setLongBreakLength}
              errors={errors} />
          </Route>
          <Route path='/*'>
            <div id="404-page">
              404 Page Not Found
            </div>
          </Route>
        </Switch>
      </div>
      <footer id="footer">
        <span>Made with ❤️ by Lisa</span>
      </footer>
    </div>
  );
}

export default App;
