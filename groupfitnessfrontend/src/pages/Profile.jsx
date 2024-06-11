import { useEffect, useState } from 'react';
import Navbar from '../components/NavigationBar';
import LoggedInNavBar from '../components/LoggedInNavigationBar';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.profilePicture && userData.profilePicture.result) {
            const base64Image = userData.profilePicture.result.base64;
            setProfilePicture(base64Image);
            setUser(userData);
        }
    }, []);

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        {profilePicture != null ? (
                            <img src={`data:image/jpeg;base64,${profilePicture}`} className="profile_picture"></img>
                        ) : (<p>profilBillede</p>)};
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>{user?.name}</h1>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;