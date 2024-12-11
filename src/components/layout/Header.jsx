import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://api.adsu.shop";

const Header = () => {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/header`);
        setHeaderData(response.data);
      } catch (err) {
        setError('Failed to load header data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeaderData();
  }, []);

  if (loading) {
    return <div className="w-full h-16 bg-gray-100 animate-pulse"></div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-600 p-4">{error}</div>;
  }

  if (!headerData || !headerData.contact || !Array.isArray(headerData.navigationLinks)) {
    return <div>Header data is missing or incomplete.</div>;
  }

  const { logoUrl, contact, navigationLinks } = headerData;

  return (
    <header className="bg-gray-100 text-gray-700 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback-logo.png'; // Add a fallback logo image
              }}
            />
          )}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col text-center">
          <p className="text-sm">
            <span className="font-bold">{contact?.phone || "No phone available"}</span>
          </p>
          <p className="text-sm">{contact?.email || "No email available"}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center justify-center space-x-8 text-sm font-medium">
          {navigationLinks && navigationLinks.length > 0 ? (
            <>
              {navigationLinks.slice(0, 6).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {navigationLinks.length > 6 && (
                <div className="relative group">
                  <span className="hover:text-blue-600 cursor-pointer">More</span>
                  <div className="absolute hidden group-hover:block right-0 mt-2 bg-white border border-gray-300 shadow-lg p-2 rounded-md z-50">
                    {navigationLinks.slice(6).map((link, index) => (
                      <a
                        key={index + 6}
                        href={link.url}
                        className="block py-2 px-4 hover:text-blue-600 whitespace-nowrap"
                      >
                        {link.name}
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