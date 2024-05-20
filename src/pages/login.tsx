// Suggested code may be subject to a license. Learn more: ~LicenseLog:667480365.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:587100720.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2158931211.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserCredentials } from '../services/user-service';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await checkUserCredentials(username, password);
    if (user) {
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
