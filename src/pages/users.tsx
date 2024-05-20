import { useLoaderData } from "react-router-dom";
import { User } from "../services/user-service";

const UsersPage = () => {
  const users = useLoaderData() as User[];

  return (
    <div>
      {users.map((user) => (
        <>
          <div key={user.id}>{user.name}</div>
        </>
      ))}
    </div>
  );
};

export default UsersPage;
