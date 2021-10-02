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
      <div className="page-on-view">
        <Switch>
          <Route path='/categories'>
            
          </Route>
          <Route path='/tasks'>

          </Route>
          <Route path='/preferences'>

          </Route>
          <Route path='/'>
            <div>
              <div style={{border: "5px solid cornsilk",height: "35em", width: "35em", borderRadius: "50%", marginTop: "2em"}}></div>
              <div style={{border: "5px solid cornsilk",height: "35em", width: "35em", borderRadius: "50%", marginTop: "2em"}}></div>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
