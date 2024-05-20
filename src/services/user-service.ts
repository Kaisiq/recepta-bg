import * as yup from 'yup';

export enum RoleType {
  user = 1,
  admin = 2,
}
export enum StatusType {
  active = 1, suspended, deactivated,
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  gender: string;
  role: RoleType;
  avatar: string;
  bio: string;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
}

export const userValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  gender: yup.string().required('Gender is required'),
  role: yup.number().required('Role is required'),
  avatar: yup.string(),
  bio: yup.string(),
});


const server = "http://localhost:3000";

// Create a user
export async function createUser(user: User): Promise<User> {
  const response = await fetch(`${server}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

// Find all users
export async function findAllUsers() {
  const response = await fetch("http://localhost:3000/users");
  return (await response.json()) as User[];
}

// Edit a user
export async function editUser(user: User): Promise<User> {
  const response = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

// Delete a user
export async function deleteUser(id: number): Promise<void> {
  await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });
}

// Check if user exists
export async function userExists(username: string): Promise<boolean> {
  const response = await fetch(`http://localhost:3000/users?username=${username}`);
  const users = await response.json();
  return users.length > 0;
}

// Check for username and password combination
export async function checkUserCredentials(username: string, password: string): Promise<boolean> {
  const response = await fetch(
    `http://localhost:3000/users?username=${username}&password=${password}`
  );
  const users = await response.json();
  return users.length > 0;
}
