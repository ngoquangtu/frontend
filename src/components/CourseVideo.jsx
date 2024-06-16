import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import YouTube from 'react-youtube';

const CourseVideo = () => {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [mainVideo, setMainVideo] = useState(null);
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/courses/video/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data);
                setMainVideo(data[0]);
                setSelectedVideoId(data[0]?.id);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Error fetching videos. Please try again later.');
                setLoading(false);
            }
        };

        fetchVideos();
    }, [id]);

    const handleVideoSelect = (video) => {
        setMainVideo(video);
        setSelectedVideoId(video.id);
    };

    const videoOpts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
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
            </div>

            <div className="pt-16 flex flex-col md:flex-row">
                <div className="w-full md:w-3/5 p-4 h-full">
                    {mainVideo && (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                            <div className="video-responsive">
                                <YouTube
                                    videoId={mainVideo.youtube_url}
                                    opts={videoOpts}
                                    title={mainVideo.title}
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-bold mb-2">Lesson {mainVideo.id}: {mainVideo.title}</h2>
                                <p className="text-gray-700 text-l">{mainVideo.description}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full md:w-2/5 p-4">
                    <h1 className="text-3xl font-bold justify-center flex text-[#12B7BD] mb-6">My Lectures</h1>
                    <div className="flex flex-col space-y-4">
                        {videos.map((video) => (
                            <button
                                key={video.id}
                                onClick={() => handleVideoSelect(video)}
                                className={`bg-gray-50 p-2 rounded-lg shadow-md w-full text-left ${selectedVideoId === video.id ? 'bg-[#12B7BD] text-black opacity-20' : ''}`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-circle ml-4 mr-2" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-l font-bold">{`Lesson ${video.id}: ${video.title}`}</h2>
                                        <p className="text-gray-700">{video.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseVideo;
