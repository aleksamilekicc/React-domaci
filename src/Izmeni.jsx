import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Izmeni = ({ cars, axiosInstance }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const car = cars.find((car) => car.id === parseInt(id));
    if (car) {
      setCarData(car);
    }
  }, [cars, id]);

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem("auth_token");

    try {
      const updatedCarData = {
        ...carData,
        brand_id: carData.brand.id,
      };
      await axiosInstance.put(`/api/cars/${id}`, updatedCarData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      navigate("/admin");
      window.location.reload();
    } catch (error) {
      console.error("Error during car update:", error);
    }
  };

  if (!carData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Izmeni automobil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={carData.brand.name}
            required
            readOnly
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price per day:</label>
          <input
            type="number"
            name="price_per_day"
            value={carData.price_per_day}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Availability:</label>
          <select
            name="is_available"
            value={carData.is_available}
            onChange={handleChange}
          >
            <option value={1}>Available</option>
            <option value={0}>Not Available</option>
          </select>
        </div>
        <div>
          <button type="submit">Izmeni</button>
        </div>
      </form>
    </div>
  );
};

export default Izmeni;
