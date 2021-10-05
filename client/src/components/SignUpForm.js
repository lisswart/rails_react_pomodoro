import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function SignUpForm({ onLogin }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch('/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        password_confirmation: passwordConfirmation
      })
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((userObj) => {
          console.log(userObj);
          onLogin(userObj);
          // history.push("/");
        });
      } else {
        r.json().then((err) => {
          console.log(err);
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        value={firstname}
        onChange={e => setFirstname(e.target.value)}
      />
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        value={lastname}
        onChange={e => setLastname(e.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        autoComplete="off"
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        autoComplete="off"
        onChange={e => setEmail(e.target.value)}
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
      <button type="submit" 
        style={{width: "fit-content", marginTop: "1em", padding: "0.5em", borderRadius: 5, border: "none"}}
      >
        {
          isLoading
          ? "Loading..."
          : "Sign Up"
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

export default SignUpForm;
