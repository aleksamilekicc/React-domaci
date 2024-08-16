import React, { useState } from "react";

const CarCard = ({ car, axiosInstance }) => {
  const [isAvailable, setIsAvailable] = useState(car.is_available);

  const handleReservation = async () => {
    const user_id = sessionStorage.getItem("auth_id");
    const authToken = sessionStorage.getItem("auth_token");

    const today = new Date();
    const lastDay = new Date(today);
    lastDay.setDate(lastDay.getDate() + 9 * Math.random() + 1);

    const rent_start_date = today.toISOString().split("T")[0];
    const rent_end_date = lastDay.toISOString().split("T")[0];

    const daysRented =
      (new Date(rent_end_date) - new Date(rent_start_date)) /
      (1000 * 60 * 60 * 24);
    const total_price = daysRented * car.price_per_day;

    try {
      const response = await axiosInstance.post(
        "/api/rentals",
        {
          user_id: user_id,
          car_id: car.id,
          rent_start_date: rent_start_date,
          rent_end_date: rent_end_date,
          total_price: total_price,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsAvailable(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during reservation:", error);
    }
  };

  return (
    <div className="car-card">
      <h2>
        {car.brand.name} - {car.model}
      </h2>
      <p>
        <strong>Year:</strong> {car.year}
      </p>
      <p>
        <strong>Price per day:</strong> ${car.price_per_day}
      </p>
      <p>
        <strong>Availability:</strong>{" "}
        {isAvailable ? "Available" : "Not Available"}
      </p>
      {isAvailable ? (
        <button onClick={handleReservation}>Rezerviši</button>
      ) : null}
    </div>
  );
};

export default CarCard;
