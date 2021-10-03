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

  const [sessionLength, setSessionLength] = useState(2);
  const [breakLength, setBreakLength] = useState(1);

  const [enableLongBreak, setEnableLongBreak] = useState(false);
  const [longBreakLength, setLongBreakLength] = useState(0);

  const [timerLabel, setTimerLabel] = useState('Session');
  const [secondsLeft, setSecondsLeft] = useState(2 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // console.log("user id: ", userID);
  // console.log("task id: ", taskID);
  // console.log("category id: ", categoryID);
  // console.log("time entry: ", sessionLength);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then(userObj => setUser(userObj));
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
              longBreakLength={longBreakLength}
              setLongBreakLength={setLongBreakLength}
              setUser={setUser} />
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
