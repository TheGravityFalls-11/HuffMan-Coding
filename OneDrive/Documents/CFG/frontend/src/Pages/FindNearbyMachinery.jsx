import React, { useState, useEffect } from 'react';

const FindNearbyMachinery = () => {
  // State variables
  const [userLocation, setUserLocation] = useState(null);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('🔍 Searching for agricultural machinery dealers...');
  const [error, setError] = useState('');
  const [locationSearchInput, setLocationSearchInput] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [machineryType, setMachineryType] = useState('');
  const [maxDistance, setMaxDistance] = useState('10');
  const [sortBy, setSortBy] = useState('distance');
  const [locationInfo, setLocationInfo] = useState('');
  const [currentLocationDisplay, setCurrentLocationDisplay] = useState('');
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const [showCurrentLocationDisplay, setShowCurrentLocationDisplay] = useState(false);

  // Major Indian cities with coordinates for location search
  const indianCities = [
    { name: "Mumbai, Maharashtra", lat: 19.0760, lng: 72.8777 },
    { name: "Delhi, Delhi", lat: 28.6139, lng: 77.2090 },
    { name: "Bangalore, Karnataka", lat: 12.9716, lng: 77.5946 },
    { name: "Hyderabad, Telangana", lat: 17.3850, lng: 78.4867 },
    { name: "Ahmedabad, Gujarat", lat: 23.0225, lng: 72.5714 },
    { name: "Chennai, Tamil Nadu", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639 },
    { name: "Pune, Maharashtra", lat: 18.5204, lng: 73.8567 },
    { name: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873 },
    { name: "Surat, Gujarat", lat: 21.1702, lng: 72.8311 },
    { name: "Lucknow, Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
    { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
    { name: "Nagpur, Maharashtra", lat: 21.1458, lng: 79.0882 },
    { name: "Indore, Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
    { name: "Thane, Maharashtra", lat: 19.2183, lng: 72.9781 },
    { name: "Bhopal, Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
    { name: "Visakhapatnam, Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
    { name: "Pimpri-Chinchwad, Maharashtra", lat: 18.6298, lng: 73.7997 },
    { name: "Patna, Bihar", lat: 25.5941, lng: 85.1376 },
    { name: "Vadodara, Gujarat", lat: 22.3072, lng: 73.1812 },
    { name: "Ludhiana, Punjab", lat: 30.9010, lng: 75.8573 },
    { name: "Agra, Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
    { name: "Nashik, Maharashtra", lat: 19.9975, lng: 73.7898 },
    { name: "Faridabad, Haryana", lat: 28.4089, lng: 77.3178 },
    { name: "Meerut, Uttar Pradesh", lat: 28.9845, lng: 77.7064 },
    { name: "Rajkot, Gujarat", lat: 22.3039, lng: 70.8022 },
    { name: "Kalyan-Dombivli, Maharashtra", lat: 19.2403, lng: 73.1305 },
    { name: "Vasai-Virar, Maharashtra", lat: 19.4912, lng: 72.8054 },
    { name: "Varanasi, Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
    { name: "Srinagar, Jammu and Kashmir", lat: 34.0837, lng: 74.7973 },
    { name: "Aurangabad, Maharashtra", lat: 19.8762, lng: 75.3433 },
    { name: "Dhanbad, Jharkhand", lat: 23.7957, lng: 86.4304 },
    { name: "Amritsar, Punjab", lat: 31.6340, lng: 74.8723 },
    { name: "Navi Mumbai, Maharashtra", lat: 19.0330, lng: 73.0297 },
    { name: "Allahabad, Uttar Pradesh", lat: 25.4358, lng: 81.8463 },
    { name: "Ranchi, Jharkhand", lat: 23.3441, lng: 85.3096 },
    { name: "Howrah, West Bengal", lat: 22.5958, lng: 88.2636 },
    { name: "Coimbatore, Tamil Nadu", lat: 11.0168, lng: 76.9558 },
    { name: "Jabalpur, Madhya Pradesh", lat: 23.1815, lng: 79.9864 },
    { name: "Gwalior, Madhya Pradesh", lat: 26.2183, lng: 78.1828 },
    { name: "Vijayawada, Andhra Pradesh", lat: 16.5062, lng: 80.6480 },
    { name: "Jodhpur, Rajasthan", lat: 26.2389, lng: 73.0243 },
    { name: "Madurai, Tamil Nadu", lat: 9.9252, lng: 78.1198 },
    { name: "Raipur, Chhattisgarh", lat: 21.2514, lng: 81.6296 },
    { name: "Kota, Rajasthan", lat: 25.2138, lng: 75.8648 },
    { name: "Chandigarh, Chandigarh", lat: 30.7333, lng: 76.7794 },
    { name: "Guwahati, Assam", lat: 26.1445, lng: 91.7362 },
    { name: "Solapur, Maharashtra", lat: 17.6599, lng: 75.9064 },
    { name: "Hubli-Dharwad, Karnataka", lat: 15.3647, lng: 75.1240 },
    { name: "Bareilly, Uttar Pradesh", lat: 28.3670, lng: 79.4304 },
    { name: "Moradabad, Uttar Pradesh", lat: 28.8386, lng: 78.7733 },
    { name: "Mysore, Karnataka", lat: 12.2958, lng: 76.6394 },
    { name: "Gurgaon, Haryana", lat: 28.4595, lng: 77.0266 },
    { name: "Aligarh, Uttar Pradesh", lat: 27.8974, lng: 78.0880 },
    { name: "Jalandhar, Punjab", lat: 31.3260, lng: 75.5762 },
    { name: "Tiruchirappalli, Tamil Nadu", lat: 10.7905, lng: 78.7047 },
    { name: "Bhubaneswar, Odisha", lat: 20.2961, lng: 85.8245 },
    { name: "Salem, Tamil Nadu", lat: 11.6643, lng: 78.1460 },
    { name: "Warangal, Telangana", lat: 17.9689, lng: 79.5941 },
    { name: "Mira-Bhayandar, Maharashtra", lat: 19.2952, lng: 72.8544 },
    { name: "Thiruvananthapuram, Kerala", lat: 8.5241, lng: 76.9366 },
    { name: "Bhiwandi, Maharashtra", lat: 19.3002, lng: 73.0635 },
    { name: "Saharanpur, Uttar Pradesh", lat: 29.9680, lng: 77.5552 },
    { name: "Guntur, Andhra Pradesh", lat: 16.3067, lng: 80.4365 },
    { name: "Amravati, Maharashtra", lat: 20.9374, lng: 77.7796 },
    { name: "Bikaner, Rajasthan", lat: 28.0229, lng: 73.3119 },
    { name: "Noida, Uttar Pradesh", lat: 28.5355, lng: 77.3910 },
    { name: "Jamshedpur, Jharkhand", lat: 22.8046, lng: 86.2029 },
    { name: "Bhilai Nagar, Chhattisgarh", lat: 21.1938, lng: 81.3509 },
    { name: "Cuttack, Odisha", lat: 20.4625, lng: 85.8828 },
    { name: "Firozabad, Uttar Pradesh", lat: 27.1592, lng: 78.3957 },
    { name: "Kochi, Kerala", lat: 9.9312, lng: 76.2673 },
    { name: "Bhavnagar, Gujarat", lat: 21.7645, lng: 72.1519 },
    { name: "Dehradun, Uttarakhand", lat: 30.3165, lng: 78.0322 },
    { name: "Durgapur, West Bengal", lat: 23.4800, lng: 87.3119 },
    { name: "Asansol, West Bengal", lat: 23.6739, lng: 86.9524 },
    { name: "Nanded-Waghala, Maharashtra", lat: 19.1383, lng: 77.2975 },
    { name: "Kolhapur, Maharashtra", lat: 16.7050, lng: 74.2433 },
    { name: "Ajmer, Rajasthan", lat: 26.4499, lng: 74.6399 },
    { name: "Gulbarga, Karnataka", lat: 17.3297, lng: 76.8343 },
    { name: "Jamnagar, Gujarat", lat: 22.4707, lng: 70.0577 },
    { name: "Ujjain, Madhya Pradesh", lat: 23.1765, lng: 75.7885 },
    { name: "Loni, Uttar Pradesh", lat: 28.7333, lng: 77.2833 },
    { name: "Siliguri, West Bengal", lat: 26.7271, lng: 88.3953 },
    { name: "Jhansi, Uttar Pradesh", lat: 25.4484, lng: 78.5685 },
    { name: "Ulhasnagar, Maharashtra", lat: 19.2215, lng: 73.1645 },
    { name: "Jammu, Jammu and Kashmir", lat: 32.7266, lng: 74.8570 },
    { name: "Sangli-Miraj & Kupwad, Maharashtra", lat: 16.8524, lng: 74.5815 },
    { name: "Mangalore, Karnataka", lat: 12.9141, lng: 74.8560 },
    { name: "Erode, Tamil Nadu", lat: 11.3410, lng: 77.7172 },
    { name: "Belgaum, Karnataka", lat: 15.8497, lng: 74.4977 },
    { name: "Ambattur, Tamil Nadu", lat: 13.1143, lng: 80.1548 },
    { name: "Tirunelveli, Tamil Nadu", lat: 8.7139, lng: 77.7567 },
    { name: "Malegaon, Maharashtra", lat: 20.5579, lng: 74.5287 },
    { name: "Gaya, Bihar", lat: 24.7914, lng: 85.0002 },
    { name: "Jalgaon, Maharashtra", lat: 21.0077, lng: 75.5626 },
    { name: "Udaipur, Rajasthan", lat: 24.5854, lng: 73.7125 },
    { name: "Maheshtala, West Bengal", lat: 22.5049, lng: 88.2482 }
  ];

  // Agricultural machinery dealers database
  const machineryDealers = [
    // Delhi Region
    { id: 1, name: "Green Valley Tractor Center", specialty: "Tractor Specialist", lat: 28.6139, lng: 77.2090, address: "123 Farm Equipment Road, Agricultural District, Delhi", phone: "+91-9876543210", rating: 4.8, machinery: ["tractor", "plow", "cultivator", "loader", "trailer"], machineryNames: ["John Deere Tractors", "Mahindra Tractors", "Heavy Duty Plows", "Disc Cultivators", "Front End Loaders"], description: "Authorized dealer for premium tractor brands" },
    { id: 2, name: "Harvest Pro Equipment", specialty: "Harvesting Solutions", lat: 28.6129, lng: 77.2295, address: "456 Harvest Street, Machinery Hub, Delhi", phone: "+91-9876543211", rating: 4.6, machinery: ["harvester", "thresher", "mower", "seeder"], machineryNames: ["Combine Harvesters", "Wheat Threshers", "Rotary Mowers", "Precision Seeders"], description: "Complete harvesting and post-harvest machinery" },
    
    // Mumbai Region
    { id: 3, name: "Maharashtra Farm Solutions", specialty: "Complete Farm Equipment", lat: 19.0760, lng: 72.8777, address: "789 Agricultural Road, Andheri, Mumbai", phone: "+91-9876543212", rating: 4.7, machinery: ["tractor", "sprinkler", "pump", "seeder"], machineryNames: ["Swaraj Tractors", "Rain Gun Sprinklers", "Submersible Pumps", "Multi-Crop Seeders"], description: "Leading farm equipment supplier in Maharashtra" },
    { id: 4, name: "Western Irrigation Systems", specialty: "Irrigation Specialist", lat: 19.0659, lng: 72.8295, address: "321 Water Management Street, Bandra, Mumbai", phone: "+91-9876543213", rating: 4.9, machinery: ["sprinkler", "pump", "irrigation"], machineryNames: ["Center Pivot Sprinklers", "Drip Irrigation Systems", "Solar Pumps", "Micro Sprinklers"], description: "Advanced irrigation solutions for modern farming" },
    
    // Bangalore Region
    { id: 5, name: "Karnataka Agri Tech", specialty: "Modern Farm Technology", lat: 12.9716, lng: 77.5946, address: "654 Tech Park Road, Electronic City, Bangalore", phone: "+91-9876543214", rating: 4.8, machinery: ["tractor", "harvester", "seeder", "mower"], machineryNames: ["Smart Tractors", "Mini Combines", "Pneumatic Seeders", "Brush Cutters"], description: "Technology-driven agricultural solutions" },
    { id: 6, name: "South India Machinery", specialty: "Multi-Brand Dealer", lat: 12.9616, lng: 77.5846, address: "987 Machinery Avenue, Whitefield, Bangalore", phone: "+91-9876543215", rating: 4.5, machinery: ["tractor", "plow", "thresher", "loader"], machineryNames: ["Escorts Tractors", "Reversible Plows", "Paddy Threshers", "Backhoe Loaders"], description: "Comprehensive agricultural machinery solutions" },
    
    // Chennai Region
    { id: 7, name: "Tamil Nadu Farm Equipment", specialty: "Regional Specialist", lat: 13.0827, lng: 80.2707, address: "147 Agricultural Complex, T. Nagar, Chennai", phone: "+91-9876543216", rating: 4.6, machinery: ["tractor", "harvester", "pump", "trailer"], machineryNames: ["TAFE Tractors", "Rice Harvesters", "Centrifugal Pumps", "Tractor Trailers"], description: "Serving Tamil Nadu farmers for over 20 years" },
    { id: 8, name: "Coastal Irrigation Solutions", specialty: "Water Management", lat: 13.0727, lng: 80.2607, address: "258 Coastal Road, Marina, Chennai", phone: "+91-9876543217", rating: 4.7, machinery: ["sprinkler", "pump", "irrigation"], machineryNames: ["Sprinkler Systems", "Bore Well Pumps", "Drip Kits", "Water Controllers"], description: "Specialized in coastal area irrigation" },
    
    // Hyderabad Region
    { id: 9, name: "Telangana Agri Solutions", specialty: "Complete Solutions", lat: 17.3850, lng: 78.4867, address: "369 HITEC City, Madhapur, Hyderabad", phone: "+91-9876543218", rating: 4.8, machinery: ["tractor", "seeder", "sprinkler", "harvester"], machineryNames: ["Sonalika Tractors", "Cotton Seeders", "Boom Sprayers", "Cotton Pickers"], description: "Specialized in cotton and rice farming equipment" },
    { id: 10, name: "Deccan Farm Machinery", specialty: "Traditional & Modern", lat: 17.3750, lng: 78.4767, address: "741 Secunderabad Road, Hyderabad", phone: "+91-9876543219", rating: 4.4, machinery: ["tractor", "plow", "thresher", "mower"], machineryNames: ["Farmtrac Tractors", "Disc Plows", "Multi-Crop Threshers", "Slasher Mowers"], description: "Bridging traditional and modern farming" },
    
    // Pune Region
    { id: 11, name: "Pune Agricultural Hub", specialty: "Sugar Belt Specialist", lat: 18.5204, lng: 73.8567, address: "852 Pune-Nashik Highway, Pune", phone: "+91-9876543220", rating: 4.7, machinery: ["tractor", "harvester", "loader", "trailer"], machineryNames: ["New Holland Tractors", "Sugarcane Harvesters", "Wheel Loaders", "High Capacity Trailers"], description: "Specialized in sugarcane farming equipment" },
    { id: 12, name: "Western Ghats Farm Tech", specialty: "Hill Farming", lat: 18.5104, lng: 73.8467, address: "963 Hill Station Road, Lonavala, Pune", phone: "+91-9876543221", rating: 4.6, machinery: ["tractor", "mower", "sprinkler", "pump"], machineryNames: ["Compact Hill Tractors", "Slope Mowers", "Portable Sprinklers", "High Pressure Pumps"], description: "Equipment for hill and slope farming" },
    
    // Ahmedabad Region
    { id: 13, name: "Gujarat Agri Machinery", specialty: "Cotton & Groundnut", lat: 23.0225, lng: 72.5714, address: "159 Sarkhej Road, Ahmedabad", phone: "+91-9876543222", rating: 4.8, machinery: ["tractor", "seeder", "harvester", "thresher"], machineryNames: ["Captain Tractors", "Cotton Planters", "Groundnut Harvesters", "Groundnut Threshers"], description: "Gujarat's leading agricultural machinery dealer" },
    { id: 14, name: "Saurashtra Farm Solutions", specialty: "Irrigation Focus", lat: 23.0125, lng: 72.5614, address: "357 Satellite Road, Ahmedabad", phone: "+91-9876543223", rating: 4.5, machinery: ["sprinkler", "pump", "irrigation", "tractor"], machineryNames: ["Pivot Irrigation", "Solar Pump Sets", "Drip Systems", "Utility Tractors"], description: "Water-efficient farming solutions" },
    
    // Kolkata Region
    { id: 15, name: "Bengal Farm Equipment", specialty: "Rice Farming", lat: 22.5726, lng: 88.3639, address: "753 Jessore Road, Kolkata", phone: "+91-9876543224", rating: 4.6, machinery: ["tractor", "harvester", "seeder", "pump"], machineryNames: ["VST Tillers", "Rice Transplanters", "Paddy Seeders", "Shallow Tube Wells"], description: "Specialized in rice cultivation machinery" },
    { id: 16, name: "Eastern Agri Tech", specialty: "Multi-Crop Solutions", lat: 22.5626, lng: 88.3539, address: "951 Salt Lake City, Kolkata", phone: "+91-9876543225", rating: 4.4, machinery: ["tractor", "plow", "thresher", "mower"], machineryNames: ["Powertrac Tractors", "Rotary Tillers", "Paddy Threshers", "Reaper Mowers"], description: "Comprehensive farming solutions for Eastern India" },
    
    // Jaipur Region
    { id: 17, name: "Rajasthan Desert Farming", specialty: "Arid Zone Specialist", lat: 26.9124, lng: 75.7873, address: "147 Tonk Road, Jaipur", phone: "+91-9876543226", rating: 4.7, machinery: ["tractor", "sprinkler", "pump", "seeder"], machineryNames: ["Desert King Tractors", "Desert Sprinklers", "Deep Well Pumps", "Drought Resistant Seeders"], description: "Specialized equipment for arid zone farming" },
    { id: 18, name: "Pink City Agri Solutions", specialty: "Water Conservation", lat: 26.9024, lng: 75.7773, address: "258 Ajmer Road, Jaipur", phone: "+91-9876543227", rating: 4.5, machinery: ["sprinkler", "pump", "irrigation", "tractor"], machineryNames: ["Water Saving Sprinklers", "Solar Pumps", "Micro Irrigation", "Compact Tractors"], description: "Focus on water conservation farming" },
    
    // Lucknow Region
    { id: 19, name: "UP Agri Machinery Center", specialty: "Wheat & Rice", lat: 26.8467, lng: 80.9462, address: "369 Faizabad Road, Lucknow", phone: "+91-9876543228", rating: 4.6, machinery: ["tractor", "harvester", "seeder", "thresher"], machineryNames: ["Indo Farm Tractors", "Wheat Harvesters", "Zero Till Seeders", "Wheat Threshers"], description: "Serving UP's wheat and rice belt" },
    { id: 20, name: "Awadh Farm Equipment", specialty: "Sugarcane Specialist", lat: 26.8367, lng: 80.9362, address: "741 Hardoi Road, Lucknow", phone: "+91-9876543229", rating: 4.4, machinery: ["tractor", "harvester", "loader", "trailer"], machineryNames: ["High HP Tractors", "Sugarcane Harvesters", "Cane Loaders", "Sugarcane Trailers"], description: "Complete sugarcane farming solutions" }
  ];

  // Utility functions
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
             Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Event handlers
  const toggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
    if (!isSearchMode) {
      setLocationSearchInput('');
      hideSuggestions();
    }
  };

  const handleLocationSearchInput = (e) => {
    const query = e.target.value;
    setLocationSearchInput(query);
    
    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    const matches = indianCities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    if (matches.length > 0) {
      setSearchSuggestions(matches);
      setShowSuggestions(true);
    } else {
      hideSuggestions();
    }
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
    setSearchSuggestions([]);
  };

  const selectLocation = (cityName, lat, lng) => {
    setLocationSearchInput(cityName);
    hideSuggestions();
    setUserLocationData(lat, lng, cityName);
  };

  const searchLocation = () => {
    const query = locationSearchInput.trim();
    if (!query) {
      showErrorMessage('❌ Please enter a location to search');
      return;
    }

    // Find exact match first
    const exactMatch = indianCities.find(city => 
      city.name.toLowerCase() === query.toLowerCase()
    );

    if (exactMatch) {
      setUserLocationData(exactMatch.lat, exactMatch.lng, exactMatch.name);
      return;
    }

    // Find partial match
    const partialMatch = indianCities.find(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    );

    if (partialMatch) {
      setUserLocationData(partialMatch.lat, partialMatch.lng, partialMatch.name);
      return;
    }

    showErrorMessage(`❌ Location "${query}" not found. Please try searching for a major Indian city like Mumbai, Delhi, Bangalore, etc.`);
  };

  const setUserLocationData = (lat, lng, locationName = null) => {
    setUserLocation({ lat, lng });
    
    setLoading(true);
    setError('');
    setFilteredDealers([]);
    
    if (locationName) {
      setLoadingText(`🔍 Finding machinery dealers near ${locationName}...`);
      setCurrentLocationDisplay(`📍 Selected Location: ${locationName}\nCoordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      setShowCurrentLocationDisplay(true);
      setShowLocationInfo(false);
    } else {
      setLoadingText('🔍 Finding machinery dealers near your location...');
      setLocationInfo(`📍 Your Current Location:\nLatitude: ${lat.toFixed(6)}\nLongitude: ${lng.toFixed(6)}`);
      setShowLocationInfo(true);
      setShowCurrentLocationDisplay(false);
    }

    hideSuggestions();
    findNearbyDealers({ lat, lng });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      showErrorMessage('❌ Geolocation is not supported by this browser. Please use the search option instead.');
      return;
    }

    setLoading(true);
    setLoadingText('📍 Getting Your Location...');
    
    // Switch back to GPS mode if in search mode
    if (isSearchMode) {
      setIsSearchMode(false);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocationData(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setLoading(false);
        
        let errorMessage = '❌ Unable to get your location. ';
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += 'Please allow location access or use the search option to find machinery dealers in any Indian city.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += 'Location unavailable. Please use the search option instead.';
            break;
          case err.TIMEOUT:
            errorMessage += 'Location request timed out. Please try the search option.';
            break;
          default:
            errorMessage += 'Please try the search option to find dealers in your city.';
            break;
        }
        showErrorMessage(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  };

  const findNearbyDealers = (location) => {
    if (!location) return;

    // Calculate distances and add to dealer objects
    const dealersWithDistance = machineryDealers.map(dealer => ({
      ...dealer,
      distance: calculateDistance(
        location.lat, 
        location.lng, 
        dealer.lat, 
        dealer.lng
      )
    }));

    setFilteredDealers(dealersWithDistance);
    filterAndDisplayDealers(dealersWithDistance);
  };

  const filterAndDisplayDealers = (dealers = filteredDealers) => {
    if (!userLocation || dealers.length === 0) return;

    let filtered = [...dealers];

    // Filter by machinery type
    if (machineryType) {
      filtered = filtered.filter(dealer => 
        dealer.machinery.includes(machineryType)
      );
    }

    // Filter by distance
    const maxDist = parseFloat(maxDistance);
    filtered = filtered.filter(dealer => dealer.distance <= maxDist);

    // Sort dealers
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return a.distance - b.distance;
      }
    });

    setFilteredDealers(filtered);
    setLoading(false);
  };

  const showErrorMessage = (message) => {
    setError(message);
    setLoading(false);
  };

  const callDealer = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getDirections = (lat, lng, name) => {
    if (userLocation) {
      const googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`;
      const appleMapsUrl = `http://maps.apple.com/?saddr=${userLocation.lat},${userLocation.lng}&daddr=${lat},${lng}`;
      
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isIOS) {
        window.open(appleMapsUrl, '_blank');
      } else {
        window.open(googleMapsUrl, '_blank');
      }
    } else {
      alert('❌ Please set your location first to get directions.');
    }
  };

  // Effect to filter dealers when filters change
  useEffect(() => {
    if (filteredDealers.length > 0) {
      filterAndDisplayDealers();
    }
  }, [machineryType, maxDistance, sortBy]);

  // Styles object
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #81C784 100%)',
      minHeight: '100vh',
      padding: '20px'
    },
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(45deg, #1B5E20, #2E7D32)',
      color: 'white',
      padding: '30px',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.9
    },
    mainContent: {
      padding: '30px'
    },
    locationSection: {
      textAlign: 'center',
      marginBottom: '30px',
      background: '#F8F9FA',
      padding: '25px',
      borderRadius: '15px',
      border: '2px solid #E8F5E8'
    },
    locationOptions: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    locationBtn: {
      background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      fontSize: '1rem',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    searchSection: {
      display: isSearchMode ? 'block' : 'none',
      marginTop: '20px'
    },
    searchContainer: {
      display: 'flex',
      gap: '10px',
      maxWidth: '500px',
      margin: '0 auto',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    searchInput: {
      flex: 1,
      minWidth: '250px',
      padding: '12px 15px',
      border: '2px solid #E0E0E0',
      borderRadius: '25px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    searchBtn: {
      background: '#2196F3',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    searchSuggestions: {
      maxWidth: '500px',
      margin: '10px auto 0',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      display: showSuggestions ? 'block' : 'none'
    },
    suggestionItem: {
      padding: '12px 15px',
      cursor: 'pointer',
      borderBottom: '1px solid #F0F0F0',
      transition: 'background-color 0.3s ease'
    },
    locationInfo: {
      margin: '20px 0',
      padding: '15px',
      background: '#E8F5E8',
      borderRadius: '10px',
      borderLeft: '4px solid #4CAF50',
      display: showLocationInfo ? 'block' : 'none',
      whiteSpace: 'pre-line'
    },
    currentLocationDisplay: {
      background: '#E3F2FD',
      padding: '15px',
      borderRadius: '10px',
      margin: '15px 0',
      borderLeft: '4px solid #2196F3',
      display: showCurrentLocationDisplay ? 'block' : 'none',
      whiteSpace: 'pre-line'
    },
    filters: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      background: '#F5F5F5',
      padding: '20px',
      borderRadius: '10px'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      minWidth: '200px'
    },
    filterLabel: {
      fontWeight: 'bold',
      color: '#2E7D32',
      fontSize: '0.9rem'
    },
    filterSelect: {
      padding: '12px',
      border: '2px solid #E0E0E0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      background: 'white'
    },
    loading: {
      textAlign: 'center',
      padding: '50px',
      color: '#666',
      display: loading ? 'block' : 'none'
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #E0E0E0',
      borderTop: '5px solid #4CAF50',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px'
    },
    error: {
      background: '#FFEBEE',
      color: '#C62828',
      padding: '20px',
      borderRadius: '10px',
      borderLeft: '5px solid #F44336',
      margin: '20px 0',
      textAlign: 'center',
      display: error ? 'block' : 'none'
    },
    resultsCount: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#2E7D32',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      display: filteredDealers.length > 0 && !loading ? 'block' : 'none'
    },
    shopsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: '25px',
      marginTop: '20px'
    },
    shopCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      borderLeft: '5px solid #4CAF50',
      position: 'relative'
    },
    shopHeader: {
      marginBottom: '20px'
    },
    shopName: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#1B5E20',
      marginBottom: '8px'
    },
    shopSpecialty: {
      background: '#4CAF50',
      color: 'white',
      padding: '6px 15px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    shopDetails: {
      marginBottom: '20px'
    },
    shopDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      color: '#555',
      fontSize: '0.95rem'
    },
    detailIcon: {
      width: '20px',
      height: '20px',
      background: '#4CAF50',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.8rem',
      flexShrink: 0
    },
    distance: {
      fontWeight: 'bold',
      color: '#2E7D32',
      fontSize: '1.1rem'
    },
    rating: {
      color: '#FF9800',
      fontWeight: 'bold'
    },
    machineryList: {
      marginBottom: '20px'
    },
    machineryTitle: {
      fontWeight: 'bold',
      color: '#2E7D32',
      marginBottom: '10px',
      fontSize: '1rem'
    },
    machineryItems: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    machineryTag: {
      background: '#E8F5E8',
      color: '#2E7D32',
      padding: '5px 12px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      border: '1px solid #C8E6C9',
      fontWeight: 500
    },
    shopActions: {
      display: 'flex',
      gap: '12px'
    },
    actionBtn: {
      flex: 1,
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem'
    },
    callBtn: {
      background: '#4CAF50',
      color: 'white'
    },
    directionsBtn: {
      background: '#2196F3',
      color: 'white'
    },
    noResults: {
      textAlign: 'center',
      padding: '50px',
      color: '#666',
      background: '#F5F5F5',
      borderRadius: '15px',
      margin: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
          .location-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
          }
          .search-btn:hover {
            background: #1976D2;
            transform: translateY(-2px);
          }
          .suggestion-item:hover {
            background-color: #F5F5F5;
          }
          .shop-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }
          .call-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
          }
          .directions-btn:hover {
            background: #1976D2;
            transform: translateY(-2px);
          }
          @media (max-width: 768px) {
            .location-options {
              flex-direction: column;
              align-items: center;
            }
            .search-container {
              flex-direction: column;
              align-items: center;
            }
            .search-input {
              min-width: 100%;
            }
            .filters {
              flex-direction: column;
              align-items: center;
            }
            .filter-group {
              width: 100%;
              max-width: 300px;
            }
            .shops-grid {
              grid-template-columns: 1fr;
            }
            .shop-actions {
              flex-direction: column;
            }
          }
        `}
      </style>
      
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>🚜 Agricultural Machinery Finder</h1>
          <p style={styles.headerSubtitle}>Find tractors, sprinklers, harvesters and other agricultural machinery anywhere in India</p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.locationSection}>
            <div style={styles.locationOptions}>
              <button 
                style={styles.locationBtn}
                className="location-btn"
                onClick={getCurrentLocation}
              >
                📍 Use My Current Location
              </button>
              <button 
                style={styles.locationBtn}
                className="location-btn"
                onClick={toggleSearchMode}
              >
                {isSearchMode ? '📍 Use Current Location Instead' : '🔍 Search Any Location in India'}
              </button>
            </div>

            <div style={styles.searchSection}>
              <div style={styles.searchContainer}>
                <input 
                  type="text" 
                  style={styles.searchInput}
                  className="search-input"
                  placeholder="Enter city, state, or area (e.g., Mumbai, Delhi, Pune, Bangalore)"
                  value={locationSearchInput}
                  onChange={handleLocationSearchInput}
                  onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                />
                <button 
                  style={styles.searchBtn}
                  className="search-btn"
                  onClick={searchLocation}
                >
                  🔍 Search
                </button>
              </div>
              <div style={styles.searchSuggestions}>
                {searchSuggestions.map((city, index) => (
                  <div 
                    key={index}
                    style={styles.suggestionItem}
                    className="suggestion-item"
                    onClick={() => selectLocation(city.name, city.lat, city.lng)}
                  >
                    📍 {city.name}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.locationInfo}>
              {locationInfo}
            </div>
            <div style={styles.currentLocationDisplay}>
              {currentLocationDisplay}
            </div>
          </div>

          <div style={styles.filters}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>🔧 Machinery Type</label>
              <select 
                style={styles.filterSelect}
                value={machineryType}
                onChange={(e) => setMachineryType(e.target.value)}
              >
                <option value="">All Machinery</option>
                <option value="tractor">Tractors</option>
                <option value="harvester">Harvesters & Combines</option>
                <option value="sprinkler">Sprinklers & Irrigation</option>
                <option value="plow">Plows & Cultivators</option>
                <option value="seeder">Seeders & Planters</option>
                <option value="thresher">Threshers</option>
                <option value="pump">Water Pumps</option>
                <option value="mower">Mowers & Cutters</option>
                <option value="loader">Loaders & Excavators</option>
                <option value="trailer">Trailers & Trolleys</option>
              </select>
            </div>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>📏 Maximum Distance</label>
              <select 
                style={styles.filterSelect}
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
              >
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
                <option value="50">Within 50 km</option>
                <option value="100">Within 100 km</option>
              </select>
            </div>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>📊 Sort By</label>
              <select 
                style={styles.filterSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="distance">Nearest First</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div style={styles.loading}>
            <div style={styles.spinner} className="spinner"></div>
            <p>{loadingText}</p>
          </div>

          <div style={styles.error}>
            {error}
          </div>

          <div style={styles.resultsCount}>
            Found {filteredDealers.length} machinery dealer{filteredDealers.length > 1 ? 's' : ''} in your area
          </div>

          <div>
            {!loading && filteredDealers.length === 0 && !error && (
              <div style={styles.noResults}>
                <h3>🌾 Welcome to Agricultural Machinery Finder</h3>
                <p>Choose your location method:</p>
                <p><strong>📍 Use Current Location:</strong> Get instant results based on your GPS location</p>
                <p><strong>🔍 Search Location:</strong> Find machinery dealers in any city across India</p>
                <br />
                <p><strong>Available Machinery:</strong> Tractors, Harvesters, Sprinklers, Plows, Seeders, Threshers, Pumps, Mowers, Loaders, Trailers</p>
              </div>
            )}

            {!loading && filteredDealers.length === 0 && userLocation && (
              <div style={styles.noResults}>
                <h3>🔍 No Machinery Dealers Found</h3>
                <p>No agricultural machinery dealers found matching your criteria in this area.</p>
                <p><strong>Try:</strong></p>
                <ul style={{textAlign: 'left', display: 'inline-block', marginTop: '10px'}}>
                  <li>Increasing the distance range</li>
                  <li>Selecting "All Machinery"</li>
                  <li>Searching for a different location</li>
                </ul>
              </div>
            )}

            {!loading && filteredDealers.length > 0 && (
              <div style={styles.shopsGrid}>
                {filteredDealers.map(dealer => (
                  <div key={dealer.id} style={styles.shopCard} className="shop-card">
                    <div style={styles.shopHeader}>
                      <div style={styles.shopName}>{dealer.name}</div>
                      <div style={styles.shopSpecialty}>{dealer.specialty}</div>
                    </div>
                    
                    <div style={styles.shopDetails}>
                      <div style={styles.shopDetail}>
                        <div style={styles.detailIcon}>📍</div>
                        <span style={styles.distance}>{dealer.distance.toFixed(1)} km away</span>
                      </div>
                      <div style={styles.shopDetail}>
                        <div style={styles.detailIcon}>🏠</div>
                        <span>{dealer.address}</span>
                      </div>
                      <div style={styles.shopDetail}>
                        <div style={styles.detailIcon}>⭐</div>
                        <span>Rating: <span style={styles.rating}>{dealer.rating}/5.0</span></span>
                      </div>
                      <div style={styles.shopDetail}>
                        <div style={styles.detailIcon}>📞</div>
                        <span>{dealer.phone}</span>
                      </div>
                    </div>

                    <div style={styles.machineryList}>
                      <div style={styles.machineryTitle}>🚜 Available Machinery:</div>
                      <div style={styles.machineryItems}>
                        {dealer.machineryNames.map((machine, index) => (
                          <span key={index} style={styles.machineryTag}>{machine}</span>
                        ))}
                      </div>
                    </div>

                    <div style={styles.shopActions}>
                      <button 
                        style={{...styles.actionBtn, ...styles.callBtn}}
                        className="call-btn"
                        onClick={() => callDealer(dealer.phone)}
                      >
                        📞 Call Now
                      </button>
                      <button 
                        style={{...styles.actionBtn, ...styles.directionsBtn}}
                        className="directions-btn"
                        onClick={() => getDirections(dealer.lat, dealer.lng, dealer.name)}
                      >
                        🗺️ Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindNearbyMachinery;