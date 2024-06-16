import React from 'react';
import NavBar from './NavBar';

function About() {
    return (
        <div className="relative mb-16">
            {/* NavBar Fixed at the Top */}
            <div className="fixed top-0 left-0 w-full bg-white z-50">
                <NavBar />
            </div>

            {/* Container for the About Section */}
            <div className="pt-16 relative"> {/* Padding to prevent content from being hidden under the fixed NavBar */}
                <div className="relative">
                    {/* Image Container */}
                    <div className="relative w-full">
                        <img src="assets/all1.jpg" alt="Pro-Skills" className="w-full h-64 object-cover" />
                        {/* Black overlay */}
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        {/* "About Us" Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-5xl font-bold">About Us</h2>
                        </div>
                    </div>

                    {/* Description and Support Sections in a Flex Container */}
                    <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-4 py-8 items-center mt-4">
                        {/* Logo Image */}
                        <div className="flex items-center mr-16">
                            <img src="assets/icon.png" alt="Pro-Skills Logo" className="w-64 h-64" />
                        </div>
                        {/* Description Section */}
                        <div className="flex-1 bg-white bg-opacity-70 px-4 py-8 rounded-lg shadow-lg mt-8">
                            <p className="text-gray-700 mb-4">
                                "With a vast library of courses and tutorials across a wide range of subjects, Pro-Skills ensures that learners of all levels can find the resources they need to grow and succeed.
                                Whether you’re looking to advance your career, pick up a new hobby, or simply expand your horizons, Pro-Skills offers high-quality content created by experts in their fields. The platform is designed to be user-friendly, allowing for easy navigation and a personalized learning experience."
                            </p>
                            <p className="text-[#12B7BD] font-semibold">
                                Join the Pro-Skills community today and unlock your full potential without spending a dime!
                            </p>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="max-w-6xl mx-auto px-4 py-8 mt-8">
                        <h3 className="text-[#12B7BD] text-2xl font-extrabold">Help and Support</h3>
                        <p className="text-zinc-500 text-m font-medium">
                            Welcome to Pro-Skills Help and Support! We’re here to ensure you have a seamless learning experience. If you have any questions or encounter any issues, our support team is ready to assist you. Below are some common topics and resources to help you get started:
                        </p>
                        {/* Support Topics */}
                        <div className="space-y-4 mt-4">
                            {/* Getting Started */}
                            <div>
                                <h4 className="text-[#6B50C3] text-sm font-extrabold">Getting Started</h4>
                                <ul className="text-zinc-500 text-[14px] font-medium">
                                    <li>Creating an Account: Learn how to sign up and create your Pro-Skills account.</li>
                                    <li>Navigating the Platform: A guide to help you find and enroll in courses.</li>
                                    <li>Personalizing Your Learning Path: Tips on customizing your learning journey based on your interests and goals.</li>
                                </ul>
                            </div>
                            {/* Account and Profile */}
                            <div>
                                <h4 className="text-[#6B50C3] text-sm font-extrabold">Account and Profile</h4>
                                <ul className="text-zinc-500 text-[14px] font-medium">
                                    <li>Managing Your Profile: How to update your profile information and preferences.</li>
                                    <li>Password and Security: Steps to reset your password and keep your account secure.</li>
                                    <li>Notifications: How to manage email and in-app notifications.</li>
                                </ul>
                            </div>
                            {/* Courses and Learning */}
                            <div>
                                <h4 className="text-[#6B50C3] text-sm font-extrabold">Courses and Learning</h4>
                                <ul className="text-zinc-500 text-[14px] font-medium">
                                    <li>Finding Courses: Tips on searching for and selecting the best courses for your needs.</li>
                                    <li>Course Enrollment: How to enroll in courses and track your progress.</li>
                                    <li>Accessing Course Materials: Information on how to access and download course resources.</li>
                                </ul>
                            </div>
                            {/* Technical Support */}
                            <div>
                                <h4 className="text-[#6B50C3] text-sm font-extrabold">Technical Support</h4>
                                <ul className="text-zinc-500 text-[14px] font-medium">
                                    <li>Troubleshooting: Solutions to common technical issues.</li>
                                    <li>System Requirements: Ensure your device meets the necessary requirements for optimal performance.</li>
                                    <li>Contact Support: How to reach our support team for assistance.</li>
                                    <li>Providing Feedback: How to submit feedback and suggestions to improve Pro-Skills.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
