import React, { useState } from 'react';
import NavBar from './NavBar';

function  ContactPage() {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (message === "") {
        return;
      }
      const token=localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/users/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedback: message, })
      });

      if (response.status === 200) {
        setResponseMessage('Thank you for your message! We will get back to you soon.');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('There was an error sending the message!', error);
      setResponseMessage('There was an error sending your message. Please try again later.');
    }
  };


    return (
      <div className="relative mb-16">
        {/* NavBar Fixed at the Top */}
        <div className="fixed top-0 left-0 w-full bg-white z-50">
          <NavBar />
        </div>
  
        {/* Container for the About Section */}
        <div className="pt-16 relative">
          {/* Image Container */}
          <div className="relative w-full">
            <img src="assets/all1.jpg" alt="Pro-Skills" className="w-full h-64 object-cover" />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
            {/* "Contact Us" Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-5xl font-bold">Contact Us</h2>
            </div>
          </div>
  
          {/* Form Container */}
          <div className="max-w-5xl mx-auto mt-6 p-6 bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-2xl font-medium text-gray-700" htmlFor="message">
                  Write us a <span className='text-[#12B7BD]'>Message</span>
                </label>
                <p className="text-gray-500 text-l mb-2">If you'd like to talk directly to our team, please drop us an e-mail using the form below. We aim to get back to all messages within 24 hours but we're usually much faster.</p>
                <textarea
                  id="message"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#12B7BD] text-white rounded-md hover:bg-[#0F8C97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send
                </button>
                <a href="/" className="text-[#6B50C3] hover:underline">
                  Back to Home
                </a>
              </div>
            </form>
            {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
          </div>
        </div>
      </div>
    );
  }
  

export default ContactPage;
