import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      alert("Please select a valid CSV file");
      return;
    }

    try {
      setIsLoading(true);

      const filename = file.name;

      const formData = new FormData();
      formData.append("dataFile", file);

      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const result = await response.text();
        setIsLoading(false);

        navigate("/result", { state: { result, filename } });
      } else {
        setIsLoading(false);
        alert("File upload failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading file:", error);
      alert("File upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-[#29335C] p-4">
        <h1 className="text-gray-100 text-3xl text-left font-aileron">
          Tweet Classifier
        </h1>
      </div>

      <h1 className="text-5xl flex justify-center font-sans font-bold pt-12">
        Classify tweets
      </h1>
      <br />
      <h2 className="text-2xl flex justify-center font-serif">
        in various categories
      </h2>
      <div className="flex-grow flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center mb-52">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-xl">Uploading...</span>
          </div>
        ) : (
          <label className="bg-[#29335C] hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-full text-2xl shadow-lg cursor-pointer mb-52">
            Upload CSV File
            <input
              type="file"
              id="upload-button"
              onChange={handleFileUpload}
              className="hidden"
              accept=".csv"
            />
          </label>
        )}
      </div>
      <footer className="flex justify-between bg-[#29335C] text-white text-sm py-2 px-7 max-sm:text-xs">
        <div>&copy; {new Date().getFullYear()} Tweet Classifier</div>
        <div>
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

export default HomePage;
