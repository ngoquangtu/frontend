import React, { useState, useEffect } from 'react';

const ViewCounter = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/api/admin/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.pageviews);
        } else {
          throw new Error('Failed to fetch views');
        }
      } catch (error) {
        console.error('Error fetching views:', error);
      }
    };

    fetchViews();
  }, []);

  return (
    <div className="fixed top-0 right-0 bg-gray-800 text-white py-2 px-4 rounded-bl-lg">
      <p>Views: {views}</p>
    </div>
  );
}

export default ViewCounter;
