// CourseComments.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const CourseComments = () => {
  const { courseId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://${process.env.REACT_APP_WEBSITE}/api/admin/comments/${courseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Error fetching comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [courseId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Comments for Course ID: {courseId}</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.comment_id}>
            <div>
              <strong>User: {comment.username}</strong>
              <p>{comment.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseComments;
