import React, { useState } from "react";
import diceBackground from "../../public/images/diceBackground.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthProvider";

const RegisterPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {AuthUser , setAuthUser} = useAuth();

  const navigate = useNavigate();

  const notify = (message, type) => {
    toast(message, { type, position: "top-center", autoClose: 3000 });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify("Please enter both email and password", "error");
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/api/login", { email, password });
      if (data) {
        notify("Login successful!", "success");
        localStorage.setItem("User", JSON.stringify(data.user))
        console.log(data.user)
        const initialAuthUser = localStorage.getItem("User")
        setAuthUser(initialAuthUser);
        setTimeout(() => {
          console.log("Navigating to homepage...");
          navigate("/homepage");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notify(error.response.data.message, "error");
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }

    setName("");
    setPassword("");
    setEmail("");
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !email) {
      notify("Please fill in all fields", "error");
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/api/signup", {
        email,
        name,
        password,
      });
      if (data) {
        console.log(data.user)
        notify("Signup successful!", "success");
        localStorage.setItem("User", JSON.stringify(data.user))
        const initialAuthUser = localStorage.getItem("User")
        setAuthUser(initialAuthUser);
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notify(error.response.data.message, "error");
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }

    setName("");
    setPassword("");
    setEmail("");
  };

  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${diceBackground})` }}
      >
        <div>
          <div className="flex justify-center md:justify-end m-4">
            <div>
              <h1 className="text-white text-4xl md:text-5xl font-bold">LUCKY ROLL</h1>
            </div>
          </div>
          <div className="bg-gray-600 bg-opacity-90 p-8 rounded-3xl shadow-md w-11/12 md:w-96 md:ml-[700px]">
            {/* Toggle Buttons */}
            <div className="flex justify-center space-x-1 md:space-x-4 mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`md:px-12 px-6 md:py-2 py-1 rounded-lg duration-300 border-2 border-black ${
                  showLogin ? "bg-black text-white" : "bg-white text-black border-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`md:px-12 px-4 md:py-2 py-1 rounded-lg duration-300 border-2 border-black ${
                  !showLogin ? "bg-black text-white" : "bg-white text-black border-white"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Login Form */}
            {showLogin && (
              <form className="space-y-4">
                <div>
                  <input
                    className="w-full border-2 border-gray-300 p-3 rounded-md"
                    placeholder="Email"
                    type="email"
                    value={email}
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-gray-300 p-3 rounded-md"
                    placeholder="Password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                  type="button"
                  onClick={LoginSubmit}
                >
                  Login
                </button>
              </form>
            )}

            {/* Signup Form */}
            {!showLogin && (
              <form className="space-y-4">
                <div>
                  <input
                    className="w-full border-2 border-gray-300 p-3 rounded-md"
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-gray-300 p-3 rounded-md"
                    placeholder="Email"
                    type="email"
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full border-2 border-gray-300 p-3 rounded-md"
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                  onClick={signupSubmit}
                >
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
