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
    <div className="flex flex-col gap-5">
      {users.map((user) => {
        const createdAt = new Date(user.createdAt);
        const updatedAt = new Date(user.updatedAt);
        return (
          <div
            className="flex flex-row gap-2"
            key={user.id}
          >
            <div>{user.name}</div>
            <div>{user.username}</div>
            <div>{user.gender}</div>
            <div>{user.role}</div>
            <div>{user.avatar}</div>
            <div>{user.bio}</div>
            <div>{user.status}</div>
            <div>{createdAt.toLocaleString()}</div>
            <div>{updatedAt.toLocaleString()}</div>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersPage;
