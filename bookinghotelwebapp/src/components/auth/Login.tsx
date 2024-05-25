import { useState } from "react";
import "./Login.scss";
import { LoginData } from "../../apis/common/Types";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../apis/auth/AuthApis";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate(formData)
      .then((response) => {
        if (response.status === 200) {
          const { token, username, userRole, userId } = response.data;
          auth.handleLogin(token, username, userRole, userId);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  placeholder="enter you email or username"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="enter your password"
                  className="form-control"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formData.email || !formData.password}
              >
                Login
              </button>
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
