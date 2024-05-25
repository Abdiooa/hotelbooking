import { Link, useNavigate } from "react-router-dom";
import "./Registration.scss";
import { useState } from "react";
import { RegisterData } from "../../apis/common/Types";
import { signup } from "../../apis/auth/AuthApis";
const Registration = () => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData)
      .then((response) => {
        if (response && response.status === 201) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          navigate("/login");
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
    <div className="register">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  placeholder="enter your first name"
                  className="form-control"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="enter your last name"
                  className="form-control"
                  onChange={handleChange}
                  id="lastName"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="enter your email"
                  onChange={handleChange}
                  className="form-control"
                  id="email"
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
                  onChange={handleChange}
                  id="password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <p>
                You have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
