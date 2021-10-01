import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import NavBar from './NavBar';
import Login from '../pages/Login';

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
      <Switch>
        <Route path=''>

        </Route>
        <Route path='/'>

        </Route>
      </Switch>
    </div>
  );
}

export default App;
