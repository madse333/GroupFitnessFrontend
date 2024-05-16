import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from '../AuthService';

const Signout = () => {
    const history = useHistory();

    useEffect(() => {
        signOut();

        history.push('/login');
    }, [history]);

    return (
        <div>
            <p>Signing out...</p>
        </div>
    );
};

export default Signout;