import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import RecipesPage from "./pages/recipes.tsx";
import { getAllRecipes } from "./services/recipe-service.ts";
import { LoginPage } from "./pages/login.tsx";

export const routerOptions : RouteObject = {
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "/home",
            element: <App/>
        },
        {
            path: "/about",
            element: <App/>
        },
        {
            path: "/contact",
            element: <App/>
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
    ]
}

export default routerOptions;

export const routes = [
    routerOptions
]