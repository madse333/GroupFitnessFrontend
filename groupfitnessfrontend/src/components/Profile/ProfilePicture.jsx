import { useEffect, useState } from 'react';
import "../../css/ProfilePicture.scss";

const ProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData && userData.profilePicture && userData.profilePicture.result) {
            const base64Image = userData.profilePicture.result.base64;
            setProfilePicture(base64Image);
        }
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file, 'profile_picture.png');

            try {
                const response = await fetch('https://groupfitnessprod.azurewebsites.net/user/uploadprofilepicture', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                setProfilePicture(data.ImageUrl); // Assuming the response contains the new image URL or base64 data
                alert('Image uploaded successfully!');
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="profile-picture-container">
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                profilePicture && <img src={`data:image/jpeg;base64,${profilePicture}`} alt="Profile" className="profile-picture" />
            )}
            <label htmlFor="file-input" className="upload-icon">
                <i className="fas fa-upload"></i>
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ProfilePicture;
