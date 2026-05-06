import { Fragment, useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  AtSignIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { login, signup, user } = useAppContext();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (state === "login") {
      await login({ email, password });
    } else {
      await signup({ username, email, password });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Fragment>
      <Toaster />
      <main className="login-page-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
            {state === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
            {state === "login"
              ? "Please enter email and password to access"
              : "Please enter your details to create an account"}
          </p>
          {/* Username */}
          {state !== "login" && (
            <div className="mt-4">
              <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="relative mt-2">
                <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                <input
                  type="text"
                  placeholder="Enter a Username"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  className="login-input"
                  required
                />
              </div>
            </div>
          )}
          {/* Email */}
          <div className="mt-4">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-2">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                type="email"
                placeholder="Enter your E-Mail"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                className="login-input"
                required
              />
            </div>
          </div>
          {/* Password */}
          <div className="mt-4">
            <label className="font-medium text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                className="login-input pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting
              ? "Signing In..."
              : state === "login"
                ? "Log In"
                : "Sign Up"}
          </button>
          {state === "login" ? (
            <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
              Don't Have an Account?{" "}
              <button
                onClick={() => setState("sign-up")}
                className="ml-1 text-green-600 hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
              Already Have An Account?{" "}
              <button
                onClick={() => setState("login")}
                className="ml-1 text-green-600 hover:underline cursor-pointer"
              >
                Log In
              </button>
            </p>
          )}
        </form>
      </main>
    </Fragment>
  );
};

export default Login;
