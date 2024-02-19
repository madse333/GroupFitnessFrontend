import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ProtectedPage from './pages/ProtectedPage';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn);

    const handleLogin = (token) => {
        // Save token in local storage
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleRegister = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    return (
        <Router>
            <Switch>
                <Route path="/register">
                    {isLoggedIn ? <Home /> : <RegisterForm onRegister={handleRegister} /> }
                </Route>
                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <LoginForm onLogin={handleLogin} />}
                </Route>
                <Route exact path="/protected">
                    {isLoggedIn ? <ProtectedPage onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;