import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import "../css/LoggedInNavigationBar.css";

// eslint-disable-next-line react/prop-types
const NavigationBar = ({ handleLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className="navigation-bar">
            <nav className="group-fitness">GroupFitness</nav>

            <div className="menu-items">
                <Link to="/groups" className="menu-item">
                    Groups
                </Link>

                <Link to="/" className="menu-item">
                    Home
                </Link>

                <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <FontAwesomeIcon icon={faCircleUser} className="faCircleUserDropDown" />
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/signout">Sign Out</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
