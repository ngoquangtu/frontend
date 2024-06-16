import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/admin/feedback', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbackList(data);
        } else {
          throw new Error('Failed to fetch feedback');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Error fetching feedback. Please try again later.');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Content Table</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100 border border-gray-300">Username</th>
            <th className="px-4 py-2 bg-gray-100 border border-gray-300">Avatar</th>
            <th className="px-4 py-2 bg-gray-100 border border-gray-300">Content</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border border-gray-300">{item.username}</td>
              <td className="px-4 py-2 border border-gray-300">
                <img src={item.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2 border border-gray-300">{item.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feedback;
