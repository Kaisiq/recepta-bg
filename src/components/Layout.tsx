import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] flex-col w-full">
      <nav className="flex flex-row m-auto">
        <ul className="flex gap-2 flex-row">
          <NavLink to="/">Начало</NavLink>
          <NavLink to="/recipes">Всички рецепти</NavLink>
          <NavLink to="/add">Добави рецепта</NavLink>
          <NavLink to="/users">Потребители</NavLink>
          {window.sessionStorage.getItem("user") ? (
            <a
              onClick={() => {
                window.sessionStorage.removeItem("user");
                navigate("/");
              }}
            >
              Излизане
            </a>
          ) : (
            <>
              <NavLink to="/register">Регистриране</NavLink>
              <NavLink to="/login">Влизане</NavLink>
            </>
          )}
        </ul>
      </nav>
      <main className="flex">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
