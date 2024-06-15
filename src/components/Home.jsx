import React, { useState } from 'react';

const NAV_BAR_CLASSES = "bg-zinc-500 dark:bg-zinc-900 p-4";
const TEXT_CLASSES = "text-white dark:text-zinc-200";
const LINK_CLASSES = "text-white dark:text-zinc-200 hover:underline";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

    // Hàm xử lý khi đăng nhập thành công
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    // Hàm đăng xuất
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className={NAV_BAR_CLASSES}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl font-bold ${TEXT_CLASSES}`}>proSkills</h1>
                <ul className="flex space-x-4">
                    <li><a href="/" className={LINK_CLASSES}>Home</a></li>
                    <li><a href="/courses" className={LINK_CLASSES}>Courses</a></li>
                    <li><a href="/contact" className={LINK_CLASSES}>Contact</a></li>
                    {/* Hiển thị nút đăng ký khi chưa đăng nhập */}
                    {!isLoggedIn && <li><a href="/register" className={LINK_CLASSES}>Register</a></li>}
                    {/* Hiển thị nút đăng nhập khi chưa đăng nhập */}
                    {!isLoggedIn && <li><a href="/login" className={LINK_CLASSES}>Login</a></li>}
                    {/* Hiển thị avatar và nút đăng xuất khi đã đăng nhập */}
                    {isLoggedIn && (
                        <>
                            <li><img src="avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" /></li>
                            <li><button onClick={handleLogout} className={LINK_CLASSES}>Logout</button></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

const MainContent = () => {
    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">Welcome to Our Website</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">Explore our amazing products and services</p>
            <img src="https://placehold.co/400" alt="Home Image" className="rounded-lg shadow-lg" />
        </div>
    );
};

const Home = () => {
    return (
        <>
            <NavBar />
            <MainContent />
        </>
    );
};

export default Home;
