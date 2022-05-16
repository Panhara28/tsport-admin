import { useState } from 'react';
import { useAuth } from '../hook/auth';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  function onSubmit(e: any) {
    e.preventDefault();
    signIn({ username, password });
  }

  return (
    <div>
      <form id="signin">
        <label>Sign In</label>
        <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={onSubmit} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
