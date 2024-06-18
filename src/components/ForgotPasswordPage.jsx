import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://${process.env.REACT_APP_WEBSITE}/api/auth/resetpassword`, { email });
      setResponseMessage('If an account with that email exists, a password reset link has been sent.');
      setEmail('');
    } catch (error) {
      console.error('There was an error sending the password reset email!', error);
      setResponseMessage('There was an error sending the password reset email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-full flex-wrap">
        <div className="flex-1 hidden md:flex items-center justify-center bg-white">
          <img
            src="/assets/img-authpage.png" // Ensure the path is correct based on your project structure
            alt="Authentication Illustration"
            className="mx-auto mb-6"
            style={{ width: '1200px', transform: 'scale(1.2)' }}
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center px-4 w-full max-w-md">
            <Link to="/" className="mb-16">
              <img src="/assets/logo.svg" alt="Logo" className="mx-auto" style={{ width: '180px' }} />
            </Link>
            <div className="bg-white shadow-lg rounded px-8 mb-4 w-full max-w-md">
              <h2 className="text-2xl text-center font-bold mt-8 mb-2">Reset Password</h2>
              <p className="text-lg text-gray-600 text-center mb-8">Enter the email associated with your account</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit"
                        className="bg-[#12B7BD] hover:bg-[#0d9ea6] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                  Send Reset Link
                </button>
              </form>
              {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
              <div className="mt-8">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
