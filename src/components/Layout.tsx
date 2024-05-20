import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <body className="flex flex-col">
      <nav className="flex flex-row">
        <ul className="flex gap-2 flex-row">
          <NavLink to="/">Начало</NavLink>
          <NavLink to="/login">Влизане</NavLink>
          <NavLink to="/recipes">Всички рецепти</NavLink>
          <NavLink to="/add">Добави рецепта</NavLink>
          <NavLink to="/users">Потребители</NavLink>
        </ul>
      </nav>
      <main className="flex">
        <Outlet />
      </main>
    </body>
  );
};

export default Layout;
