
import React from "react";
import { Link } from "react-router-dom";

function LoginSelector() {
  return (
    <div className="login-bg d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container">
          <Link className="navbar-brand text-white fw-bold" to="/">Reaching Roots</Link>
          <Link to="/" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i>Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="login-bg-overlay flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h2 className="text-success fw-bold mb-3 othr">Choose Your Role</h2>
                <p className="text-muted lead">Select how you'd like to access the platform</p>
              </div>
              
              <div className="row g-4 justify-content-center">
                <div className="col-md-5">
                  <div className="card border-success h-100 shadow-sm">
                    <div className="card-body text-center p-4">
                      <i className="bi bi-people-fill text-success display-4 mb-3"></i>
                      <h5 className="card-title text-success fw-bold">NGO Partner</h5>
                      <p className="card-text text-muted mb-4">
                        Access project management tools, training resources, and community development programs.
                      </p>
                      <Link to="/login/ngo" className="btn btn-success btn-lg w-100">
                        <i className="bi bi-person-circle me-2"></i> NGO Login
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-5">
                  <div className="card border-primary h-100 shadow-sm">
                    <div className="card-body text-center p-4">
                      <i className="bi bi-cash-coin text-primary display-4 mb-3"></i>
                      <h5 className="card-title text-primary fw-bold">Funder</h5>
                      <p className="card-text text-muted mb-4">
                        Monitor project progress, review reports, and manage funding allocations.
                      </p>
                      <Link to="/login/funder" className="btn btn-primary btn-lg w-100">
                        <i className="bi bi-cash-coin me-2"></i> Funder Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSelector;