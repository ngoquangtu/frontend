import React, { useState, useEffect } from 'react';
import AdPopup from './AdPopUp';
import { useNavigate } from 'react-router-dom';
import SearchCourses from './SearchCourses';
const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const checkLoginStatus = () => {
            const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(userLoggedIn);
        };
        const getUserAvatar = () => {
            const userInfo = localStorage.getItem('userAvatar');
            if (userInfo) {
                try {
                    setUserAvatar(userInfo || ''); 
                } catch (error) {
                    console.error('Error parsing user info:', error);
                }
            }          
        };
        const getUserName = () => {
            const userInfo = localStorage.getItem('userName');
            if (userInfo) {
                try {
                    setUserName(userInfo || ''); 
                } catch (error) {
                    console.error('Error parsing user info:', error);
                }
            }          
        };
        checkLoginStatus();
        getUserAvatar();
        getUserName();
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
    };

    const handleSearch = () => {
        setLoading(true);
    
        fetch(`http://${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/api/search-courses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title:keyword }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to search courses');
            }
            return response.json();
          })
          .then(data => {
            setLoading(false);
          })
          .catch(error => {
            console.error('Error searching courses:', error);
            setLoading(false);
          });
      };

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <a href="/">
                        <img src={"../assets/logo.svg"} alt="Logo" className="w-36 mr-8" />
                    </a>
                    <div className="hidden lg:block w-full lg:w-auto">
                        <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <NavItem link="/courses" text="Courses" className="hidden md:block" />
                    <NavItem link="/about" text="About" className="hidden md:block" />
                    <NavItem link="/contact" text="Contact" className="hidden md:block " />
                    <button className="lg:hidden text-gray-700 mr-16" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>

                    <div className="hidden md:flex items-center space-x-4">
                        {!isLoggedIn && <NavItem link="/login" text="Login" asButton={true} />}
                        {!isLoggedIn && <NavItem link="/register" text="Register" asButton={true} />}
                        {isLoggedIn && (
                            <>
                                <img src={userAvatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                                <button onClick={handleLogout} className="bg-[#12B7BD] text-white px-4 py-2 rounded hover:bg-[#0f9aa4] w-24">
                                    Log out</button>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
                    <div className="fixed top-0 right-0 w-full md:w-64 bg-white h-full z-20 p-4">
                        <button className="mb-4 text-gray-700" onClick={() => setIsSearchOpen(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <SearchBar keyword={keyword} setKeyword={setKeyword} handleSearch={handleSearch} />

                    </div>
                </div>
            )}

            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
                    <div className="fixed top-0 right-0 w-80 md:w-64 bg-white h-full z-20 p-4 flex flex-col items-center space-y-4">
                        {/* Close button */}
                        <button className="self-end text-gray-700" onClick={() => setIsMenuOpen(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        {/* User avatar and role */}
                        {isLoggedIn && (
                            <>
                                <div className="flex flex-col items-center">
                                    <img src={userAvatar} alt="Avatar" className="w-16 h-16 rounded-full mb-2" />
                                    <div className='flex-grow text-xl text-bold mb-2'> {userName}</div>
                                    <div className='text-xl text-[#12B7BD] text-bold'>Student</div>
                                </div>
                            </>
                        )}

                        {/* Navigation Links */}
                        <div className="flex flex-col items-center flex-grow mt-16 space-y-2">
                            <NavItem link="/courses" text="Courses" />
                            <NavItem link="/about" text="About" />
                            <NavItem link="/contact" text="Contact" />
                        </div>

                        {/* Authentication Links */}
                        <div className="flex flex-col items-center space-y-2">
                            {!isLoggedIn && <NavItem link="/login" text="Login" asButton={true}/>}
                            {!isLoggedIn && <NavItem link="/register" text="Register" asButton={true} />}
                            {isLoggedIn && (
                                <button onClick={handleLogout} className='bg-[#12B7BD] text-white px-4 py-2 rounded hover:bg-[#0f9aa4] w-24' asButton={true}>
                                    Log out
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
             <AdPopup />
        </nav>
    );
};

const NavItem = ({ link, text, asButton, className }) => {
    if (asButton) {
        const buttonClasses = text === "Register"
            ? "bg-[#12B7BD] text-white px-4 py-2 rounded hover:bg-[#0f9aa4] w-24"
            : "bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 w-24";
        return (
            <li className={`list-none ${className}`}>
                <a href={link}>
                    <button className={buttonClasses}>
                        {text}
                    </button>
                </a>
            </li>
        );
    }
    return (
        <li className={`list-none ${className}`}>
            <a href={link} className="text-gray-700 hover:text-gray-900">
                {text}
            </a>
        </li>
    );
};

const SearchBar = ({ keyword, setKeyword, handleSearch }) => {
    return (
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-400 rounded-full py-2 px-4 w-full"
          placeholder="Search course..."
        />
        <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    );
  };
  

export default NavBar;
