import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold">A2Z Dairy</h3>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              A2Z Dairy is a leading dairy company dedicated to delivering fresh, high-quality dairy products including milk, cheese, and butter.
            </p>
            <p className="mt-6 text-sm text-gray-400">
              A2Z Dairy 2023 © All rights reserved
            </p>
          </div>

          {/* Office Address */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Office Address</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              A2Z Dairy Pvt. Ltd.,<br />
              Dairy Business Park,<br />
              Milk City, Mumbai - 400001, India
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="text-center lg:text-right">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center lg:justify-end space-x-6">
              <a
                href="https://facebook.com/a2zdairy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://twitter.com/a2zdairy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="https://instagram.com/a2zdairy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://linkedin.com/company/a2zdairy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;