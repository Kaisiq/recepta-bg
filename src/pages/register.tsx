import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, userExists } from "../services/user-service";
import { User } from "../services/user-service";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const existingUser = await userExists(username);
      if (existingUser) {
        setErrorMessage("User already exists");
        return;
      }
      const status = "active";

      await createUser({ username, password, name, gender, role, avatar, bio, status } as User);
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
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <input
        type="text"
        placeholder="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegisterPage;
