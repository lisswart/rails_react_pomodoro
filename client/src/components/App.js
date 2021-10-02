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

  useEffect(() => {
    fetch('/api/me')
      .then((r) => {
        if (r.ok) {
          r.json().then(userObj => setUser(userObj));
        }
      });
  }, []);

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="page-on-view">
        <Switch>
          <Route path='/time-entries'>
            <AllTimeEntries />
          </Route>
          <Route path='/preferences'>
            <PreferenceForm />
          </Route>
          <Route path='/'>
            <TimeItPage />
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
