import React, { useState, useEffect } from 'react';

const NAV_BAR_CLASSES = "bg-zinc-500 dark:bg-zinc-900 p-4";
const TEXT_CLASSES = "text-white dark:text-zinc-200";
const LINK_CLASSES = "text-white dark:text-zinc-200 hover:underline";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra xem đã đăng nhập khi component được tạo
    useEffect(() => {
        const checkLoginStatus = () => {
            const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(userLoggedIn);
        };
        checkLoginStatus();
    }, []);

    // Hàm xử lý khi đăng nhập thành công
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    // Hàm đăng xuất
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    };

    return (
        <nav className={NAV_BAR_CLASSES}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl font-bold ${TEXT_CLASSES}`}>proSkills</h1>
                <ul className="flex space-x-4">
                    <NavItem link="/" text="Home" />
                    <NavItem link="/courses" text="Courses" />
                    <NavItem link="/contact" text="Contact" />
                    {/* Hiển thị nút đăng ký khi chưa đăng nhập */}
                    {!isLoggedIn && <NavItem link="/register" text="Register" />}
                    {/* Hiển thị nút đăng nhập khi chưa đăng nhập */}
                    {!isLoggedIn && <NavItem link="/login" text="Login" />}
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

// Component dùng để tạo các mục trong navbar
const NavItem = ({ link, text }) => {
    return (
        <li><a href={link} className={LINK_CLASSES}>{text}</a></li>
    );
};

export default NavBar;
