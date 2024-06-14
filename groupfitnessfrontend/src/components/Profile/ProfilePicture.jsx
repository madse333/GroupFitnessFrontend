import { useEffect, useState } from 'react';


const ProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData && userData.profilePicture && userData.profilePicture.result) {
            const base64Image = userData.profilePicture.result.base64;
            setProfilePicture(base64Image);
        }
    }, []);

    return (
        <>
            <div className="picture-container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        {profilePicture != null ? (
                            <img src={`data:image/jpeg;base64,${profilePicture}`} className="profile_picture"></img>
                        ) : (<p>profilBillede</p>)}
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfilePicture;