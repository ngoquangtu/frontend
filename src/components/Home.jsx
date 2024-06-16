import React from 'react';
import NavBar from './NavBar';

const Home = () => {
    return (
        <div>
            <div className="relative">
                <div className="fixed top-0 left-0 w-full bg-white z-50">
                    <NavBar />
                </div>
                <div className="pt-16 relative">
                    <div className="relative w-full h-96">
                        <img src="assets/all1.jpg" alt="Pro-Skills" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <h2 className="text-white text-2xl md:text-4xl font-bold">Welcome to</h2>
                            <h1 className="text-white text-5xl md:text-7xl font-extrabold">Pro-Skills</h1>
                        </div>
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                            <p className="text-white text-lg md:text-l text-center">Unlock your potential with our expertly designed courses.</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-gray-100 py-12 mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                            <img src="assets/home1.png" alt="Course 1" className="w-40 h-auto mx-auto mt-4 object-cover rounded-lg" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Comprehensive Learning</h3>
                                <p>Explore our wide range of courses that cover various skills to enhance your professional development.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                            <img src="assets/home2.png" alt="Course 2" className="w-40 h-auto mx-auto mt-4 object-cover rounded-lg" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Flexible Learning</h3>
                                <p>Learn at your own pace with our online courses that fit into your busy schedule.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                            <img src="assets/home3.png" alt="Course 3" className="w-40 h-auto mx-auto mt-4 object-cover rounded-lg" />
                            <div className="p-4">
                                <h3 className="text-xl font-bold">Expert Instructors</h3>
                                <p>Gain insights from industry experts through our expertly designed courses and resources.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
