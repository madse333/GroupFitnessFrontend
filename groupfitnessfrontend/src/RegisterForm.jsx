//RegisterForm.jsx
import { useState } from 'react';
import { register } from './AuthService';

// eslint-disable-next-line react/prop-types
const RegisterForm = ({ onRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const token = await register(firstName, lastName, username, email, password)
            onRegister(token);
        } catch (error) {
            // Handle login error
        }
    };

    return (
        <div>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterForm;