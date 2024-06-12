import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import ProtectedPage from './pages/ProtectedPage';
import Home from './pages/Home';
import Signout from './pages/Signout';
import Groups from './pages/Groups';
import Profile from './pages/Profile';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!sessionStorage.getItem('token'));

    const handleLogin = (token) => {
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setIsLoggedIn(false);
    };

    const handleRegister = (token) => {
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/register">
                    {<RegisterForm onRegister={handleRegister} />}
                </Route>
                <Route exact path="/login">
                    {<LoginForm onLogin={handleLogin} />}
                </Route>
                <Route exact path="/protected">
                    {isLoggedIn ? <ProtectedPage /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/signout">
                    <Signout handleLogout={handleLogout} />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/groups">
                    {isLoggedIn ? <Groups /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/profile">
                    {isLoggedIn ? <Profile /> : <Redirect to="/login"/>}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
