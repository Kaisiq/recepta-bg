import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteUser } from "../services/user-service";
import { User } from "../model/user";
import { useState } from "react";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(useLoaderData() as User[]);

  const handleEditUser = async (user: User) => {
    navigate(`/register`, { state: user });
  };

  const handleDeleteUser = async (user: User) => {
    const res = await deleteUser(user.id!);
    setUsers(users.filter((u) => u.id != user.id!));
    return res;
  };

  return (
    <div className="flex m-auto flex-col gap-5 pt-20">
      {users.map((user, index) => {
        const createdAt = new Date(user.createdAt);
        const updatedAt = new Date(user.updatedAt);
        const bgColor = index % 2 === 0 ? "bg-[#171717]" : "bg-[#313131]";
        return (
          <div
            className={`flex flex-row gap-2 ${bgColor} p-2 rounded-lg text-center items-center`}
            key={user.id}
          >
            <div className="basis-full">{user.name}</div>
            <div className="basis-full">{user.username}</div>
            <div className="basis-full">{user.gender}</div>
            <div className="basis-full">{user.role}</div>
            <div className="basis-full">{user.avatar}</div>
            <div className="basis-full">{user.bio}</div>
            <div className="basis-full">{user.status}</div>
            <div className="basis-full">{createdAt.toLocaleString()}</div>
            <div className="basis-full">{updatedAt.toLocaleString()}</div>
            <button
              className="basis-full"
              onClick={() => handleEditUser(user)}
            >
              Edit
            </button>
            <button
              className="basis-full"
              onClick={() => handleDeleteUser(user)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
