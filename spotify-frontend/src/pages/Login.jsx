import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(form);

    if (res?.success) {
      navigate("/");
    } else {
      alert(res?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md p-8 rounded-2xl bg-[#121212] shadow-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login to Spotify
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">


          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-lg
              bg-[#1e1e1e]
              border
              border-gray-700
              focus:outline-none
              focus:border-green-500
            "
            required
          />



          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="
                w-full
                p-3
                pr-12
                rounded-lg
                bg-[#1e1e1e]
                border
                border-gray-700
                focus:outline-none
                focus:border-green-500
              "
              required
            />


            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-white
              "
            >

              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}

            </button>

          </div>



          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-500
              hover:bg-green-600
              text-black
              font-semibold
              p-3
              rounded-full
              transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>


        </form>



        <div className="my-6 border-t border-gray-700"></div>



        <p className="text-center text-sm text-gray-400">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-green-500 hover:underline"
          >
            Sign up
          </Link>

        </p>


      </div>

    </div>
  );
};

export default Login;