import React, { useState, useEffect } from "react";
import axios from "axios";
import EnquiryModal from '../modals/EnquiryModal';

const BACKEND_URL = "https://api.adsu.shop"

const Footer = () => {
  const [footerSections, setFooterSections] = useState([]);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    // Fetch footer sections and subitems on component mount
    const fetchFooterSections = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/footer`);
        setFooterSections(response.data); // Assuming the response contains footer sections with subitems
      } catch (error) {
        console.error("Error fetching footer sections:", error);
      }
    };

    fetchFooterSections();
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-700 py-10 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {footerSections.map((section) => (
            <div key={section._id}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links && section.links.map((link) => (
                  <li key={link._id}>
                    <a href={link.url} className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left">
          {/* Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <li>CONTACT US</li>
            <li>
              <button 
                onClick={() => setIsEnquiryModalOpen(true)}
                className="hover:underline cursor-pointer"
              >
                ENQUIRY
              </button>
            </li>
            <li>RESEARCH</li>
            <li>CASE STUDY</li>
            <li>CAREERS</li>
            <li>NEWS & EVENTS</li>
            <li>CSR POLICY</li>
            <li>QUALITY POLICY</li>
            <li>LOGIN</li>
          </ul>
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex space-x-4">
              <img
                src="https://www.paharpur.com/wp-content/themes/paharpur/images/login-pic1.jpg"
                alt="Icon 1"
                className="w-6 h-6"
              />
              <img
                src="https://www.paharpur.com/wp-content/themes/paharpur/images/digital_management.gif"
                alt="Icon 2"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-blue-600 font-bold">+91-33-4013-3000</p>
              <p>support@paharpur.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-center md:text-left">
          <p>© 2024 Paharpur Cooling Towers Ltd.</p>
          <p>
            Privacy Policy • Disclaimer • Feedback • CIN:
            U02005WB1949PLC018363
          </p>
        </div>
      </div>
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
