import { Link } from 'react-router-dom';

function NavBar({ setUser }) {
  function handleLogoutClick() {
    fetch('/api/logout', { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      });
  }

  return (
    <div className="navbar">
      <div id="logo">
        <h2>Clockit</h2>
      </div>
      <div className="navigation">
        <h4>Time Entries</h4>
        <h4>Preferences</h4>
        <button onClick={handleLogoutClick} style={{marginLeft: "0.5em", borderRadius: 5, border: "2px solid cornsilk", padding: "0 1em", backgroundColor: "transparent", color: "cornsilk"}}>Logout</button>
      </div>
    </div>
  );
}

export default NavBar;
