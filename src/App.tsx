import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Calculator from "./pages/calculator/Calculator";
import Budget from "./pages/budget/Budget";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
