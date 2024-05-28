import '../css/Login.scss'; // Import your CSS file for styling
import LoginForm from './LoginForm';

const Login = () => {

    return (
        <div className="login-container">
            <div className="login-form">
                <LoginForm  />
            </div>
        </div>
    );
};

export default Login;

