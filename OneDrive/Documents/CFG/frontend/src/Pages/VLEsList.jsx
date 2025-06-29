import React, { useState, useEffect } from "react";
import { VLEStorage } from "../utils/dataStorage";

function VLEsList() {
  const [vles, setVLEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVLEId, setEditVLEId] = useState(null);
  const [stats, setStats] = useState({ totalVLEs: 0, sizeInKB: '0' });
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Load VLEs from localStorage on component mount
  useEffect(() => {
    loadVLEs();
  }, []);

  // Function to load VLEs
  const loadVLEs = () => {
    const storedVLEs = VLEStorage.getAllVLEs();
    setVLEs(storedVLEs);
    setStats(VLEStorage.getStats());
    setLastRefresh(new Date());
    console.log('VLEs loaded:', storedVLEs.length, 'items');
  };

  // Auto-refresh every 5 seconds to catch new additions
  useEffect(() => {
    const interval = setInterval(() => {
      const currentVLEs = VLEStorage.getAllVLEs();
      if (currentVLEs.length !== vles.length) {
        console.log('Auto-refresh: VLE count changed from', vles.length, 'to', currentVLEs.length);
        loadVLEs();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [vles.length]);

  const filteredVLEs = vles.filter((vle) =>
    vle.VLEname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vle.villageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vleId) => {
    setEditVLEId(vleId);
  };

  const handleEditSubmit = (updatedVLE) => {
    if (VLEStorage.updateVLE(updatedVLE._id, updatedVLE)) {
      loadVLEs();
      setEditVLEId(null);
    }
  };

  const handleDelete = (vleId) => {
    if (window.confirm("Are you sure you want to delete this VLE?")) {
      if (VLEStorage.deleteVLE(vleId)) {
        loadVLEs();
      }
    }
  };

  const handleExport = () => {
    if (VLEStorage.exportData()) {
      alert('VLE data exported successfully!');
    } else {
      alert('Error exporting data. Please try again.');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      VLEStorage.importData(file)
        .then((count) => {
          loadVLEs();
          alert(`Successfully imported ${count} VLEs!`);
        })
        .catch((error) => {
          alert(`Import failed: ${error.message}`);
        });
    }
  };

  return (
    <div className="flex-grow-1">
      {/* Header */}
      <div className="bg-light py-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="text-success fw-bold mb-2">Village Level Entrepreneurs (VLEs)</h1>
              <p className="text-muted mb-0">Manage and view all VLEs in your network</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search VLEs by name or village..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Storage Info */}
      <div className="container-fluid">
        <div className="alert alert-info mb-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Data Source:</strong> VLE data is stored in your browser's local storage. 
              Total VLEs: <strong>{stats.totalVLEs}</strong> | 
              Storage Size: <strong>{stats.sizeInKB} KB</strong>
            </div>
            <div className="col-md-6 text-end">
              <small className="text-muted me-3">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </small>
              <button 
                className="btn btn-outline-success btn-sm me-2"
                onClick={loadVLEs}
                title="Refresh VLE data"
              >
                <i className="bi bi-arrow-clockwise me-1"></i>Refresh
              </button>
              <button 
                className="btn btn-outline-primary btn-sm me-2"
                onClick={handleExport}
              >
                <i className="bi bi-download me-1"></i>Export
              </button>
              <label className="btn btn-outline-secondary btn-sm mb-0">
                <i className="bi bi-upload me-1"></i>Import
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleImport} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* VLEs List */}
      <div className="py-5">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Total VLEs: {filteredVLEs.length}</h5>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    console.log('VLEs Data:', vles);
                    alert(`VLEs data logged to console. Total: ${vles.length}`);
                  }}
                >
                  <i className="bi bi-code me-1"></i>View in Console
                </button>
              </div>
            </div>
          </div>

          {filteredVLEs.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-person-x text-muted display-1"></i>
              <h4 className="text-muted mt-3">No VLEs found</h4>
              <p className="text-muted mb-4">Start by adding your first VLE to the network</p>
              <button 
                className="btn btn-success"
                onClick={() => window.location.href = '/add-vle'}
              >
                <i className="bi bi-plus-circle me-2"></i>Add Your First VLE
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredVLEs.map((vle) => (
                <div key={vle._id} className="col-lg-6 col-xl-4">
                  <div className="card h-100 shadow-sm">
                    {editVLEId === vle._id ? (
                      <div className="card-body">
                        <EditVLEForm
                          vle={vle}
                          onSubmit={handleEditSubmit}
                          onCancel={() => setEditVLEId(null)}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="card-body">
                          <h5 className="card-title text-success fw-bold mb-3">{vle.VLEname}</h5>
                          <div className="row g-3">
                            <div className="col-6">
                              <small className="text-muted d-block">Village</small>
                              <strong>{vle.villageName}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Date of Training</small>
                              <strong>{vle.DateOfTraining}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Modules Completed</small>
                              <strong>{vle.trainingModulesCompleted}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Onboarding Date</small>
                              <strong>{vle.onboardingDate}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Agreement Signed</small>
                              <strong>{vle.agreementSignedDate}</strong>
                            </div>
                            {vle.createdAt && (
                              <div className="col-6">
                                <small className="text-muted d-block">Created</small>
                                <strong>{new Date(vle.createdAt).toLocaleDateString()}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="card-footer bg-transparent">
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(vle._id)}
                            >
                              <i className="bi bi-pencil me-1"></i>Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(vle._id)}
                            >
                              <i className="bi bi-trash me-1"></i>Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditVLEForm({ vle, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...vle });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit({ ...form });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">VLE Name</label>
          <input type="text" className="form-control" name="VLEname" value={form.VLEname} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Village</label>
          <input type="text" className="form-control" name="villageName" value={form.villageName} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Date of Training</label>
          <input type="date" className="form-control" name="DateOfTraining" value={form.DateOfTraining} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Training Modules Completed</label>
          <input type="text" className="form-control" name="trainingModulesCompleted" value={form.trainingModulesCompleted} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Onboarding Date</label>
          <input type="date" className="form-control" name="onboardingDate" value={form.onboardingDate} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Agreement Signed Date</label>
          <input type="date" className="form-control" name="agreementSignedDate" value={form.agreementSignedDate} onChange={handleChange} required />
        </div>
        <div className="col-12 mt-4 d-flex gap-3">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default VLEsList; 