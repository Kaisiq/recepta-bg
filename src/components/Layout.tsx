import { Link, NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <body>
    <div>
      <nav>
        <ul>
          <NavLink to="/">Начало</NavLink>
          <li>Влизане</li>
          <NavLink to="/recipes">Всички рецепти</NavLink>
          <li>Добави рецепта</li>
          <li>Потребители</li>
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