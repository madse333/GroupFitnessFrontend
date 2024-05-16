import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ProtectedPage from './pages/ProtectedPage';
import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Signout from './pages/Signout';
import Groups from './pages/Groups';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleRegister = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    return (
        <>
        <Router>
            <Switch>
                <Route exact path="/register">
                    {isLoggedIn ? <Home /> : <RegisterForm onRegister={handleRegister} /> }
                </Route>
                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <LoginForm onLogin={handleLogin} />}
                </Route>
                <Route exact path="/protected">
                    {isLoggedIn ? <ProtectedPage onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/SignOut">
                    {isLoggedIn ? <Signout onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/">
                    {isLoggedIn ? <Home onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/groups">
                    {isLoggedIn ? <Groups /> : <Redirect to="/login" />}
                </Route>
            </Switch>
            </Router>
        </>
    );
};

export default App;