import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";

const Ponuda = ({ cars, axiosInstance }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [displayCars, setDisplayCars] = useState(cars);

  useEffect(() => {
    let filteredCars = cars;

    if (searchTerm !== "") {
      filteredCars = filteredCars.filter(
        (car) =>
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterAvailable) {
      filteredCars = filteredCars.filter((car) => car.is_available === 1);
    }

    if (minPrice !== "") {
      filteredCars = filteredCars.filter(
        (car) => parseFloat(car.price_per_day) >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== "") {
      filteredCars = filteredCars.filter(
        (car) => parseFloat(car.price_per_day) <= parseFloat(maxPrice)
      );
    }

    setDisplayCars(filteredCars);
  }, [searchTerm, cars, filterAvailable, minPrice, maxPrice]);

  return (
    <div className="ponuda-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by car model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price..."
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price..."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={() => setFilterAvailable(!filterAvailable)}>
          {filterAvailable ? "Show All Cars" : "Show Available Cars"}
        </button>
      </div>
      {displayCars.map((car) => (
        <CarCard key={car.id} car={car} axiosInstance={axiosInstance} />
      ))}
    </div>
  );
};

export default Ponuda;
