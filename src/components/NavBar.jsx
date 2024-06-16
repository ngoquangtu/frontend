// NavBar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NAV_BAR_CLASSES = "bg-zinc-500 dark:bg-zinc-900 p-4";
const TEXT_CLASSES = "text-white dark:text-zinc-200";
const LINK_CLASSES = "text-white dark:text-zinc-200 hover:underline";

const NavBar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav className={NAV_BAR_CLASSES}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className={`text-xl font-bold ${TEXT_CLASSES}`}>proSkills</h1>
                <ul className="flex space-x-4">
                    <NavItem link="/" text="Home" />
                    <NavItem link="/courses" text="Courses" />
                    <NavItem link="/contact" text="Contact" />
                    {!isLoggedIn && <NavItem link="/register" text="Register" />}
                    {!isLoggedIn && <NavItem link="/login" text="Login" />}
                    {isLoggedIn ==='true' && (
                                             <>
                                             <li>
                                                 <img src="/path/to/avatar.jpg" alt="Avatar" className="w-8 h-8 rounded-full" />
                                             </li>
                                             <li>
                                                 <button onClick={logout} className={LINK_CLASSES}>Logout</button>
                                             </li>
                                         </>
                 
                    )}
                </ul>
            </div>
        </nav>
    );
};

const NavItem = ({ link, text }) => {
    return (
        <li><Link to={link} className={LINK_CLASSES}>{text}</Link></li>
    );
};

export default NavBar;
