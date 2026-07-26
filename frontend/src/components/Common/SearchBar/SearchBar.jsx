import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get search query from URL if available
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("search") || "";

    const [searchTerm, setSearchTerm] = useState(queryParam);

    // Sync input with URL change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchTerm(queryParam);
    }, [queryParam]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // If user is on home page, update URL query parameter dynamically
        if (location.pathname.includes("/student/home")) {
            if (value.trim() !== "") {
                navigate(`/student/home?search=${encodeURIComponent(value)}`, { replace: true });
            } else {
                navigate(`/student/home`, { replace: true });
            }
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        if (location.pathname.includes("/student/home")) {
            navigate(`/student/home`, { replace: true });
        }
    };

    return (
        <div className="search-bar-container">
            <FiSearch className="search-icon" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search courses (e.g., React, Python)..." 
            />
            {searchTerm && (
                <button className="clear-search-btn" onClick={handleClear}>
                    <FiX />
                </button>
            )}
        </div>
    );
}

export default SearchBar;