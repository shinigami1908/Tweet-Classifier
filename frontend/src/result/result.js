import React from 'react';

function ResultPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-[#29335C] p-4">
        <h1 className="text-gray-100 text-3xl text-left font-aileron">Tweet Classifier</h1>
      </div>

      {/* Result Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Results</h1>

        {/* Slider or content */}
        <div className="w-full max-w-screen-lg bg-white rounded-lg p-6 shadow-md">
          {/* Replace this with your slider or content */}
          <div className="slider">
            {/* Slider items go here */}
          </div>
        </div>
      </div>

      {/* Footer with credits */}
      <footer className="bg-[#29335C] text-white text-center py-2">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tweet Classifier. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ResultPage;
