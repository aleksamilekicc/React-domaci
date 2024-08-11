import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";

const CarRentalHome = () => {
  const [images, setImages] = useState([]);
  const ACCESS_KEY = "AYoD1RB6ATmNpK69MpZK7lqW5fFyqTUtrHFhEZW7o1k";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: "car",
              per_page: 5,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        setImages(response.data.results);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja slika:", error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <div className="car-rental-home">
      <header className="rental-header">
        <h1>Welcome to Car Rentals</h1>
        <p>Your journey starts here!</p>
      </header>
      
      <section className="image-carousel">
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <img
                src={image.urls.regular}
                alt={image.alt_description || "Automobil"}
              />
            </div>
          ))}
        </Slider>
      </section>

      <section className="rental-features">
        <div className="feature">
          <h2>Wide Selection</h2>
          <p>Choose from a range of cars to suit your needs.</p>
        </div>
        <div className="feature">
          <h2>Best Prices</h2>
          <p>Affordable rates for daily, weekly, or monthly rentals.</p>
        </div>
        <div className="feature">
          <h2>Excellent Service</h2>
          <p>24/7 customer support for a seamless experience.</p>
        </div>
      </section>
    </div>
  );
};

export default CarRentalHome;
