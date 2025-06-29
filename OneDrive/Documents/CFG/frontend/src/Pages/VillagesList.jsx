                                                                                                                                                                                         import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VillagesList() {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect( () => {
    // Simulate API call
    async function fetchVillages(){

           const respose = await fetch("http://localhost:8080/api/village/get");
       
           console.log(respose);
           const village= await respose.json();
           console.log(village);
    setVillages(village.info);
    setLoading(false);
    }

    fetchVillages();
  }, []);

//   const villages = villages.filter(village =>
//     village.villageName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  if (loading) {
    return (
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading villages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow-1">
      {/* Header */}
      <div className="bg-light py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="text-success fw-bold mb-2">Villages</h1>
              <p className="text-muted mb-0">Manage and view all villages in your network</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search villages by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Villages List */}
      <div className="py-5">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Total Villages: {villages.length}</h5>
              </div>
            </div>
          </div>

          {villages.length > 0 ? (
            <div className="row g-4">
              {villages.map((village) => (
                <div key={village._id} className="col-lg-6 col-xl-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-success fw-bold mb-3">{village.villageName}</h5>
                      <div className="row g-3">
                        <div className="col-6">
                          <small className="text-muted d-block">Total Land</small>
                          <strong>{village.totalLand} acres</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Households</small>
                          <strong>{village.numberOfHouseholds}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Farmers</small>
                          <strong>{village.numberOfFarmers}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Avg Land/Farmer</small>
                          <strong>{village.averageLandperFarmer} acres</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Acres Per Crop</small>
                          <strong>{village.AcresPerCrop}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Price Per Acre</small>
                          <strong>₹{village.averagePricePerAcre}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Contact 1</small>
                          <strong className="text-truncate d-block">{village.PointOfContact1}</strong>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Youth Club</small>
                          <strong>{village.VillageYouthClub ? 'Yes' : 'No'}</strong>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Major Crops</small>
                          <p className="mb-0 text-truncate">
                            {village.majorCrops && village.majorCrops.length > 0 
                              ? village.majorCrops.join(', ') 
                              : 'Not specified'}
                          </p>
                        </div>
                        <div className="col-12">
                          <small className="text-muted d-block">Water Resources</small>
                          <p className="mb-0 text-truncate">
                            {village.WaterResources && village.WaterResources.length > 0 
                              ? village.WaterResources.join(', ') 
                              : 'Not specified'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-success btn-sm">
                          <i className="bi bi-eye me-1"></i>View Details
                        </button>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-pencil me-1"></i>Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) :  (
            <div className="text-center py-5">
              <i className="bi bi-geo-alt text-muted display-1"></i>
              <h4 className="text-muted mt-3">No villages found</h4>
              <p className="text-muted mb-4">Start by adding your first village to the network</p>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}

export default VillagesList;