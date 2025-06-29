// Data Storage Utilities for VLE Management

export const VLEStorage = {
  // Get all VLEs from localStorage
  getAllVLEs: () => {
    try {
      return JSON.parse(localStorage.getItem('vles') || '[]');
    } catch (error) {
      console.error('Error reading VLEs from localStorage:', error);
      return [];
    }
  },

  // Save VLEs to localStorage
  saveVLEs: (vles) => {
    try {
      localStorage.setItem('vles', JSON.stringify(vles));
      return true;
    } catch (error) {
      console.error('Error saving VLEs to localStorage:', error);
      return false;
    }
  },

  // Add a new VLE
  addVLE: (vleData) => {
    try {
      const existingVLEs = VLEStorage.getAllVLEs();
      const newVLE = {
        _id: Date.now().toString(),
        ...vleData,
        createdAt: new Date().toISOString()
      };
      const updatedVLEs = [...existingVLEs, newVLE];
      VLEStorage.saveVLEs(updatedVLEs);
      return newVLE;
    } catch (error) {
      console.error('Error adding VLE:', error);
      return null;
    }
  },

  // Update an existing VLE
  updateVLE: (vleId, updatedData) => {
    try {
      const existingVLEs = VLEStorage.getAllVLEs();
      const updatedVLEs = existingVLEs.map(vle => 
        vle._id === vleId ? { ...vle, ...updatedData, updatedAt: new Date().toISOString() } : vle
      );
      VLEStorage.saveVLEs(updatedVLEs);
      return true;
    } catch (error) {
      console.error('Error updating VLE:', error);
      return false;
    }
  },

  // Delete a VLE
  deleteVLE: (vleId) => {
    try {
      const existingVLEs = VLEStorage.getAllVLEs();
      const updatedVLEs = existingVLEs.filter(vle => vle._id !== vleId);
      VLEStorage.saveVLEs(updatedVLEs);
      return true;
    } catch (error) {
      console.error('Error deleting VLE:', error);
      return false;
    }
  },

  // Export VLE data as JSON file
  exportData: () => {
    try {
      const vles = VLEStorage.getAllVLEs();
      const dataStr = JSON.stringify(vles, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vles-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  },

  // Import VLE data from JSON file
  importData: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            VLEStorage.saveVLEs(importedData);
            resolve(importedData.length);
          } else {
            reject(new Error('Invalid data format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsText(file);
    });
  },

  // Clear all VLE data
  clearAllData: () => {
    try {
      localStorage.removeItem('vles');
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },

  // Get storage statistics
  getStats: () => {
    try {
      const vles = VLEStorage.getAllVLEs();
      const totalSize = new Blob([JSON.stringify(vles)]).size;
      return {
        totalVLEs: vles.length,
        totalSize: totalSize,
        sizeInKB: (totalSize / 1024).toFixed(2),
        lastUpdated: vles.length > 0 ? new Date(Math.max(...vles.map(v => new Date(v.createdAt || v.updatedAt || 0)))) : null
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { totalVLEs: 0, totalSize: 0, sizeInKB: '0', lastUpdated: null };
    }
  }
};

// Village Storage Utilities (for consistency)
export const VillageStorage = {
  getAllVillages: () => {
    try {
      return JSON.parse(localStorage.getItem('villages') || '[]');
    } catch (error) {
      console.error('Error reading villages from localStorage:', error);
      return [];
    }
  },

  saveVillages: (villages) => {
    try {
      localStorage.setItem('villages', JSON.stringify(villages));
      return true;
    } catch (error) {
      console.error('Error saving villages to localStorage:', error);
      return false;
    }
  },

  addVillage: (villageData) => {
    try {
      const existingVillages = VillageStorage.getAllVillages();
      const newVillage = {
        _id: Date.now().toString(),
        ...villageData,
        createdAt: new Date().toISOString()
      };
      const updatedVillages = [...existingVillages, newVillage];
      VillageStorage.saveVillages(updatedVillages);
      return newVillage;
    } catch (error) {
      console.error('Error adding village:', error);
      return null;
    }
  }
};

export default {
  VLEStorage,
  VillageStorage
}; 