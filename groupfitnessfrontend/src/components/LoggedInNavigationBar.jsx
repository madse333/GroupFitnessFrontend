import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import "../css/LoggedInNavigationBar.css"

const NavigationBar = () => {
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

            <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FontAwesomeIcon icon={faCircleUser} className='faCircleUserDropDown' />
                {showDropdown && (<div className="dropdown-content"> <Link to="/signout">Sign Out</Link> </div>)}
            </div>
        </div>
    );
};

export default NavigationBar;