

import React, { useState,useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            console.log(process.env.REACT_APP_LOCALHOST);
            const response = await fetch(`https://${process.env.REACT_APP_WEBSITE}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.type === 1) {
                setMessage({ text: 'Email does not exist', color: 'red' });
            } else if (data.type === 0) {
                setMessage({ text: 'Login successful', color: 'green' });
                localStorage.setItem('token', data.token);
                if (data.userInfo && data.userInfo.avatar_url) {
                    localStorage.setItem('userAvatar', data.userInfo.avatar_url);
                }
                if (data.userInfo && data.userInfo.username) {
                    localStorage.setItem('userName', data.userInfo.username);
                }

                login();
                if (data.userInfo.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/courses');
                }
            } else if (data.type === 2) {
                setMessage({ text: 'Password is wrong. Please try again!', color: 'red' });
            }
        } catch (error) {
            setMessage({ text: 'An error occurred while logging in, please try again', color: 'red' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex w-full h-full flex-wrap">
                <div className="flex-1 hidden md:flex items-center justify-center bg-white">
                    <img
                        src={"../assets/img-authpage.png"}
                        alt="AuthImg"
                        className="mx-auto mb-6"
                        style={{ width: '1200px', scale: '1.2' }}
                    />
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center px-4 w-full max-w-md">
                        <a href="/" className="mb-16">
                            <img src={"../assets/logo.svg"} alt="Logo" className="mx-auto" style={{ width: '180px' }} />
                        </a>
                        <div className="bg-white shadow-lg rounded px-4 mb-4 w-full max-w-md">
                            <h2 className="text-2xl text-center font-bold mt-8 mb-2">Welcome back!</h2>
                            <h3 className="text-l text-gray text-center mb-8">Please enter your information to login</h3>
                            <form>
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {message && <div className="text-center text-sm mb-4" style={{ color: message.color }}>{message.text}</div>}
                                <button
                                    className="bg-[#12B7BD] hover:bg-[#0d9ea6] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
                                    type="button"
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </button>
                                <div className="flex justify-end mt-3 mb-12">
                                    <a href="/resetpassword" className="text-[#6B50C3] hover:text-purple-700 text-sm font-bold">Forgot Password?</a>
                                </div>
                                <div className="flex justify-center pb-8">
                                    <span>New here?</span>
                                    <a href="/register" className="text-[#12B7BD] hover:bg-[#0d9ea6] font-bold ml-2">Register now</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
