import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] flex-col">
      <nav className="flex content-center p-5 flex-row m-auto text-xl">
        <ul className="flex gap-5 flex-row m-auto">
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
      <main className="flex min-w-[100vw] m-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
