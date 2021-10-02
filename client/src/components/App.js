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
                <div style={{ display: "flex", flexDirection: "column", margin: 20}}>
                  <input style={{ margin: 30}} placeholder="task name" />
                  <input style={{ margin: 30}} placeholder="category" />
                </div>
                <div style={{border: "5px solid lemonchiffon",height: "25em", width: "25em", borderRadius: "50%", marginTop: "2em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <div style={{ fontSize: "2em", marginBottom: 20}}>Session</div>
                  <h1 style={{fontSize: "3em", marginBottom: 30}}>00:00</h1>
                  <div style={{minWidth: 150, display: "flex", justifyContent: "space-between"}}>
                    <button style={{width: "fit-content", fontSize: "1.15rem", marginTop: 10, borderRadius: 10, padding: "5px 9px", border: "none"}}>Start</button>
                    <button style={{width: "fit-content", fontSize: "1.15rem", marginTop: 10, borderRadius: 10, padding: "5px 9px", border: "none"}}>Reset</button>
                  </div>
                </div>
              </div>
            </Route>
          </Switch>
      </div>
      <footer id="footer">Made with ❤️ by Lisa</footer>
    </div>
  );
}

export default App;
