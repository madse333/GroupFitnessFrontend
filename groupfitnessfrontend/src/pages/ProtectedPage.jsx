/* eslint-disable react/prop-types */

const ProtectedPage = ({ onLogout }) => {
    const handleLogout = () => {
        // Call the onLogout function passed from the parent component
        onLogout();
    };

    return (
        <div>
            <h1>Protected Page</h1>
            <p>This is a protected page. You can only access it if you are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProtectedPage;
