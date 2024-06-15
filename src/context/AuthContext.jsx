import React, { createContext, useEffect, useState } from 'react';

// AsyncStorage không sử dụng được trong React, thay vào đó sử dụng localStorage hoặc sessionStorage
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginInfo, setLoginInfo] = useState({});
    const [isLogin, setLogin] = useState(false);

    const login = async (jwt, userInfo) => {
        setLogin(true);
        setLoginInfo(userInfo);
        // Sử dụng localStorage thay thế cho AsyncStorage
        localStorage.setItem('JWT', jwt);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    const checkLogin = () => {
        // Lấy dữ liệu từ localStorage
        const token = localStorage.getItem('JWT');
        setLogin(token ? true : false);
        if (token) setLoginInfo(JSON.parse(localStorage.getItem('userInfo')));
        return token !== null;
    };

    const logout = () => {
        setLogin(false);
        // Xóa dữ liệu từ localStorage khi đăng xuất
        localStorage.removeItem('JWT');
        localStorage.removeItem('userInfo');
    };

    // Sử dụng useEffect để kiểm tra xem người dùng đã đăng nhập trước đó hay chưa khi component được tạo
    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ isLogin, loginInfo, login, checkLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
