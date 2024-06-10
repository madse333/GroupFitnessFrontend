import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import "../css/LoggedInNavigationBar.css";
// eslint-disable-next-line react/prop-types
const NavigationBar = ({ handleLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleMouseEnter = () => {
        setShowDropdown(true);
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);

        // Check if userData and profilePicture exist
        if (userData && userData.profilePicture && userData.profilePicture.result) {
            const base64Image = userData.profilePicture.result.base64;
            // Use base64Image as needed, for example:
            setProfilePicture(base64Image);
        }
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
                <Link to="/profile" className="menu-item">
                    My Profile
                </Link>

                <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <FontAwesomeIcon icon={faCircleUser} className="faCircleUserDropDown" />
                    {showDropdown && (
                        <div className="dropdown-content">
                            <Link to="/signout">Sign Out</Link>
                            {profilePicture != null ? (
                                <img src={`data:image/jpeg;base64,${profilePicture}`} className="profile_picture"></img>
                                ) : (<p>profilBillede</p>)};
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
