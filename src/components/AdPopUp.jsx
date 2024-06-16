import React, { useState, useEffect } from 'react';

const AdPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('adDisplayed')) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem('adDisplayed', 'true');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        isVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 relative max-w-3xl w-full shadow-lg flex">
                    <button
                        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-6xl"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                    <div className="w-1/2 p-4">
                        <h2 className="text-3xl font-bold mb-4 text-center">Why Learn on ProSkills?</h2>
                        <p className="text-lg mb-4">
                            ProSkills offers a range of expertly designed courses tailored to enhance your professional skills. Whether you're looking to start a new career, advance in your current job, or simply explore new areas of interest, our courses provide you with the knowledge and tools to succeed.
                        </p>
                        <ul className="list-disc ml-5 mb-4">
                            <li>Comprehensive Learning Paths</li>
                            <li>Flexible Scheduling</li>
                            <li>Expert Instructors</li>
                            <li>Supportive Community</li>
                        </ul>
                        <p className="text-sm text-gray-600">Join ProSkills today and unlock your potential!</p>
                    </div>
                    <div className="w-1/2 p-4 flex items-center justify-center">
                        <img src="/assets/popup.png" alt="ProSkills Ad" className="rounded-lg w-full h-auto"/>
                    </div>
                </div>
            </div>
        )
    );
};

export default AdPopup;
