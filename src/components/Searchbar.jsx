import { useState, useRef, useEffect } from "react"

export default function Searchbar() {

    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const searchBarRef = useRef()

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
        <div ref={searchBarRef} className={`searchbar-wrapper ${isOpen ? "activeSearch" : ""}`}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <form 
                action=""
                className="searchbar-form flex"
                onSubmit={() => {}}
            >
                <input
                    className={`searchbar ${isOpen ? "activeSearch" : ""}`}
                    type="search" 
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>
    )
}
