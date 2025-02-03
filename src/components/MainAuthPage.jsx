// AuthPage.jsx
import { useState } from "react";
import SignUpPage from "./SignUp";
import LoginPage from "./Login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/authSlice";
import Cookies from "js-cookie";
const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    practice:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp
      ? "http://127.0.0.1:8000/users/api/signup/"
      : "http://127.0.0.1:8000/users/api/login/";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          ...(isSignUp
            ? {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                practice: formData.practice,
              }
            : {
                username: formData.username,
              }),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isSignUp) {
          console.log("user created successfully...");
          navigate("/dashboard");
        } else {
          const username = formData.username;
          const role = data.role;
          
          Cookies.set("access_token", data.access, { expires: 1 });
          Cookies.set("refresh_token", data.refresh, { expires: 7 });
          dispatch(setUserData({ username, role }));
          navigate("/dashboard");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">
            LIGHTBULB
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            {isSignUp
              ? "Join us to illuminate your path"
              : "Welcome back to your journey"}
          </p>
        </div>

        {isSignUp ? (
          <SignUpPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <LoginPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isSignUp ? "Already have an account?" : "New to Lightbulb?"}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition duration-150"
            >
              {isSignUp ? "Sign in to your account" : "Create a new account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
