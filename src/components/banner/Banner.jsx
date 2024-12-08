import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://api.adsu.shop"

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch banner data from backend
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/banner`);
        setBannerData(response.data); // Assuming your backend returns { imageUrl, overlayText }
        setLoading(false);
      } catch (err) {
        setError("Failed to load banner data");
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="relative w-full flex justify-center mt-10">
      {/* Banner Wrapper */}
      <div className="relative w-[80%] flex justify-center items-center mx-auto">
        {/* Banner Image */}
        <img
          src={bannerData.imageUrl} // Use the dynamic image URL from the backend
          alt="banner"
          className="w-full object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute top-20 left-10">
          <strong>
            <h5 className="text-white text-lg md:text-xl lg:text-2xl font-semibold italic tracking-wide">
              {bannerData.overlayText} {/* Use the dynamic text from the backend */}
            </h5>
          </strong>
        </div>
      </div>
    </section>
  );
};

export default Banner;
