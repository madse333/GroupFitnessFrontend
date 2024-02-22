import { useEffect, useState } from 'react';
import Navbar from '../components/NavigationBar';
import LoggedInNavBar from '../components/LoggedInNavigationBar';
import '../css/Home.css'

const Home = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userImages, setUserImages] = useState([]);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await fetch('https://groupfitnessprod.azurewebsites.net/user/getuser/getuser', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await response.json();
                setUser(userData);

                const imagesResponse = await fetch('https://groupfitnessprod.azurewebsites.net/user/getuserimages/getuserimages', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!imagesResponse.ok) {
                    throw new Error('Failed to fetch user images');
                }

                const userImageData = await imagesResponse.json();
                setUserImages(userImageData);

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        console.log(user); // Log the user state whenever it changes
    }, [user]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="Home-container">
                    <h1>Home Page</h1>
                </div>
            </>
        )
    }

    return (
        <>
            <LoggedInNavBar />
            <div className="Home-container">
                <h1>Welcome, {user?.name}</h1>
                <div className="image-container">
                    {userImages.map((image, index) => (
                        <img key={index} src={`data:image/jpeg;base64,${image}`} alt="User Image" />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;

