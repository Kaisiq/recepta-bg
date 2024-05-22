import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleType, StatusType, createUser, userExists } from "../services/user-service";
import { User } from "../services/user-service";

const RegisterPage = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    name: "",
    gender: "",
    role: undefined,
    avatar: "",
    bio: "",
    status: StatusType.active,
  });
  const [errorMessage,setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const existingUser = await userExists(user.username!);
      if (existingUser) {
        setErrorMessage("User already exists");
        return;
      }
      await createUser({ ...user } as User);
      navigate("/login");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-black text-2xl font-bold text-center">Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({...user, name: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Gender"
          value={user.gender}
          onChange={(e) => setUser({...user, gender: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={user.role}
          onChange={(e) => setUser({...user, role: Number(e.target.value) as RoleType})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={RoleType.user}>User</option>
          <option value={RoleType.admin}>Admin</option>
        </select>
        <input
          type="text"
          placeholder="Avatar"
          value={user.avatar}
          onChange={(e) => setUser({...user, avatar: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Bio"
          value={user.bio}
          onChange={(e) => setUser({...user, bio: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
        {errorMessage && (
          <p className="mt-2 text-sm text-center text-red-500">{errorMessage}</p> 
        )}
      </div>
    </div>
    
  );
};

export default RegisterPage;