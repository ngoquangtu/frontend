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
                <div className="bg-white rounded-lg p-8 relative max-w-sm w-full shadow-lg">
                    <button
                        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Quảng cáo</h2>
                    <p>Đây là thông báo quảng cáo của chúng tôi!</p>
                </div>
            </div>
        )
    );
};

export default AdPopup;
