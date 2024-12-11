import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://api.adsu.shop"

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
          <a href="https://www.paharpur.com">
          <img
            src={logoUrl}
            alt="Logo"
            className="h-10"
            onError={(e) => {
              e.target.onerror = null;
              console.error('Error loading image:', e);
            }}
          />
          </a>
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
                  key={index}
                  href={link.url || `#${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-blue-600"
                >
                  {link.name || link}
                </a>
              ))}
              {navigationLinks.length > 6 && (
                <div className="relative group">
                  <span className="hover:text-blue-600">...</span>
                  <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2">
                    {navigationLinks.slice(6).map((link, index) => (
                      <a
                        key={index + 6}
                        href={link.url || `#${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block hover:text-blue-600"
                      >
                        {link.name || link}
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