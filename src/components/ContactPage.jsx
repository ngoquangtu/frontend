import React, { useState } from 'react';

function ContactPage() {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setResponseMessage('Please enter a message before submitting.');
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:8000/api/users/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        
    
        body: JSON.stringify({ feedback: message }),
      });
      
  


      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }
      setResponseMessage('Thank you for your message! We will get back to you soon.');
      setMessage('');
    } catch (error) {
      console.error(error);
      setResponseMessage(error.message || 'There was an error sending your message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Send
          </button>
          <a href="/" className="text-blue-600 hover:underline">
            Back to Home
          </a>
        </div>
      </form>
      {isLoading && <p>Sending message...</p>}
      {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
    </div>
  );
}

export default ContactPage;
