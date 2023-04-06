import React, { useState } from 'react';
import './Login.scss';
import Background from '../Images/LoginBg.jpg';
import { AiFillWechat } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import axios from 'axios';

interface Props {
    setAuth: (auth: any) => void,
    auth: object
}

function Login({setAuth, auth}: Props) {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState({
        usernameError: '',
        passwordError: ''
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({...login, [e.target.name] : e.target.value})
    };

    const loginValidate = () => {
        let usernameError;
        let passwordError;

        if(!login.username) {
            usernameError = "Username cant be empty";
        } 

        if(!login.password || !login.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            passwordError = "Password cant be empty. Password must contain 8 letter and a number";
        }

        if(usernameError) {
            setLoginError({...loginError, usernameError: usernameError});
            return false;
        } 

        if(passwordError) {
            setLoginError({...loginError, passwordError: passwordError});
            return false;
        } 
        return true;
    };

    const handleSubmitLogin = (e: any) => {
        e.preventDefault();

        let isValid = loginValidate();

        if(isValid) {
            axios.post('http://localhost:3002/login', {
                username: login.username,
                password: login.password
            }).then(response => {
                if (response.data.auth) {
                    setAuth({...auth, login: response.data.auth});
                    navigate(`/home/${login.username}`);
                    localStorage.setItem('username', login.username);
                } else {
                    setAuth({...auth, login: response.data.auth});
                }
            }).catch(error => {
                console.log(error);
                setLoginError({...loginError, passwordError: 'Passwords dont match. Access denied.'});
            }) ;
        }
    };

    const handleNavigate = () => {
        navigate('/register');
    };

    return (
        <>
        <div className='background-image' style={
            {backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
            }}>
        </div>

        <div className='main-login-continer'>
            <div className='icons-container'>
                <AiFillWechat id='welcome-icon' />
            </div>
            <div className="login-error-container">
                {loginError.usernameError ? 
                    <p id="password-error">{loginError.usernameError}</p> 
                    : null
                }
                {loginError.passwordError ? 
                    <p id="password-error">{loginError.passwordError}</p> 
                    : null
                }
            </div>
            <div className="login-input-container">
                <input name="username" type="text" placeholder="Username" onChange={handleLoginChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleLoginChange} />
                <button onClick={handleSubmitLogin}>Login</button>
            </div>
            <div className='footer-container'>
                <div className='footer-left'>
                    <a href='https://github.com/deimar10' id='footer-icons'><FaGithub />Github</a>        
                </div>
                <div className='footer-right'>
                    <span>Dont have an account yet?<h3 onClick={handleNavigate}>Signup</h3>here</span>
                </div>
            </div>
        </div> 
        </>
    )
}
export default Login;