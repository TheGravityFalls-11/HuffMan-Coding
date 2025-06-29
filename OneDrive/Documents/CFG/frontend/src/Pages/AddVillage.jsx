import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddVillage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'upload'
  const [formData, setFormData] = useState({
    villageName: '',
    numberOfFarmers: '',
    majorCrops: '',
    WaterResources: '',
    averageLandperFarmer: '',
    PointOfContact1: '',
    PointOfContact2: '',
    VillageYouthClub: false,
    AcresPerCrop: '',
    SHGandFPOnames: '',
    nearbyVillages: '',
    availableMachines: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const processedData = {
        ...formData,
        SHGandFPOnames: formData.SHGandFPOnames.split(',').map(item => item.trim()).filter(item => item),
        WaterResources: formData.WaterResources.split(',').map(item => item.trim()).filter(item => item),
        majorCrops: formData.majorCrops.split(',').map(item => item.trim()).filter(item => item),
        availableMachines: formData.availableMachines.split(',').map(item => item.trim()).filter(item => item),
        numberOfFarmers: Number(formData.numberOfFarmers),
        AcresPerCrop: Number(formData.AcresPerCrop),
        averageLandperFarmer: Number(formData.averageLandperFarmer),
        nearbyVillages: formData.nearbyVillages ? Number(formData.nearbyVillages) : null,
      };
      console.log(processedData);
      const response = await fetch('http://localhost:8080/api/village', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to add village');
      }

      const result = await response.json();
      alert(result.message || 'Village added successfully!');
      setFormData({
        villageName: '',
        numberOfFarmers: '',
        majorCrops: '',
        WaterResources: '',
        averageLandperFarmer: '',
        PointOfContact1: '',
        PointOfContact2: '',
        VillageYouthClub: false,
        AcresPerCrop: '',
        SHGandFPOnames: '',
        nearbyVillages: '',
        availableMachines: ''
      });
      navigate('/ngo/dashboard');
    } catch (error) {
      console.error('Error adding village:', error);
      alert('Error adding village. Please try again. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }
    setLoading(true);
    try {
      const formDataImage = new FormData();
      formDataImage.append('villageImage', selectedImage);

      const response = await fetch('http://localhost:8080/api/village/upload', {
        method: 'POST',
        body: formDataImage,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      alert(result.message || 'Image uploaded successfully! Village data will be processed.');
      setSelectedImage(null);
      setImagePreview(null);
      navigate('/ngodashboard');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow-1">
      {/* Header */}
      <div className="bg-light py-4">
        <div className="container-fluid">
          <h1 className="text-success fw-bold mb-2">Add New Village</h1>
          <p className="text-muted mb-0">Register a new village with essential details</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="py-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <ul className="nav nav-tabs card-header-tabs" id="addVillageTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'manual' ? 'active' : ''}`}
                        id="manual-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('manual')}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Manual Form
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
                        id="upload-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('upload')}
                      >
                        <i className="bi bi-upload me-2"></i>
                        Upload Image To Fill
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-4">
                  {/* Manual Form Tab */}
                  {activeTab === 'manual' && (
                    <form onSubmit={handleManualSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="villageName" className="form-label fw-bold">Village Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="villageName"
                            value={formData.villageName}
                            onChange={handleChange}
                            placeholder="Enter village name"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="numberOfFarmers" className="form-label fw-bold">Number of Farmers *</label>
                          <input
                            type="number"
                            className="form-control"
                            id="numberOfFarmers"
                            value={formData.numberOfFarmers}
                            onChange={handleChange}
                            placeholder="Enter number of farmers"
                            min="1"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="majorCrops" className="form-label fw-bold">Major Crops</label>
                          <input
                            type="text"
                            className="form-control"
                            id="majorCrops"
                            value={formData.majorCrops}
                            onChange={handleChange}
                            placeholder="Enter major crops (comma separated)"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="WaterResources" className="form-label fw-bold">Water Resources *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="WaterResources"
                            value={formData.WaterResources}
                            onChange={handleChange}
                            placeholder="Enter water resources (comma separated)"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="averageLandperFarmer" className="form-label fw-bold">Average Land per Farmer (Acres) *</label>
                          <input
                            type="number"
                            className="form-control"
                            id="averageLandperFarmer"
                            value={formData.averageLandperFarmer}
                            onChange={handleChange}
                            placeholder="Enter average land per farmer"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="nearbyVillages" className="form-label fw-bold">Nearby Villages</label>
                          <input
                            type="number"
                            className="form-control"
                            id="nearbyVillages"
                            value={formData.nearbyVillages}
                            onChange={handleChange}
                            placeholder="Enter number of nearby villages"
                            min="0"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="AcresPerCrop" className="form-label fw-bold">Acres Per Crop *</label>
                          <input
                            type="number"
                            className="form-control"
                            id="AcresPerCrop"
                            value={formData.AcresPerCrop}
                            onChange={handleChange}
                            placeholder="Enter acres per crop"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="SHGandFPOnames" className="form-label fw-bold">SHG and FPO Names *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="SHGandFPOnames"
                            value={formData.SHGandFPOnames}
                            onChange={handleChange}
                            placeholder="Enter SHG and FPO names (comma separated)"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="availableMachines" className="form-label fw-bold">Available Machines</label>
                          <input
                            type="text"
                            className="form-control"
                            id="availableMachines"
                            value={formData.availableMachines}
                            onChange={handleChange}
                            placeholder="Enter available machines (comma separated)"
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="VillageYouthClub"
                              checked={formData.VillageYouthClub}
                              onChange={handleChange}
                            />
                            <label className="form-check-label fw-bold" htmlFor="VillageYouthClub">
                              Village Youth Club (Check if available)
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="PointOfContact1" className="form-label fw-bold">Point of Contact 1 *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="PointOfContact1"
                            value={formData.PointOfContact1}
                            onChange={handleChange}
                            placeholder="Enter first point of contact"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="PointOfContact2" className="form-label fw-bold">Point of Contact 2 *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="PointOfContact2"
                            value={formData.PointOfContact2}
                            onChange={handleChange}
                            placeholder="Enter second point of contact"
                            required
                          />
                        </div>
                        <div className="col-12 mt-4">
                          <div className="d-flex gap-3">
                            <button
                              type="submit"
                              className="btn btn-success btn-lg flex-grow-1"
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                  Adding Village...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-plus-circle me-2"></i>Add Village
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-lg"
                              onClick={() => {
                                setFormData({
                                  villageName: '',
                                  numberOfFarmers: '',
                                  majorCrops: '',
                                  WaterResources: '',
                                  averageLandperFarmer: '',
                                  PointOfContact1: '',
                                  PointOfContact2: '',
                                  VillageYouthClub: false,
                                  AcresPerCrop: '',
                                  SHGandFPOnames: '',
                                  nearbyVillages: '',
                                  availableMachines: ''
                                });
                              }}
                            >
                              Clear Form
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Image Upload Tab */}
                  {activeTab === 'upload' && (
                    <form onSubmit={handleImageSubmit}>
                      <div className="text-center">
                        <div className="mb-4">
                          <i className="bi bi-cloud-upload text-primary display-1"></i>
                          <h4 className="text-primary fw-bold mt-3">Upload Village Document</h4>
                          <p className="text-muted">Upload an image or document containing village information for automated processing</p>
                        </div>

                        <div className="mb-4">
                          <div className="upload-area border-2 border-dashed border-primary rounded p-5 bg-light">
                            <input
                              type="file"
                              id="villageImage"
                              className="d-none"
                              accept="image/*,.pdf,.doc,.docx"
                              onChange={handleImageUpload}
                            />
                            <label htmlFor="villageImage" className="cursor-pointer">
                              <div className="text-center">
                                <i className="bi bi-file-earmark-arrow-up text-primary display-4 mb-3"></i>
                                <h5 className="text-primary fw-bold">Choose File or Drag & Drop</h5>
                                <p className="text-muted mb-0">Supports: JPG, PNG, PDF, DOC, DOCX</p>
                                <p className="text-muted small">Maximum file size: 10MB</p>
                              </div>
                            </label>
                          </div>
                        </div>

                        {imagePreview && (
                          <div className="mb-4">
                            <h6 className="fw-bold mb-3">Preview:</h6>
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="img-fluid rounded shadow-sm"
                              style={{ maxHeight: '300px' }}
                            />
                          </div>
                        )}

                        <div className="d-flex gap-3 justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={loading || !selectedImage}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Processing...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-upload me-2"></i>Upload & Process
                              </>
                            )}
                          </button>
                          {selectedImage && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-lg"
                              onClick={() => {
                                setSelectedImage(null);
                                setImagePreview(null);
                              }}
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="mt-4 p-3 bg-light rounded">
                          <h6 className="fw-bold text-success mb-2">
                            <i className="bi bi-info-circle me-2"></i>How it works:
                          </h6>
                          <ul className="list-unstyled text-start">
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Upload a clear image or document</li>
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Our AI will extract village information</li>
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Review and confirm the extracted data</li>
                            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Village will be added to your network</li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddVillage;