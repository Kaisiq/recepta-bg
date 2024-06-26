import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserCredentials } from "../services/user-service";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await checkUserCredentials(username, password);
    if (user) {
      window.sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex flex-col m-auto pt-10">
        <div className="bg-[#313131] p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Влизане</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
