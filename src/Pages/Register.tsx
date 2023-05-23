import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router';
import Background from '../Images/RegisterBg.jpg';
import { CiGlobe } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';


interface Props {
    register: {username: string, password: string, confirmPassword: string},
    setRegister: (register: any) => void
}

function Register({register, setRegister}: Props) {

    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState({
        usernameError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const randomHex = () => {
        let color = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + color.slice(0, 6);
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [e.target.name]: e.target.value});
    };

    const registerValidate = () => {
        let usernameError;
        let passwordError;
        let confirmPasswordError;
      
        if (!register.username || parseInt(register.username) < 6) {
          usernameError = 'Username cannot be empty or shorter than 6 letters';
        }
      
        if (!register.password || !register.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
          passwordError = 'Password cannot be empty. Password must contain 8 letters and a number';
        }
      
        if (register.password !== register.confirmPassword) {
          confirmPasswordError = 'Passwords must match';
        }
      
        setRegisterError({
          usernameError: usernameError || '',
          passwordError: passwordError || '',
          confirmPasswordError: confirmPasswordError || ''
        });
      
        return !usernameError && !passwordError && !confirmPasswordError;
      };

    const handleSubmitRegister = () => {
        let isValid = registerValidate();

        if(isValid) {
            axios.post('http://localhost:3002/register', {
                username: register.username,
                password: register.password,
                hex: randomHex()
            }).then(() => {
                navigate('/login');
                setRegisterError({...registerError, usernameError: '', passwordError: '', confirmPasswordError: ''});
            }).catch(error => {
                console.log(error);
                  if (error.response.data.error === 'Username cannot be empty or shorter than 6 letters') {
                    setRegisterError({...registerError, usernameError: 'Username cannot be empty or shorter than 6 letters', 
                    passwordError: '', 
                    confirmPasswordError: ''
                });
                  }
                  if (error.response.data.error === 'Username already registered') {
                    setRegisterError({...registerError, usernameError: 'Username already registered',
                    passwordError: '',
                    confirmPasswordError: ''
                });
                  } else {
                    setRegisterError({...registerError, usernameError: '', passwordError: '', confirmPasswordError: ''});
                  }
            });
        }
    };

    const handleNavigate = () => {
        navigate('/login');
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
        <div className='main-register-container'>
            <div className='icons-container'>
                <CiGlobe id='register-icon' />
            </div>
            <div className="register-error-container">
                {registerError.usernameError ? 
                    <p id="password-error">{registerError.usernameError}</p> 
                    : null
                }
                {registerError.passwordError ? 
                    <p id="password-error">{registerError.passwordError}</p>
                    : null
                }
                {registerError.confirmPasswordError ? 
                    <p id="password-error">{registerError.confirmPasswordError}</p> 
                    : null
                }
            </div>
            <div className="register-input-container">
                <input name="username" type="text" placeholder="Username" onChange={handleRegisterChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleRegisterChange} />
                <input name="confirmPassword" type="password" placeholder="confirm password" onChange={handleRegisterChange} />
                <button onClick={handleSubmitRegister}>Create Account</button>
            </div>
            <div className='footer-container'>
                <div className='footer-left'>
                    <a href='https://github.com/deimar10' id='footer-icons'><FaGithub />Github</a>        
                </div>
                <div className='footer-right'>
                    <span>Already have an account,<h3 onClick={handleNavigate}>Login</h3>here</span>
                </div>
            </div>
        </div> 
        </>
    )
}
export default Register;