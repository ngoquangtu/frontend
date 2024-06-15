import React, { useState, useEffect } from 'react';
import axios from './axios'; // Import instance axios đã cấu hình

function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', thumbnail: '' });
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchCourses();
    fetchComments();
    fetchUsers();
    fetchFeedback();
    fetchStats();
  }, []);

  const fetchCourses = () => {
    axios.get('/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error("Error fetching courses:", error));
  };

  const fetchComments = () => {
    axios.get('/admin/comments')
      .then(response => setComments(response.data))
      .catch(error => console.error("Error fetching comments:", error));
  };

  const fetchUsers = () => {
    axios.get('/admin/allusers')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  const fetchFeedback = () => {
    axios.get('/admin/feedback')
      .then(response => setFeedback(response.data))
      .catch(error => console.error("Error fetching feedback:", error));
  };

  const fetchStats = () => {
    axios.get('/admin/stats')
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching stats:", error));
  };

  const handleDeleteComment = (commentId) => {
    axios.delete('/admin/delete-comment', { data: { commentId } })
      .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
      .catch(error => console.error("Error deleting comment:", error));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    axios.post('/admin/create-course', newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setNewCourse({ title: '', description: '', thumbnail: '' });
      })
      .catch(error => console.error("Error adding course:", error));
  };

  const handleDeleteCourse = (courseId) => {
    axios.delete('/admin/delete-course', { data: { courseId } })
      .then(() => setCourses(courses.filter(course => course.id !== courseId)))
      .catch(error => console.error("Error deleting course:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={newCourse.thumbnail}
              onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Add Course</button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Courses</h2>
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete Course
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <ul className="space-y-4">
          {comments.map(comment => (
            <li key={comment.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <span><strong>{comment.user}</strong>: {comment.comment}</span>
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              <span>{user.username} - {user.email}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <ul className="space-y-4">
          {feedback.map(fb => (
            <li key={fb.id} className="bg-white p-4 rounded-lg shadow-md">
              <span>{fb.message}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p><strong>Total Courses:</strong> {stats.totalCourses}</p>
          <p><strong>Total Users:</strong> {stats.totalUsers}</p>
          <p><strong>Total Comments:</strong> {stats.totalComments}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
