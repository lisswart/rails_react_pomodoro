import { Link, useHistory } from 'react-router-dom';

function NavBar({ user, setUser }) {

  let history = useHistory();

  function handleLogoutClick() {
    fetch('/api/logout', { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
          history.push("/");
        }
      });
  }

  return (
    <div className="navbar">
      <div id="logo">
      <h2><Link to="/">Clockit</Link></h2>
      </div>
      {
        user
        ? <div className="greetings">◊  {user.username}  ◊</div>
        : <></>
      }
      <div className="navigation">
        <h4>
          <Link to="/time-entries">
            Time Entries
          </Link>
        </h4>
        <h4>
          <Link to="/preferences">
            Preferences
          </Link>
        </h4>
        <button onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
