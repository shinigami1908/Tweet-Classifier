import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import homesvg from "../assets/icons/home.svg";

const columns_local = [
  { field: "id", headerName: "ID", type: "string", width: 100 },
  { field: "date", headerName: "Date", type: "date", width: 100 },
  { field: "text", headerName: "Tweet", type: "string", width: 500 },
  { field: "category_rf", headerName: "Category RF", type: "string", width: 240 },
  { field: "category_nb", headerName: "Category NB", type: "string", width: 240 },
  { field: "category_svm", headerName: "Category SVM", type: "string", width: 240 },
];

const columns_tweetnlp = [
  { field: "id", headerName: "ID", type: "string", width: 100 },
  { field: "date", headerName: "Date", type: "date", width: 100 },
  { field: "text", headerName: "Tweet", type: "string", width: 800 },
  { field: "category", headerName: "Category", type: "string", width: 400 },
];

function convertDateStringToDate(dateString) {
  const [day, month, year] = dateString.split("-");
  const jsMonth = parseInt(month, 10) - 1;
  const dateObject = new Date(year, jsMonth, day);

  return dateObject;
}

function ResultPage() {
  const location = useLocation();
  const result = location.state?.result;
  const filename = location.state?.filename;
  
  const navigate = useNavigate();

  if(!result) {
    window.location.href = window.location.href.replace('/result', '/');
  }

  const parsedResult = JSON.parse(result);

  let columns = columns_local;
  let rows = parsedResult.flatMap((row, index) => ({
      id: index + 1,
      date: convertDateStringToDate(row.date),
      text: row.text,
      category_rf: row.category_rf,
      category_nb: row.category_nb,
      category_svm: row.category_svm,
    }));

  if(parsedResult[0].hasOwnProperty('category')){
    columns = columns_tweetnlp;
    rows = parsedResult.flatMap((row, index) => ({
      id: index + 1,
      date: convertDateStringToDate(row.date),
      text: row.text,
      category: row.category,
    }));
  }

  const downloadRows = rows.map(row => ({ ...row, date: row.date.toLocaleDateString('en-GB') }));

  const handleDownloadClick = async () => {
    try {
      let csvContent = "data:text/csv;charset=utf-8," +
        encodeURIComponent(
          Object.keys(downloadRows[0]).join(",") + "\n" +
          downloadRows.map(row => {
            const labels_rf = row.category_rf ? `"${row.category_rf.replace(/"/g, '""')}"` : '';
            const labels_nb = row.category_nb ? `"${row.category_nb.replace(/"/g, '""')}"` : '';
            const labels_svm = row.category_svm ? `"${row.category_svm.replace(/"/g, '""')}"` : '';
            row.text = `"${row.text.replace(/"/g, '""')}"`;
            const rowData = [row.id, row.date, row.text, labels_rf, labels_nb, labels_svm].join(",");
            return rowData;
          }).join("\n")
        );
      if(parsedResult[0].hasOwnProperty('category')){
        csvContent = "data:text/csv;charset=utf-8," +
        encodeURIComponent(
          Object.keys(downloadRows[0]).join(",") + "\n" +
          downloadRows.map(row => {
            const labels = row.category ? `"${row.category.replace(/"/g, '""')}"` : '';
            row.text = `"${row.text.replace(/"/g, '""')}"`;
            const rowData = [row.id, row.date, row.text, labels].join(",");
            return rowData;
          }).join("\n")
        );
      }
      
      const downloadFileName = `classified_${filename}`;
      const link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", downloadFileName);
      document.body.appendChild(link);
  
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-[#29335C] py-3 px-7">
        <h1 className="text-gray-100 text-3xl font-aileron">
          Tweet Classifier
        </h1>
        <div
          className="flex items-center hover:opacity-70 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={homesvg} alt="home" className="mr-1" />
          <h1 className="text-gray-100 text-2xl font-aileron">Home</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center -mt-11 h-screen">
        <div className="px-32 flex flex-row justify-between items-center w-full mb-6">
          <h1 className="text-4xl font-sans font-bold">Results</h1>
          <label
            className="bg-[#29335C] hover:bg-opacity-90 text-white font-bold py-2 px-3 rounded-full text-xl shadow-lg cursor-pointer"
            onClick={handleDownloadClick}
          >
            Download CSV File
          </label>
        </div>
        <div className="w-11/12 h-2/3">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
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
