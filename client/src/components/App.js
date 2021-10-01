import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/App.css';
import NavBar from './NavBar';

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

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
