import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Signout = ({ handleLogout }) => {
    const history = useHistory();

    useEffect(() => {
        handleLogout();
        history.push('/login');
    }, [handleLogout, history]);

    return (
        <div>
            <p>Signing out...</p>
        </div>
    );
};

export default Signout;
