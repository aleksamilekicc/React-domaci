import "./App.css";
import CarRentalHome from "./CarRentalHome";
import axios from "axios";
import { useEffect, useState } from "react";
import Ponuda from "./Ponuda";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import AdminBoard from "./AdminBoard";
import Izmeni from "./Izmeni";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
function App() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/api/cars")
      .then((response) => {
        setCars(response.data.cars);
        console.log(response.data.cars);
      })
      .catch((error) => {
        console.error("There was an error fetching the cars:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar axiosInstance={axiosInstance} />
        <Routes>
          <Route path="/" element={<CarRentalHome />} exact />
          <Route
            path="/ponuda"
            element={<Ponuda cars={cars} axiosInstance={axiosInstance} />}
          />
          <Route
            path="/register"
            element={<Register axiosInstance={axiosInstance} />}
          />
          <Route
            path="/login"
            element={<Login axiosInstance={axiosInstance} />}
          />
          <Route
            path="/admin"
            element={<AdminBoard cars={cars} axiosInstance={axiosInstance} />}
          />
          <Route
            path="/izmeni/:id"
            element={<Izmeni cars={cars} axiosInstance={axiosInstance} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
