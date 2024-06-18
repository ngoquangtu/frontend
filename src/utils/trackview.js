import {LOCALHOST, PORT} from '@env';
export const trackview = async () => {
    try {
        const response = await fetch(`http://${LOCALHOST}:${PORT}/api/users/views`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Error tracking view:', error);
    }
};
