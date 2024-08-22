import React from "react";
import { useNavigate } from "react-router-dom";

const AdminBoard = ({ cars, axiosInstance }) => {
  const navigate = useNavigate();

  const deleteCar = async (carId) => {
    const authToken = sessionStorage.getItem("auth_token");

    try {
      await axiosInstance.delete(`/api/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error during car deletion:", error);
    }
  };

  const handleUpdate = (carId) => {
    navigate(`/izmeni/${carId}`);
  };

  return (
    <div className="admin-board">
      <h2>Lista svih automobila</h2>

      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price per day</th>
            <th>Availability</th>
            <th>Obrisi</th>
            <th>Izmeni</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand.name}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>${car.price_per_day}</td>
              <td>{car.is_available ? "Available" : "Not Available"}</td>
              <td>
                <button onClick={() => deleteCar(car.id)}>Obriši</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(car.id)}>Izmeni</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBoard;
