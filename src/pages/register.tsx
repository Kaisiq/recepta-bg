import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, userExists } from "../services/user-service";
import { User } from "../services/user-service";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const existingUser = await userExists(username);
      if (existingUser) {
        setErrorMessage("User already exists");
        return;
      }

      await createUser({ username, password, email, firstName, lastName } as User);
      navigate("/login");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegisterPage;
