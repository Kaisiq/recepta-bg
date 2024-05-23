import { useLoaderData } from "react-router-dom";
import { User, deleteUser, editUser } from "../services/user-service";

const UsersPage = () => {
  const users = useLoaderData() as User[];

  const handleEditUser = async (user: User) => {
    const res = await editUser(user);
    return res;
  };

  const handleDeleteUser = async (user: User) => {
    const res = await deleteUser(user.id!);
    return res;
  }

  return (
    <div>
      {users.map((user) => {
        const createdAt = new Date(user.createdAt);
        const updatedAt = new Date(user.updatedAt);
        return(
        <div key={user.id}>
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
      )})}
    </div>
  );
};

export default UsersPage;
