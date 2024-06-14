import LoggedInNavBar from '../components/LoggedInNavigationBar';
import ProfilePicture from '../components/Profile/ProfilePicture';
import ProfileInfo from '../components/Profile/ProfileInfo';
import "../css/ProfilePicture.scss";
import "../css/ProfileInfo.scss";
import "../css/Profile.scss";


const Profile = () => {

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <ProfilePicture />
                <ProfileInfo />
            </div>
        </>
    )
};

export default Profile;