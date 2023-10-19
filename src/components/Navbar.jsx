import { NavLink } from "react-router-dom"
import { Searchbar } from './'

export default function Navbar() {
    return (
        <nav className="flex">
            <div className="nav__menu flex">
                <i className="fa-solid fa-film"></i>
                <ul className="flex">
                    <li>
                        <NavLink to={'/'} className={({isActive}) => isActive ? "active" : "" }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/shows'}>
                            Shows
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/movies'}>
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </div>
            <Searchbar/>
        </nav>
    )
}
