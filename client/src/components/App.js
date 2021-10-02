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
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [timeEntry, setTimeEntry] = useState(0);

  console.log(timeEntry);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then(userObj => setUser(userObj));
        }
      });
  }, []);

  function handleAddTime(duration) {
    fetch('/api/time_entries', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task,
        category,
        duration
      })
    }).then((r) => r.json())
      .then((timeAdded) => setTimeEntry(timeAdded.duration));
  }

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="page-on-view">
        <Switch>
          <Route path='/time-entries'>
            <AllTimeEntries task={task} category={category} timeEntry={timeEntry}/>
          </Route>
          <Route path='/preferences'>
            <PreferenceForm />
          </Route>
          <Route path='/'>
            <TimeItPage setTask={setTask} setCategory={setCategory} setTimeEntry={setTimeEntry} onAddTime={handleAddTime} />
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
