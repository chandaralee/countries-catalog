import React from 'react';
import './BackdropLoading.css'; // Import the custom CSS file

const BackdropLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-primary  h-32 w-32"></div>
    </div>
  );
};

export default BackdropLoading;
