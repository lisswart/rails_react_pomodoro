import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function Login({ onLogin, setUserID }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login">
      {
        showLogin
        ? (
          <>
            <LoginForm 
              onLogin={onLogin}
              setUserID={setUserID} />
            <br />
            <div className="signup-login-question-container">
              <p>
                Don't have an account? &nbsp;
                <button onClick={() => setShowLogin(false)}
                  style={{width: "fit-content", marginTop: "1em", padding: "0.5em", borderRadius: 5, border: "none"}}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </>
      ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <br />
            <div className="signup-login-question-container">
              <p>
                Already have an account? &nbsp;
                <button onClick={() => setShowLogin(true)}
                  style={{width: "fit-content", marginTop: "1em", padding: "0.5em", borderRadius: 5, border: "none"}}
                >Log In</button>
              </p>
            </div>
          </>
        )
      }
    </div>
  );
}

export default Login;
