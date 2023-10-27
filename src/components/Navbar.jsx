import { NavLink } from "react-router-dom"
import { Searchbar } from './'
import { useEffect, useRef, useState } from "react"

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    const ulRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        const navbar = document.querySelector('nav')
        const handleScrollY = () => {
            const scrollY = window.scrollY;
            const windowWidth = window.innerWidth;
            if (windowWidth > 800 && scrollY > 0) {
                navbar.classList.add('nav-black')
            } else {
                navbar.classList.remove('nav-black')
            }
        }


        document.addEventListener("click", handleClickOutside);
        document.addEventListener('scroll', handleScrollY);
        window.addEventListener('resize', handleScrollY)

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener('scroll', handleScrollY);
        };
    }, []);

    return (
        <nav className="flex">
            <div className="nav__menu-wrapper flex">
                <button className="nav-btn nav-btn-menu"
                    ref={ulRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                    <ul 
                        
                        className={`flex ${isOpen ? "ul-active" : ""}`}
                    >
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
                    <i className="fa-solid fa-film"></i>
            </div>
            <Searchbar/>
        </nav>
    )
}
