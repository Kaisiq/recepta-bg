export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  gender: string;
  role: "user" | "admin";
  avatar: string;
  bio: string;
  status: "active" | "suspended" | "deactivated";
  createdAt: Date;
  updatedAt: Date;
}

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
