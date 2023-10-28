import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Searchbar() {

    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchBarRef = useRef();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-results/${searchTerm}`)

        setSearchTerm("")
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchBarRef} className={`searchbar-wrapper flex ${isOpen ? "searchbar-wrapper-active" : ""}`}>
            <button
                onClick={() => setIsOpen(prev => !prev)} 
                className={`nav-btn nav-btn--searchbar ${isOpen ? "btn-to-right" : ""}`}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <form 
                action=""
                className={`searchbar-form flex  ${isOpen ? "activeSearch" : ""}`}
                onSubmit={handleSearch}
                role="search"
            >
                <input
                    className={`searchbar`}
                    type="search" 
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    spellCheck
                    required
                />
            </form>
        </div>
    )
}
