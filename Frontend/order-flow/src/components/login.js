import React from 'react'; 

const Login = () => { 

    const api = async () => { // Use async for asynchronous operation
        try {
            const response = await fetch('http://localhost:3001/auth/google', { // Use 'http' instead of 'https' for local testing
                method: 'POST', // Correctly structure the options
                headers: {
                    'Content-Type': 'application/json', // Set appropriate headers if needed
                },
                // body: JSON.stringify({ /* Your data here if needed */ }) // Include body if necessary
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Handle the response data
            console.log(data); // Process the data as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button 

                onClick={api} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                Login with Google
            </button>
        </div>
    );
};

export default Login; 
