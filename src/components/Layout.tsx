import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <body>
    <div>
      <nav>
        <ul>
          <NavLink to="/">Начало</NavLink>
          <NavLink to="/login">Влизане</NavLink>
          <NavLink to="/recipes">Всички рецепти</NavLink>
          <NavLink to="/add">Добави рецепта</NavLink>
          <NavLink to="/users">Потребители</NavLink>
        </ul>
      </nav>
    </div>
    <main>
      <Outlet/>
    </main>
    </body>
  )
}

export default Layout