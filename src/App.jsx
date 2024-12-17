import React, { useState } from 'react';
import { registerUser, loginUser, fetchRestaurants } from '../src/component/apiService';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [phone, setPhone] = useState('9818979450');
  const [otp, setOtp] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);

  // Handle Registration and OTP
  const handleRegister = async () => {
    try {
      await registerUser(phone, '+91');
      setOtpSent(true);
      alert('OTP sent successfully!');
    } catch (error) {
      alert('Registration failed. Please check the console for details.');
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const { userData, token } = await loginUser(phone, otp, '+91');
      setToken(token);
      setUserData(userData);
      localStorage.setItem('token', token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed. Please check the console for details.');
    }
  };

  // Fetch Restaurants
  const handleFetchRestaurants = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first!');
      return;
    }

    try {
      const data = await fetchRestaurants(118, token);
      console.log('Fetched Restaurants Data:', data); // Log to verify the data structure

      // Access the results array from the response data
      const restaurantsList = data.data?.results || [];
      setRestaurants(restaurantsList); // Set restaurants to the state
      alert('Restaurants fetched successfully!');
    } catch (error) {
      alert('Failed to fetch restaurants. Check the console for details.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">React Dev Task</h1>

        {/* Registration Section */}
        {!otpSent ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRegister}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Register & Get OTP
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* OTP Input Field with pre-filled OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
              Login with OTP
            </button>
          </div>
        )}

        {/* User Information */}
        {userData && (
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800">User Info</h2>
            <p><strong>Name:</strong> {userData.user_name}</p>
            <p><strong>Email:</strong> {userData.user_email}</p>
            <p><strong>Gender:</strong> {userData.user_gender}</p>
            <img
              src={userData.user_image}
              alt="User"
              className="w-24 h-24 object-cover rounded-full mt-4"
            />
          </div>
        )}

        {/* Fetch Restaurants Button */}
        {userData && (
          <div className="mt-6">
            <button
              onClick={handleFetchRestaurants}
              className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              Fetch Restaurants
            </button>
          </div>
        )}

        {/* Restaurant List */}
        {restaurants.length > 0 && (
          <ul className="mt-6 space-y-4">
            {restaurants.map((restaurant) => (
              <li key={restaurant.restaurant_id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-4">
                <img
                  src={restaurant.logo}
                  alt={restaurant.restaurant_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{restaurant.restaurant_name}</h3>
                  <p className="text-sm text-gray-500">{restaurant.address_complete || 'No address provided'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
