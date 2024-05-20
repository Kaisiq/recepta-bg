import { useLoaderData } from 'react-router-dom';
import { User } from '../services/user-service';

const UsersPage = () => {
  const users = useLoaderData() as User[];

  return (
    <div>
      {users.map((user) => (
        <>
        <div key={user.id}>{user.firstName}</div>
        <div>asd</div>
        </>
      ))}
    </div>
  );
};

export default UsersPage;
