import { useEffect, useState } from 'react';

const Home = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page. You are currently logged in.</p>
            <p>Account details:</p>
            {user && (
                <ul>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                    <li>Name: {user.name}</li>
                </ul>
            )}
        </div>
    );
};

export default Home;