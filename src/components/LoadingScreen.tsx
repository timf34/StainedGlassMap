import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-blue-400"></div>
                <h2 className="mt-4 text-xl font-light text-gray-700">Loading...</h2>
            </div>
        </div>
    );
};

export default LoadingScreen;
