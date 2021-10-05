import { useState } from 'react';

function LoginForm({ onLogin, setUserID }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation
      })
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((userObj) => {
          onLogin(userObj);
          setUserID(userObj.id);
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          // setErrors(err.traces['Application Trace']);
          setErrors(err.exception);
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        autoComplete="off"
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor="password_confirmation">Password Confirmation</label>
      <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit" style={{width: "fit-content", marginTop: "1em", padding: "0.5em", borderRadius: 5, border: "none"}}>
        {
          isLoading
          ? "Loading..."
          : "Login"
        }
      </button>
      {/* {
        errors.map(err => (
          <p key={err.id}>{err.trace}</p>
        ))
      } */}
      <p style={{marginTop: 15, color: "red", backgroundColor: "white"}}>{errors}</p>
    </form>
  );
}

export default LoginForm;
