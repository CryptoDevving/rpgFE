import React, { useEffect, useState } from 'react';

function Fetcher() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/test')
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.log('Error fetching data:', error));
    }, []);

    return (
        <div>
            <p>Message from backend: {message}</p>
        </div>
    );
}

export default Fetcher;
