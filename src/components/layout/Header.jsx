import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch header data from the backend on component mount
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/header'); // Adjust this URL to your backend route
        setHeaderData(response.data); // Store fetched data in state
      } catch (err) {
        setError('Failed to load header data');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchHeaderData();
  }, []);

  // Show loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if data failed to load
  if (error) {
    return <div>{error}</div>;
  }

  // Check if headerData exists and has the required properties
  if (!headerData || !headerData.contact || !Array.isArray(headerData.navigationLinks)) {
    return <div>Header data is missing or incomplete.</div>;
  }

  // Destructure the headerData to access logo, contact, and navigation links
  const { logoUrl, contact, navigationLinks } = headerData;

  return (
    <header className="bg-gray-100 text-gray-700 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-10"
          />
        </div>

        {/* Contact Information */}
        <div className="hidden md:flex flex-col text-center">
          <p className="text-sm">
            <span className="font-bold">{contact?.phone || "No phone available"}</span>
          </p>
          <p className="text-sm">{contact?.email || "No email available"}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 hidden md:flex items-center justify-center space-x-8 text-sm font-medium">
          {navigationLinks && navigationLinks.length > 0 ? (
            <>
              {navigationLinks.slice(0, 6).map((link, index) => (
                <a
                  key={`${link}-${index}`}  // Combine link value and index for a unique key
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-blue-600"
                >
                  {link}
                </a>
              ))}
              {navigationLinks.length > 6 && (
                <div className="relative group">
                  <span className="hover:text-blue-600">...</span>
                  <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2">
                    {navigationLinks.slice(6).map((link, index) => (
                      <a
                        key={`${link}-${index + 6}`}  // Unique key for additional links
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block hover:text-blue-600"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>No navigation links available</div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
