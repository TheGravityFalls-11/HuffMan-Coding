import React, { useState } from "react";
import { VLEStorage } from "../utils/dataStorage";

const mockVillages = [
  { _id: "1", name: "Village A" },
  { _id: "2", name: "Village B" },
  { _id: "3", name: "Village C" },
];

function AddVLE() {
  const [form, setForm] = useState({
    VLEname: "",
    villageName: "",
    DateOfTraining: "",
    trainingModulesCompleted: "",
    onboardingDate: "",
    agreementSignedDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [lastAddedVLE, setLastAddedVLE] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Submitting VLE form:', form);
      
      // Use VLEStorage utility to add VLE
      const newVLE = VLEStorage.addVLE(form);
      
      if (newVLE) {
        console.log('VLE added successfully:', newVLE);
        
        // Verify data was saved
        const allVLEs = VLEStorage.getAllVLEs();
        console.log('All VLEs after adding:', allVLEs);
        
        // Store the last added VLE for display
        setLastAddedVLE(newVLE);
        
        // Show success message with details
        alert(`✅ VLE "${newVLE.VLEname}" added successfully!\n\n📊 Details:\n• Village: ${newVLE.villageName}\n• Training Date: ${newVLE.DateOfTraining}\n• Total VLEs now: ${allVLEs.length}\n\n💾 Data saved to local storage. You can view it in the VLEs List.`);
        
        // Reset form
        setForm({
          VLEname: "",
          villageName: "",
          DateOfTraining: "",
          trainingModulesCompleted: "",
          onboardingDate: "",
          agreementSignedDate: "",
        });
      } else {
        throw new Error('Failed to add VLE');
      }
      
    } catch (error) {
      console.error('Error saving VLE:', error);
      alert("❌ Error saving VLE data. Please try again.\n\nError: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold mb-0">Add Village Level Entrepreneur (VLE)</h2>
        <button 
          className="btn btn-outline-success"
          onClick={() => window.location.href = '/vles-list'}
        >
          <i className="bi bi-list me-2"></i>View VLEs List
        </button>
      </div>
      
      {/* Data Storage Info */}
      <div className="alert alert-info mb-4">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Data Storage:</strong> VLE data is saved to your browser's local storage. 
        This data will persist even after closing the browser.
      </div>
      
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">VLE Name</label>
          <input type="text" className="form-control" name="VLEname" value={form.VLEname} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Village</label>
          <select className="form-select" name="villageName" value={form.villageName} onChange={handleChange} required>
            <option value="">Select Village</option>
            {mockVillages.map((v) => (
              <option key={v._id} value={v.name}>{v.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Date of Training</label>
          <input type="date" className="form-control" name="DateOfTraining" value={form.DateOfTraining} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Training Modules Completed</label>
          <input type="text" className="form-control" name="trainingModulesCompleted" value={form.trainingModulesCompleted} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Onboarding Date</label>
          <input type="date" className="form-control" name="onboardingDate" value={form.onboardingDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Agreement Signed Date</label>
          <input type="date" className="form-control" name="agreementSignedDate" value={form.agreementSignedDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Adding..." : "Add VLE"}
        </button>
      </form>
      
      {/* Last Added VLE Display */}
      {lastAddedVLE && (
        <div className="card mt-4 p-4 shadow-sm border-success">
          <h5 className="text-success mb-3">
            <i className="bi bi-check-circle me-2"></i>Last Added VLE
          </h5>
          <div className="row">
            <div className="col-md-6">
              <strong>Name:</strong> {lastAddedVLE.VLEname}
            </div>
            <div className="col-md-6">
              <strong>Village:</strong> {lastAddedVLE.villageName}
            </div>
            <div className="col-md-6">
              <strong>Training Date:</strong> {lastAddedVLE.DateOfTraining}
            </div>
            <div className="col-md-6">
              <strong>Created:</strong> {new Date(lastAddedVLE.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="mt-3">
            <button 
              className="btn btn-outline-success me-2"
              onClick={() => window.location.href = '/vles-list'}
            >
              <i className="bi bi-list me-2"></i>View All VLEs
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setLastAddedVLE(null)}
            >
              <i className="bi bi-plus-circle me-2"></i>Add Another VLE
            </button>
          </div>
        </div>
      )}
      
      {/* Data Management Section */}
      <div className="card mt-4 p-4 shadow-sm">
        <h5 className="text-primary mb-3">Data Management</h5>
        <div className="row">
          <div className="col-md-4">
            <button 
              className="btn btn-outline-primary w-100 mb-2"
              onClick={() => {
                const vles = VLEStorage.getAllVLEs();
                const stats = VLEStorage.getStats();
                alert(`Total VLEs stored: ${vles.length}\nStorage Size: ${stats.sizeInKB} KB\n\nVLEs:\n${vles.map(v => `- ${v.VLEname} (${v.villageName})`).join('\n')}`);
              }}
            >
              <i className="bi bi-info-circle me-2"></i>Check Stored Data
            </button>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-outline-secondary w-100 mb-2"
              onClick={() => {
                const vles = VLEStorage.getAllVLEs();
                console.log('All VLEs in localStorage:', vles);
                alert('VLE data logged to console. Check browser developer tools.');
              }}
            >
              <i className="bi bi-code me-2"></i>Log to Console
            </button>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-outline-danger w-100 mb-2"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all VLE data? This cannot be undone.')) {
                  VLEStorage.clearAllData();
                  setLastAddedVLE(null);
                  alert('All VLE data has been cleared.');
                }
              }}
            >
              <i className="bi bi-trash me-2"></i>Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVLE; 