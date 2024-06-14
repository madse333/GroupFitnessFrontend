import { useEffect, useState } from 'react';

const ProfileInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData) {
            setUser(userData);
            console.log(userData);
        }
    }, []);

    return (
        <>
            <div className="info-container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>{user?.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>{user?.email}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h1>{user?.username}</h1>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfileInfo;