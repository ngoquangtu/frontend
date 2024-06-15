import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', thumbnail: '' });

  useEffect(() => {
    axios.get('localhost:8000/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDeleteComment = (courseId, commentId) => {
    axios.delete(`/api/courses/${courseId}/comments/${commentId}`)
      .then(() => {
        setCourses(courses.map(course => {
          if (course.id === courseId) {
            course.comments = course.comments.filter(comment => comment.id !== commentId);
          }
          return course;
        }));
      })
      .catch(error => {
        console.error("There was an error deleting the comment!", error);
      });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    axios.post('/api/courses', newCourse)
      .then(response => {
        setCourses([...courses, response.data]);
        setNewCourse({ title: '', description: '', thumbnail: '' });
      })
      .catch(error => {
        console.error("There was an error adding the course!", error);
      });
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <h2>Add New Course</h2>
      <form onSubmit={handleAddCourse}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            className="form-control"
            value={newCourse.thumbnail}
            onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <h4>Comments</h4>
            <ul>
              {course.comments && course.comments.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.user}</strong>: {comment.comment}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteComment(course.id, comment.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
