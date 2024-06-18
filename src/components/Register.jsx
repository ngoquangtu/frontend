import React, { useState } from 'react';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', color: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', color: '' });
    try {
      const response = await fetch(`https://${process.env.REACT_APP_WEBSITE}/api/auth/register`, {
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
              <h2 className="text-2xl text-center font-bold mt-8 mb-2">Welcome to new house!</h2>
              <h3 className="text-l text-gray text-center">By signing up you are agreed with</h3>
              <h3 className="text-l text-gray text-center mb-8"> our friendly terms and condition.</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="username" className={'block text-sm font-medium text-zinc-700 dark:text-zinc-300'}>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={"w-full px-3 py-2 rounded-md border dark:border-zinc-700"}
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className={'block text-sm font-medium text-zinc-700 dark:text-zinc-300'}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={"w-full px-3 py-2 rounded-md border dark:border-zinc-700"}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className={'block text-sm font-medium text-zinc-700 dark:text-zinc-300'}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={"w-full px-3 py-2 rounded-md border dark:border-zinc-700"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit"
                  className={"bg-[#12B7BD] hover:bg-[#0d9ea6] text-white font-bold mb-12 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"}>
                  Register
                </button>
                {message.text && (
                  <div className="text-center mt-4" style={{ color: message.color }}>
                    {message.text}
                  </div>
                )}
                <div className="flex justify-center pb-8">
                  <span>Already have an account?</span>
                  <a href="/login" className="text-[#12B7BD] hover:bg-[#0d9ea6] font-bold ml-2">Log in</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
