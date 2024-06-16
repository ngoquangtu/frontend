import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { renderReviewRateIcon } from './ratingIcon';
import { Rating } from '@material-ui/lab';
import { Button } from 'react-bootstrap';

const CourseDetails = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    course: null,
    numberofRating: 0,
    numberofVideo: 0,
  });
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ratingMode, setRatingMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(userLoggedIn);
    };

    const fetchUserRating = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch(`http://localhost:8000/api/courses/rating/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          });
          if (!response.ok) throw new Error('Failed to fetch user rating');
          const data = await response.json();
          if (data.rating) {
            setRating(data.rating);
            setIsRated(true);
          }
        } catch (error) {
          console.error('Error fetching user rating:', error);
        }
      }
    };

    checkLoginStatus();
    fetchUserRating();
  }, [id, isLoggedIn]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch course details');
      const data = await response.json();
      setCourseDetails(data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setError('Error fetching course details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/courses/comment/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setCommentList(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
    fetchComments();
  }, [id]);

  const addRating = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/courses/rating/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ rating: rating }),
      });
      if (response.status === 200) {
        setIsRated(true);
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    } finally {
      setRatingMode(false);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/comments/courses/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ content: userComment }),
      });
      if (response.status === 200) {
        setUserComment("");
        setCommentMode(false);
        fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-4xl text-[#12B7BD] text-center">LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-4xl text-red-500 text-center">{error}</p>
      </div>
    );
  }

  const { course, numberofRating, numberofVideo } = courseDetails;

  return (
    <div className="relative mb-16">
      <div className="fixed top-0 left-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <div className="pt-16 relative">
        <div className="relative w-full">
          <img src="/assets/all1.jpg" alt="Pro-Skills" className="w-full h-36 object-cover" />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">"It's a great day to start something new!"</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Thumbnail */}
            <div className="flex-1">
              <img src={course.thumbnail} alt="Course Thumbnail" className="w-full h-auto object-cover rounded-lg shadow-md" />
            </div>

            {/* Course Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
              <div className="mb-6">
                <p className="text-lg text-gray-700">{course.description}</p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <p className="text-yellow-500 font-bold text-l">Rating: {course.rating}</p>
                  <div className="flex items-center ml-2">
                    {renderReviewRateIcon(course.rating)}
                  </div>
                </div>
                <span className="text-gray-600">({numberofRating} reviews)</span>
              </div>
              <h2 className="text-l mb-2">Publisher: <span className="font-bold">{course.publisher}</span></h2>
              <h2 className="text-l">Number of Lessons: <span className="font-bold">{numberofVideo}</span></h2>
              {!isLoggedIn ? (
                <div className="flex justify-center w-full mt-8">
                  <Link to="/login">
                    <Button className="bg-[#12B7BD] hover:bg-[#6B50C3] text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                      Login Now to Start Learning
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center w-full mt-8">
                  <Link to={`/courses/video/${course.id}`}>
                    <Button className="bg-[#12B7BD] hover:bg-[#6B50C3] text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                      Start Learning Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Student Feedback</h2>
          </div>

          {/* Rating Input */}
          <div className="flex items-center mb-4 justify-between">
            {isLoggedIn && (
              <>
                {!isRated ? (
                  <Button
                    variant="outlined"
                    onClick={() => setRatingMode(!ratingMode)}
                    className="mr-2"
                  >
                    Rate This Course
                  </Button>
                ) : (
                  <div className="flex items-center">
                    <Rating
                      value={rating}
                      readOnly
                      className="mr-2"
                    />
                    <span className="text-gray-600">Your rating</span>
                  </div>
                )}
                {ratingMode && (
                  <div className="flex items-center">
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                      className="mr-2"
                    />
                    <Button
                      onClick={addRating}
                      variant="contained"
                      className="text-[#6B50C3] font-bold"
                    >
                      Rating
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            {isLoggedIn && (
              <div>
                <Button variant="outlined" onClick={() => setCommentMode(!commentMode)}>
                  Leave a Comment
                </Button>
                {commentMode && (
                  <div className="mt-4">
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows="4"
                      className="w-full p-2 border rounded"
                      placeholder="Write your comment here..."
                    />
                    <Button onClick={addComment} className="bg-[#12B7BD] hover:bg-[#6B50C3] text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Display Comments */}
          <div className="space-y-4 mt-8">
            {commentList.length > 0 ? (
              commentList.map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={comment.useravatar} alt={comment.username} className="w-16 h-16 rounded-full" />
                    <div className="text-black">
                      <p className="font-bold">{comment.username}</p>
                      <p>{comment.comment_text}</p>
                    </div>
                  </div>
                  {index < commentList.length - 1 && <hr className="border-gray-300" />}
                </div>
              ))
            ) : (
              <p className="text-[#6B50C3] text-xl">No comments yet! Become the first comment!!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

