import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/images-2/icon.jpg";

const cities = [
  { name: "Bangalore", icon: "🏙️" },
  { name: "Chandigarh", icon: "🏛️" },
  { name: "Chennai", icon: "🌊" },
  { name: "Delhi NCR", icon: "🏰" },
  { name: "Hyderabad", icon: "🏯" },
  { name: "Jaipur", icon: "🕌" },
  { name: "Mumbai", icon: "🌆" },
  { name: "Pune", icon: "🌳" },
];

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pune");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Captcha state
  const [captchaImageUrl, setCaptchaImageUrl] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isLoadingCaptcha, setIsLoadingCaptcha] = useState(false);

  // Helper: Extract captcha text from the file name (e.g. "658xe.png" → "658xe")
  const extractCaptchaText = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.split(".")[0];
  };

  /**
   * Get Captcha API  
   * Calls the getcaptcha endpoint when the "Get Captcha" button is clicked.
   */
  const fetchCaptcha = async () => {
    try {
      setIsLoadingCaptcha(true);
      const response = await fetch("http://74.50.72.202:6565/a2z/uam/users/getcaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: phoneNumber,
          supplierId: 1001,
        }),
      });
      const data = await response.json();
      if (data.code === 0) {
        // Example: data.data might be "a2z/attachment/a2z/captcha/658xe.png"
        setCaptchaImageUrl(data.data);
        setError("");
      } else {
        setError("Failed to load CAPTCHA. Please try again.");
      }
    } catch (err) {
      setError("Error fetching CAPTCHA. Please check your connection.");
    } finally {
      setIsLoadingCaptcha(false);
    }
  };

  /**
   * Send OTP API  
   * Calls the sendOTP endpoint when the "Send OTP" button is clicked.
   * This verifies the user-entered CAPTCHA (via the imgText property).
   */
  const sendOTP = async () => {
    try {
      const response = await fetch("http://74.50.72.202:6565/a2z/uam/users/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isA2Z: false,
          otp: "",
          status: "ACTIVE",
          supplierId: 1001,
          mobileNumber: phoneNumber,
          imgText: userCaptcha, // User-entered CAPTCHA text
        }),
      });
      const data = await response.json();
      console.log("sendOTP response:", data);
      return data;
    } catch (err) {
      console.error("sendOTP error:", err);
      return { code: -1, message: "Network error" };
    }
  };

  /**
   * Optional: Verify OTP API  
   * If needed, use this function to verify the entered OTP.
   */
  const verifyOTP = async () => {
    try {
      const response = await fetch("http://74.50.72.202:6565/a2z/uam/users/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: phoneNumber,
          otp: otp,
          supplierId: 1001,
        }),
      });
      const data = await response.json();
      console.log("verifyOTP response:", data);
      if (data.code === 0) {
        // OTP verified successfully
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } catch (err) {
      console.error("verifyOTP error:", err);
      setError("Error verifying OTP. Please check your connection.");
    }
  };

  // Refresh CAPTCHA handler
  const handleRefreshCaptcha = async () => {
    await fetchCaptcha();
  };

  // Handler for "Get Captcha" button
  const handleGetCaptcha = async () => {
    if (phoneNumber.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    await fetchCaptcha();
  };

  // Handler for "Send OTP" button
  const handleSendOtp = async () => {
    if (!userCaptcha) {
      setError("Please enter the CAPTCHA.");
      return;
    }
    const sendOtpResponse = await sendOTP();
    if (sendOtpResponse.code === 0) {
      // OTP sent successfully; show the OTP input screen.
      setShowOtpScreen(true);
      setError("");
    } else {
      setError("CAPTCHA verification or OTP send failed. Please try again.");
    }
  };

  // Handler for "Verify OTP" button (optional)
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    await verifyOTP();
  };

  useEffect(() => {
    console.log("Modal State:", showModal);
  }, [showModal]);

  // City selection handler
  const selectCity = (city) => {
    setSelectedCity(city);
    setShowModal(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 shadow-md bg-white fixed w-full top-0 z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="flex gap-2 items-center text-gray-700 hover:text-green-600 transition-all font-semibold text-md md:text-lg"
            aria-label="Select Location"
          >
            <span className="font-bold text-green-500">{selectedCity} ▼</span>
          </button>
        </div>
        <div className="flex gap-4 md:gap-8 items-center relative">
          <a
            href="#"
            className="hidden md:inline-block hover:text-green-600 transition-colors font-medium text-lg"
          >
            Products
          </a>
          {isLoggedIn ? (
            <div className="relative">
              <button className="focus:outline-none">
                <img
                  src="/profile-icon.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginCard(!showLoginCard)}
              className="login-button bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-all shadow-md text-sm md:text-lg font-semibold"
              aria-label="Login"
            >
              Login
            </button>
          )}
          <AnimatePresence>
            {showLoginCard && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`fixed md:absolute right-0 top-16 md:top-12 w-[90vw] md:w-[360px] ${
                  error ? "border border-red-500" : "shadow-2xl"
                } bg-white rounded-xl p-4 md:p-6 z-50 login-card mx-2`}
              >
                <button
                  onClick={() => {
                    setShowLoginCard(false);
                    setError("");
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl p-1"
                  aria-label="Close Login"
                >
                  ✕
                </button>
                {showOtpScreen ? (
                  <>
                    <h2 className="text-md md:text-lg font-bold text-gray-800 pr-6">
                      Enter OTP
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mb-3">
                      We have sent an OTP to {phoneNumber}
                    </p>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg mt-3 p-2 text-sm text-gray-700 bg-transparent outline-none"
                    />
                    <button
                      onClick={handleVerifyOtp}
                      className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-all w-full"
                    >
                      Verify OTP
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-md md:text-lg font-bold text-gray-800 pr-6">
                      Free Membership
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mb-3">On your signup</p>
                    <div className="mt-3">
                      <div
                        className={`flex items-center border ${
                          error ? "border-red-500" : "border-gray-300"
                        } rounded-lg p-2`}
                      >
                        <input
                          type="text"
                          placeholder="Enter Your Number"
                          value={phoneNumber}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setPhoneNumber(input);
                          }}
                          className="w-full outline-none text-sm text-gray-700 bg-transparent"
                          maxLength="10"
                        />
                      </div>
                      {/* Show CAPTCHA text and input if available */}
                      {captchaImageUrl && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="bg-gray-100 p-2 rounded-lg h-12 flex items-center justify-center text-lg font-bold select-none">
                              {extractCaptchaText(captchaImageUrl)}
                            </div>
                            <button
                              onClick={handleRefreshCaptcha}
                              className="text-sm text-gray-600 hover:text-green-600"
                              disabled={isLoadingCaptcha}
                            >
                              {isLoadingCaptcha ? "Refreshing..." : "Refresh"}
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter CAPTCHA"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none"
                          />
                        </div>
                      )}
                    </div>
                    {/* Conditional Buttons */}
                    {!captchaImageUrl ? (
                      <button
                        onClick={handleGetCaptcha}
                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-all w-full"
                      >
                        {isLoadingCaptcha ? "Loading..." : "Get Captcha"}
                      </button>
                    ) : (
                      <button
                        onClick={handleSendOtp}
                        className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-all w-full"
                        disabled={isLoadingCaptcha}
                      >
                        {isLoadingCaptcha ? "Loading..." : "Send OTP"}
                      </button>
                    )}
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* LOCATION MODAL */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-40"
            />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[90vw] md:w-[550px] relative modal-content">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                  ✕
                </button>
                <h2 className="text-xl md:text-3xl font-bold mb-3 text-gray-800">Select Location</h2>
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => selectCity(city.name)}
                    className="p-2 border rounded-md m-1 hover:bg-green-50 transition-colors"
                  >
                    {city.icon} {city.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;