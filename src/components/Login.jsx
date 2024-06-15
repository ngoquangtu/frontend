import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
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
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <div className="bg-white dark:bg-zinc-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-2xl text-center font-bold mb-8">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className={labelClasses} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={inputClasses}
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className={labelClasses} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={inputClasses}
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
                        type="button"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    <div className="flex justify-between mt-4">
                        <a href="/register" className="text-blue-500 hover:text-blue-700 text-sm">Register</a>
                        <a href="/resetpassword" className="text-zinc-700 dark:text-zinc-300 text-sm">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
