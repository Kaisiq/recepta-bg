import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <body className="flex flex-col">
      <nav className="flex flex-row">
        <ul className="flex gap-2 flex-row">
          <NavLink to="/">Начало</NavLink>
          <NavLink to="/recipes">Всички рецепти</NavLink>
          <NavLink to="/add">Добави рецепта</NavLink>
          <NavLink to="/users">Потребители</NavLink>
          { window.sessionStorage.getItem("user") ? <a onClick={ () => {
            window.sessionStorage.removeItem("user");
            navigate("/");
          }}>Излизане</a> : <>
          <NavLink to="/register">Регистриране</NavLink>
          <NavLink to="/login">Влизане</NavLink>
          </>
          }
        </ul>
      </nav>
      <main className="flex">
        <Outlet />
      </main>
    </body>
  );
};

export default Layout;
