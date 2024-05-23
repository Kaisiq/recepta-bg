import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import RecipesPage from "./pages/recipes.tsx";
import { getAllRecipes, getLatestRecipes } from "./services/recipe-service.ts";
import { LoginPage } from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import UsersPage from "./pages/users.tsx";
import { checkUserLogged, findAllUsers } from "./services/user-service.ts";
import HomePage from "./pages/home.tsx";
import AddRecipePage from "./pages/add-recipe.tsx";
import EditRecipePage from "./pages/edit-recipe.tsx";

export const routerOptions: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
      loader: getLatestRecipes,
    },
    {
      path: "/users",
      element: <UsersPage />,
      loader: findAllUsers,
    },
    {
      path: "/logout",
      element: <App />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/recipes",
      element: <RecipesPage />,
      loader: getAllRecipes,
    },
    {
      path: "/add",
      element: <AddRecipePage />,
      loader: checkUserLogged,
    },
    {
      path: "/edit",
      element: <EditRecipePage />,
      loader: checkUserLogged,
    },
  ],
};

export default routerOptions;

export const routes = [routerOptions];
