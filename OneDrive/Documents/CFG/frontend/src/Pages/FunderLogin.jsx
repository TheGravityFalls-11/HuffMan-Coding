                                                                                                                                                           import React from "react";
import { Link } from "react-router-dom";

function FunderLogin() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container">
          <Link className="navbar-brand text-white fw-bold" to="/">Reaching Roots</Link>
          <Link to="/login" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i>Back to Selection
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="text-center mb-4">
                <i className="bi bi-cash-coin text-primary display-3 mb-3"></i>
                <h2 className="text-primary fw-bold">Funder Login</h2>
                <p className="text-muted lead">Access your funding management dashboard</p>
              </div>
              
              <form className="bg-white p-4 border rounded shadow-sm">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="email" 
                    placeholder="Enter your email" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    id="password" 
                    placeholder="Enter your password" 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                </button>
                <div className="text-center">
                  <small className="text-muted">
                    <a href="#" className="text-decoration-none">Forgot password?</a>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunderLogin;