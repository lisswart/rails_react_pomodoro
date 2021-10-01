import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login">
      {
        showLogin
        ? (
          <>
            <LoginForm onLogin={onLogin} />
            <br />
            <p>
              Don't have an account? &nbsp;
              <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </p>
          </>
      ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <br />
            <p>
              Already have an account? &nbsp;
              <button onClick={() => setShowLogin(true)}>Log In</button>
            </p>
          </>
        )
      }
    </div>
  );
}

export default Login;
