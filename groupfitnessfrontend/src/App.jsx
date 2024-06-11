import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import ProtectedPage from './pages/ProtectedPage';
import Home from './pages/Home';
import Signout from './pages/Signout';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import NavigationBar from './components/NavigationBar';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!localStorage.getItem('token'));

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeitem('userData');
        setIsLoggedIn(false);
    };

    const handleRegister = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    return (
        <Router>
            {isLoggedIn && <NavigationBar handleLogout={handleLogout} />}
            <Switch>
                <Route exact path="/register">
                    {isLoggedIn ? <Redirect to="/" /> : <RegisterForm onRegister={handleRegister} />}
                </Route>
                <Route exact path="/login">
                    {isLoggedIn ? <Redirect to="/" /> : <LoginForm onLogin={handleLogin} />}
                </Route>
                <Route exact path="/protected">
                    {isLoggedIn ? <ProtectedPage /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/signout">
                    <Signout handleLogout={handleLogout} />
                </Route>
                <Route exact path="/">
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
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
