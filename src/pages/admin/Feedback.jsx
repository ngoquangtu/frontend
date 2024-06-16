import React, { useState, useEffect } from 'react';
 
const Feedback = () => {
  const data = [
    { username: 'user1', content: 'This is content from user1' },
    { username: 'user2', content: 'This is content from user2' },
    { username: 'user3', content: 'This is content from user3' },
  ];
 
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/admin/allusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

 
        console.log(response.status);
        if (response.status === 200) {
          console.log( "xin chao " ,await response.json());
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('There was an error sending the message!', error);
       
      }
      setLoading(false);
    };
    console.log(feedbackList);
 
    fetchData();
  }, []);
 
  if (loading) {
    return <p>Loading...</p>;
  }
 
  if (error) {
    return <p>{error}</p>;
  }
 
  return (
    <div className="App">
      <h1>User Content Table</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Avatar</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td><img src={item.avatar}></img></td>
              <td>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default Feedback