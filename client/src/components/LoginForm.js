import { useState } from 'react';

function LoginForm({ onLogin }) {
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
        passwordConfirmation: passwordConfirmation
      })
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((userObj) => onLogin(userObj))
      } else {
        r.json().then((err) => setErrors(err.errors));
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
      <label htmlFor="passwordConfirmation">Password Confirmation</label>
      <input
        type="password"
        id="passwordConfirmation"
        value={passwordConfirmation}
        onChange={e => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">
        {
          isLoading
          ? "Loading..."
          : "Login"
        }
      </button>
      {
        errors.map(err => (
          <p key={err}>{err}</p>
        ))
      }
    </form>
  );
}

export default LoginForm;
