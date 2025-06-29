import React, { useState } from "react";
import { Link } from "react-router-dom";
import VillagesList from "./VillagesList";
import AddVillage from "./AddVillage";
import AddVLE from "./AddVLE";
import VLEsList from "./VLEsList";
import FindNearbyMachinery from "./FindNearbyMachinery";
import AIAnalyzer from "./AIAnalyzer";

function NGODashboard() {
  const [activeView, setActiveView] = useState('home');

  const renderContent = () => {
    switch (activeView) {
      case 'villages':
        return <VillagesList />;
      case 'add-village':
        return <AddVillage />;
      case 'add-vle':
        return <AddVLE />;
      case 'vles':
        return <VLEsList />;
      case 'machinery':
        return <FindNearbyMachinery />;
      case 'ai-analyzer':
        return <AIAnalyzer />;
      default:
        return (
          <div className="flex-grow-1">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-success to-primary text-white py-5">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h1 className="display-4 fw-bold mb-3">Welcome to Reaching Roots</h1>
                    <p className="lead mb-4">Empowering rural communities through sustainable agriculture, digital transformation, and community development initiatives.</p>
                    <div className="d-flex gap-3">
                      <div className="text-center">
                        <h3 className="fw-bold mb-0">0</h3>
                        <small>Villages</small>
                      </div>
                      <div className="text-center">
                        <h3 className="fw-bold mb-0">24/7</h3>
                        <small>Support</small>
                      </div>
                      <div className="text-center">
                        <h3 className="fw-bold mb-0">100%</h3>
                        <small>Impact</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop" 
                      alt="Rural Development" 
                      className="img-fluid rounded shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Program Benefits Section */}
            <div className="py-5">
              <div className="container-fluid">
                <div className="text-center mb-5">
                  <h2 className="text-success fw-bold mb-3">Program Benefits</h2>
                  <p className="text-muted lead">Discover how our comprehensive approach transforms rural communities</p>
                </div>

                <div className="row g-4">
                  {/* Sustainable Agriculture */}
                  <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-img-top position-relative overflow-hidden" style={{ height: '250px' }}>
                        <img 
                          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop" 
                          alt="Sustainable Agriculture"
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-success bg-opacity-75 d-flex align-items-center justify-content-center">
                          <i className="bi bi-leaf-fill text-white display-1"></i>
                        </div>
                      </div>
                      <div className="card-body text-center p-4">
                        <h5 className="card-title text-success fw-bold mb-3">Sustainable Agriculture</h5>
                        <p className="card-text text-muted">
                          Empowering farmers with modern agricultural techniques, soil testing, and agro-mechanization tools for better crop yields and environmental sustainability.
                        </p>
                        <ul className="list-unstyled text-start">
                          <li><i className="bi bi-check-circle-fill text-success me-2"></i>Soil testing & analysis</li>
                          <li><i className="bi bi-check-circle-fill text-success me-2"></i>Modern farming equipment</li>
                          <li><i className="bi bi-check-circle-fill text-success me-2"></i>Organic farming practices</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Village Entrepreneurs */}
                  <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-img-top position-relative overflow-hidden" style={{ height: '250px' }}>
                        <img 
                          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop" 
                          alt="Village Entrepreneurs"
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-75 d-flex align-items-center justify-content-center">
                          <i className="bi bi-people-fill text-white display-1"></i>
                        </div>
                      </div>
                      <div className="card-body text-center p-4">
                        <h5 className="card-title text-primary fw-bold mb-3">Village Entrepreneurs</h5>
                        <p className="card-text text-muted">
                          Training Village Level Entrepreneurs (VLEs) to become community leaders with proper tools, skills, and resources for sustainable development.
                        </p>
                        <ul className="list-unstyled text-start">
                          <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Leadership training</li>
                          <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Business development</li>
                          <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Community networking</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Digital Transformation */}
                  <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                      <div className="card-img-top position-relative overflow-hidden" style={{ height: '250px' }}>
                        <img 
                          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" 
                          alt="Digital Transformation"
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning bg-opacity-75 d-flex align-items-center justify-content-center">
                          <i className="bi bi-laptop-fill text-white display-1"></i>
                        </div>
                      </div>
                      <div className="card-body text-center p-4">
                        <h5 className="card-title text-warning fw-bold mb-3">Digital Transformation</h5>
                        <p className="card-text text-muted">
                          Streamlining data collection, training, and reporting through digital platforms for better outcomes and efficient project management.
                        </p>
                        <ul className="list-unstyled text-start">
                          <li><i className="bi bi-check-circle-fill text-warning me-2"></i>Digital data collection</li>
                          <li><i className="bi bi-check-circle-fill text-warning me-2"></i>Online training modules</li>
                          <li><i className="bi bi-check-circle-fill text-warning me-2"></i>Real-time reporting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Stories Section */}
            <div className="bg-light py-5">
              <div className="container-fluid">
                <div className="text-center mb-5">
                  <h2 className="text-success fw-bold mb-3">Success Stories</h2>
                  <p className="text-muted lead">Real impact from our community development programs</p>
                </div>

                <div className="row g-4">
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center hover-zoom">
                      <img 
                        src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop" 
                        alt="Success Story 1"
                        className="img-fluid rounded shadow-sm mb-3"
                      />
                      <h6 className="fw-bold">Village Transformation</h6>
                      <p className="text-muted small">Complete digital transformation in rural communities</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center hover-zoom">
                      <img 
                        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop" 
                        alt="Success Story 2"
                        className="img-fluid rounded shadow-sm mb-3"
                      />
                      <h6 className="fw-bold">Agricultural Success</h6>
                      <p className="text-muted small">Improved crop yields through modern farming</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center hover-zoom">
                      <img 
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop" 
                        alt="Success Story 3"
                        className="img-fluid rounded shadow-sm mb-3"
                      />
                      <h6 className="fw-bold">Community Leadership</h6>
                      <p className="text-muted small">Empowering local leaders for sustainable growth</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="text-center hover-zoom">
                      <img 
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop" 
                        alt="Success Story 4"
                        className="img-fluid rounded shadow-sm mb-3"
                      />
                      <h6 className="fw-bold">Digital Empowerment</h6>
                      <p className="text-muted small">Bridging the digital divide in rural areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="py-5">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-lg-8 text-center">
                    <h3 className="text-success fw-bold mb-4">Ready to Make a Difference?</h3>
                    <p className="text-muted mb-4">Start managing your villages and track the impact of your community development programs.</p>
                    <div className="d-flex gap-3 justify-content-center">
                      <button 
                        onClick={() => setActiveView('villages')} 
                        className="btn btn-success btn-lg"
                      >
                        <i className="bi bi-geo-alt me-2"></i>View Villages
                      </button>
                      <button 
                        onClick={() => setActiveView('add-village')} 
                        className="btn btn-primary btn-lg"
                      >
                        <i className="bi bi-plus-circle me-2"></i>Add Village
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand text-white fw-bold" to="/">Reaching Roots</Link>
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              <i className="bi bi-person-circle me-1"></i>
              NGO Partner
            </span>
            <Link to="/" className="btn btn-outline-light btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <div className="bg-light border-end" style={{ width: '280px', minWidth: '280px' }}>
          <div className="p-3">
            <h6 className="text-success fw-bold mb-3">
              <i className="bi bi-gear me-2"></i>Dashboard Menu
            </h6>
            <div className="nav flex-column">
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'home' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('home')}
              >
                <i className="bi bi-house me-2"></i>
                Home
              </button>
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'villages' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('villages')}
              >
                <i className="bi bi-geo-alt me-2"></i>
                View Villages
              </button>
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'vles' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('vles')}
              >
                <i className="bi bi-person-lines-fill me-2"></i>
                View VLEs
              </button>
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'machinery' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('machinery')}
              >
                <i className="bi bi-gear-wide-connected me-2"></i>
                Find Nearby Machinery
              </button>
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'ai-analyzer' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('ai-analyzer')}
              >
                <i className="bi bi-bar-chart-line me-2"></i>
                AI Analyzer
              </button>
              <button
  className={`nav-link text-start border-0 rounded mb-2 ${
    activeView === 'machinery' ? 'bg-success text-white' : 'text-dark'
  }`}
  onClick={() => window.open('http://127.0.0.1:5000', '_blank')}
>
  <i className="bi bi-gear-wide-connected me-2"></i>
  Get Machinery Recommendations
</button>

              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'add-village' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('add-village')}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Village
              </button>
              <button
                className={`nav-link text-start border-0 rounded mb-2 ${
                  activeView === 'add-vle' ? 'bg-success text-white' : 'text-dark'
                }`}
                onClick={() => setActiveView('add-vle')}
              >
                <i className="bi bi-person-plus me-2"></i>
                Add VLE
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default NGODashboard; 