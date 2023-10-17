import Home from "./home/home";
import Result from "./result/result";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/result" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
