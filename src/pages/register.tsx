import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser, editUser, userExists } from "../services/user-service";
import { RoleType, StatusType, User } from "../model/user";
import * as yup from "yup";

const RegisterPage = () => {
  const location = useLocation();
  const currentUser = location.state as User | undefined;

  // const validateSchema = yup.object().shape({
  //   // userId: yup.string().required().max(24),
  //   username: yup.string().required().max(15),
  //   password: yup.string().required().min(8),
  //   gender: yup.string().required(),
  //   role: yup.number().oneOf([RoleType.admin, RoleType.user]),
  //   avatar: yup
  //     .string()
  //     .required()
  //     .matches(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  //   bio: yup.string().required().max(512),
  //   status: yup.number().required().oneOf([]),
  // });

  const [user, setUser] = useState<User>(
    currentUser
      ? currentUser
      : {
          username: "",
          password: "",
          name: "",
          gender: "",
          role: RoleType.user,
          avatar: "",
          bio: "",
          status: StatusType.active,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
  );
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const existingUser = await userExists(user.username!);
      if (existingUser && !currentUser) {
        setErrorMessage("User already exists");
        return;
      }
      const saveUser = currentUser ? editUser : createUser;
      await saveUser({ ...user } as User);
      navigate(`${currentUser ? "/users" : "/login"}`);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#313131] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Регистриране</h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Gender"
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: Number(e.target.value) as RoleType })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={RoleType.user}>User</option>
          <option value={RoleType.admin}>Admin</option>
        </select>
        <input
          type="text"
          placeholder="Avatar"
          value={user.avatar}
          onChange={(e) => setUser({ ...user, avatar: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Bio"
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
        {errorMessage && <p className="mt-2 text-sm text-center text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
