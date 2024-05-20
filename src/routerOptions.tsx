import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import RecipesPage from "./pages/recipes.tsx";
import { getAllRecipes } from "./services/recipe-service.ts";
import { LoginPage } from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import UsersPage from "./pages/users.tsx";
import { findAllUsers } from "./services/user-service.ts";

export const routerOptions : RouteObject = {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "/users",
            element: <UsersPage/>,
            loader: findAllUsers
        },
        {
            path: "/logout",
            element: <App/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <App/>
        },
        {
            path:"/recipes",
            element: <RecipesPage/>,
            loader: getAllRecipes
        },
        {
            path:"/add",
            element: <RecipesPage/>,
            loader: getAllRecipes
        }
    ]
}

export default routerOptions;

export const routes = [
    routerOptions
]