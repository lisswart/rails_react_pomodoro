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
  const [userID, setUserID] = useState(null);
  const [task, setTask] = useState("");
  const [taskID, setTaskID] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState(null);
  const [timeEntry, setTimeEntry] = useState(0);

  const [sessionLength, setSessionLength] = useState(0);
  const [breakLength, setBreakLength] = useState(0);

  const [enableLongBreak, setEnableLongBreak] = useState(false);
  const [numberOfSessionsBeforeLongBreak, setNumberOfSessionsBeforeLongBreak] = useState(0);
  const [longBreakLength, setLongBreakLength] = useState(0);

  const [timerLabel, setTimerLabel] = useState('Session');
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  console.log("user id: ", userID);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then(userObj => {
            setUser(userObj);
            setSecondsLeft(userObj.session_length * 60);
            setSessionLength(userObj.session_length);
            setBreakLength(userObj.break_length);
            setEnableLongBreak(userObj.enable_long_break);
            setNumberOfSessionsBeforeLongBreak(userObj.no_of_sessions_before_long_break);
            setLongBreakLength(userObj.long_break_length);
          });
        }
      });
  }, []);

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

  function updatePreferences(formData) {
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((r) => r.json())
      .then(userObj => {
        console.log(userObj);
        setUser(userObj);
        setSessionLength(parseInt(userObj.sessionLength, 10));
        setBreakLength(parseInt(userObj.breakLength, 10));
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
            <AllTimeEntries task={task} category={category} timeEntry={timeEntry}/>
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
              setTask={setTask} 
              setTaskID={setTaskID}
              setCategory={setCategory} 
              setCategoryID={setCategoryID}
              setTimeEntry={setTimeEntry} 
              onAddTime={handleAddTime} />
          </Route>
          <Route path='*'>
            <div id="404-page">
              404 Page Not Found
            </div>
          </Route>
        </Switch>
      </div>
      <footer id="footer">
        Made with ❤️ by Lisa
      </footer>
    </div>
  );
}

export default App;
