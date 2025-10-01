import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to No-Show Shield</h1>
            <p className="text-lg mb-8">Protect your business from no-shows with our easy booking system.</p>
            <a href="/booking" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Book an Appointment
            </a>
        </div>
    );
};

export default Home;