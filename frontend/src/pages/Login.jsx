import { useState } from "react";
import axios from "axios";
// import { backendUrl } from "../App";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Remove this duplicate import
// import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
  const [currentState, setCurrentState] = useState("Login");
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (currentState === "Sign Up") {
        // SIGN UP
        res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isAuth", "true");
          console.log(`${currentState} success`);
          toast.success("User Signup Successfully");
          setCurrentState("Login");
        } else {
          console.log(res.data.msg);
          toast.error(res.data.msg);
        }
      } else {
        // LOGIN
        res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        console.log(res, "this is data responce");

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isAuth", "true");
          console.log(`${currentState} success`);
          navigate('/')

        } else {
          console.log(res.data.msg);
          toast.error(res.data.msg);
        }
      }
    } catch (error) {
      console.log("authError", error.response?.data || error.message);
      console.log("error ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-100 to-transparent rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-l from-purple-100 to-transparent rounded-full blur-2xl opacity-50"></div>

        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-200/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <h1 className="prata-regular text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {currentState}
              </h1>
              <div className="w-8 h-[2px] bg-gradient-to-r from-gray-800 to-gray-400 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm">
              {currentState === "Login"
                ? "Welcome back! Please enter your details."
                : "Join our community! Create your account."}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Conditional Name field for Sign Up */}
            {currentState === "Sign Up" && (
              <div className="group">
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                             transition-all duration-300 
                                             focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                             group-hover:border-gray-300 group-hover:shadow-sm
                                             placeholder:text-gray-400"
                  placeholder="Full Name"
                  required
                />
                <div className="mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Enter your full name
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="group">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                         transition-all duration-300 
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                         group-hover:border-gray-300 group-hover:shadow-sm
                                         placeholder:text-gray-400"
                placeholder="Email address"
                required
              />
              <div className="mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                We'll never share your email
              </div>
            </div>

            {/* Password field */}
            <div className="group">
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                         transition-all duration-300 
                                         focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                         group-hover:border-gray-300 group-hover:shadow-sm
                                         placeholder:text-gray-400"
                placeholder="Password"
                required
              />
              <div className="mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentState === "Login"
                  ? "Enter your password"
                  : "At least 8 characters"}
              </div>
            </div>

            {/* Forgot password & toggle */}
            <div className="flex justify-between items-center pt-2">
              <button
                style={{ display: currentState === "Login" ? "block" : "none" }}
                type="button"
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300 
                                         relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] 
                                         after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Forgot your password?
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentState(
                    currentState === "Login" ? "Sign Up" : "Login"
                  )
                }
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300 
                                         relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] 
                                         after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {currentState === "Login" ? "Create Account →" : "← Login Here"}
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium 
                                     py-3.5 rounded-xl transition-all duration-500 mt-6
                                     hover:from-gray-800 hover:to-gray-700 hover:shadow-xl hover:shadow-gray-900/20
                                     active:scale-[0.98] active:shadow-lg
                                     relative overflow-hidden group"
            >
              {/* Animated background effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 
                                          transition-transform duration-500 ${
                                            isHovered
                                              ? "translate-x-0"
                                              : "-translate-x-full"
                                          }`}
              ></div>

              <span className="relative z-10 flex items-center justify-center gap-2">
                {currentState === "Login" ? "Sign In" : "Create Account"}
                <svg
                  className={`w-4 h-4 transition-transform duration-500 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;