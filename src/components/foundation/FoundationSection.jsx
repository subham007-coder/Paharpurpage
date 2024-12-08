import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://api.adsu.shop";

const FoundationSection = () => {
  const [heroText, setHeroText] = useState("");
  const [heroDescription, setHeroDescription] = useState("");

  useEffect(() => {
    // Fetch hero text and description from the API
    const fetchHeroText = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/hero-text`);
        const data = response.data;
        setHeroText(data.heroText);
        setHeroDescription(data.heroDescription);
      } catch (error) {
        console.error("Error fetching hero text:", error.message);
      }
    };

    fetchHeroText();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <section className="py-0">
      <div className="w-[90%] mx-auto bg-white p-6 rounded">
        {/* Title */}
        <h1 className="text-[1.2em] font-semibold italic text-[#c7672b] leading-relaxed mb-4">
          {heroText || "Loading..."} {/* Fallback while data is loading */}
        </h1>
        {/* Description */}
        <p className="text-base md:text-lg text-gray-700 text-justify leading-relaxed italic">
          {heroDescription || "Loading..."} {/* Fallback while data is loading */}
        </p>
      </div>
    </section>
  );
};

export default FoundationSection;
