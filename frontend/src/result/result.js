import React from "react";
import homesvg from "../assets/icons/home.svg";

function ResultPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-[#29335C] py-3 px-7">
        <h1 className="text-gray-100 text-3xl font-aileron">
          Tweet Classifier
        </h1>
        <div className="flex items-center hover:opacity-70 cursor-pointer">
          <img src={homesvg} alt="home" className="mr-1"/>
          <h1 className="text-gray-100 text-2xl font-aileron">Home</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold mb-4">Results</h1>
        {/* <pre>{resultData}</pre> */}
        <div className="w-full max-w-screen-lg bg-white rounded-lg p-6 shadow-md">
          <div className="slider"></div>
        </div>
      </div>

      <footer className="flex justify-between bg-[#29335C] text-white py-2 px-7">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Tweet Classifier
        </div>
        <div className="text-sm">
          Developed by{" "}
          <a
            href="https://github.com/shinigami1908"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            shinigami1908
          </a>
          ,{" "}
          <a
            href="https://github.com/Shwetansu1603"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Shwetansu1603
          </a>
          ,{" "}
          <a
            href="https://github.com/sharon-trisha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            sharon-trisha
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ResultPage;
