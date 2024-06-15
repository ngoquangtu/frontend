import React, { useState } from 'react';

const inputClasses = 'w-full px-3 py-2 rounded-md border dark:border-zinc-700';
const labelClasses = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300';
const buttonClasses = 'w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 cursor-pointer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', color: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', color: '' }); 
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
    if (data.type === 1) {
        setMessage({ text: data.message, color: 'red' });
      } else if (data.type === 0) {
        setMessage({ text: data.message, color: 'green' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while registering', color: 'red' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className={labelClasses}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={inputClasses}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputClasses}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={inputClasses}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={buttonClasses}>
            Register
          </button>
          {message.text && (
            <div className="text-center mt-4" style={{ color: message.color }}>
              {message.text}
            </div>
          )}
          <a href="/" className="block text-center text-sm text-blue-500 dark:text-blue-300 mt-4">
            Back to Home
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
