//RegisterForm.jsx
import { useState } from 'react';
import { register } from '../AuthService';
import "../css/RegisterForm.scss";
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
        <div className="register-page">
            <div className="bg-effects">
                <svg
                    className="corner-vector"
                    width="589"
                    height="570"
                    viewBox="0 0 589 570"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M405.688 70C509.188 19 458.5 45.5 588.188 0V569.5H0C0 530.833 4.8961 478.274 66.6878 442.5C104.688 420.5 276.167 422.167 319 394.5C388.833 372.333 309.188 149.5 405.688 70Z"
                        fill="#E0E5E9" />
                </svg>
                <div className="ellipse ellipse-topleft"></div>
                <div className="ellipse ellipse-bottomleft"></div>
            </div>
            <div className="container text-center">
                <div className="row">
                    <div className="col-12 col-sm-3 register-col">
                        <div className="register-title">Register</div>
                    </div>

                    <div className="col-12 col-sm-3 register-describtion-col">
                        <div className="please-enter-your-information">
                            Please enter your information
                        </div>
                    </div>

                    <div className="col-12 col-sm-3 firstname-col">
                        <div className="firstname">
                            <div className="rectangle-1"></div>
                            <input
                                type="text"
                                className="firstname-information"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Firstname"
                            />
                            <svg className="user" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.833 32.375v-3.083a6.167 6.167 0 0 0-6.166-6.167H12.333a6.166 6.166 0 0 0-6.166 6.167v3.083M18.5 16.958a6.167 6.167 0 1 0 0-12.333 6.167 6.167 0 0 0 0 12.333" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="col-12 col-sm-3 lastname-col">
                        <div className="lastname">
                            <div className="rectangle-1"></div>
                            <input
                                type="text"
                                className="lastname-information"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Lastname"
                            />
                            <svg className="user" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.833 32.375v-3.083a6.167 6.167 0 0 0-6.166-6.167H12.333a6.166 6.166 0 0 0-6.166 6.167v3.083M18.5 16.958a6.167 6.167 0 1 0 0-12.333 6.167 6.167 0 0 0 0 12.333" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="col-12 col-sm-3 username-col">
                        <div className="username">
                            <div className="rectangle-1"></div>
                            <input
                                type="text"
                                className="username-information"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <svg className="user" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.833 32.375v-3.083a6.167 6.167 0 0 0-6.166-6.167H12.333a6.166 6.166 0 0 0-6.166 6.167v3.083M18.5 16.958a6.167 6.167 0 1 0 0-12.333 6.167 6.167 0 0 0 0 12.333" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="col-12 col-sm-3 email-col">
                        <div className="email">
                            <div className="rectangle-1"></div>
                            <input
                                type="text"
                                className="email-information"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <svg className="user" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.833 32.375v-3.083a6.167 6.167 0 0 0-6.166-6.167H12.333a6.166 6.166 0 0 0-6.166 6.167v3.083M18.5 16.958a6.167 6.167 0 1 0 0-12.333 6.167 6.167 0 0 0 0 12.333" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="col-12 col-sm-3 password-col">
                        <div className="password">
                            <div className="rectangle-1"></div>
                            <input
                                type="password"
                                className="password-information"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <svg className="lock" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.292 16.958H7.708a3.083 3.083 0 0 0-3.083 3.084v10.791a3.083 3.083 0 0 0 3.083 3.084h21.584a3.083 3.083 0 0 0 3.083-3.084V20.042a3.083 3.083 0 0 0-3.083-3.084m-18.5 0v-6.166a7.708 7.708 0 1 1 15.416 0v6.166" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 register-button-col">
                        <button onClick={handleRegister} className="register-button">
                            <div className="register-rectangle">
                                <div className="rectangle-2"></div>
                                <div className="register">Register</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;