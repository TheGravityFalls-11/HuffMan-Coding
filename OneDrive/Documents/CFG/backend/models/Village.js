import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  villageName: {
    type: String,
    required: true,
    unique: true
  },
  totalLand: {
    type: Number,
  },
  numberOfHouseholds: {
    type: Number,
  },
  numberOfFarmers: {
    type: Number,
    required: true
  },
  AcresPerCrop: {
    type: Number,
    required: true
  },
  averagePricePerAcre: {
    type: Number,
  },
  totalPriceforAcre: {
    type: Number,
  },
  VillageYouthClub: {
    type: Boolean,
    required: true
  },
  averageLandperFarmer: {
    type: Number,
    required: true
  },
  SHGandFPOnames: {
    type: [String],
    default: [],
    required: true
  },
  nearbyVillages: {
    type: Number
  },
  WaterResources: {
    type: [String],
    required: true
  },
  majorCrops: {
    type: [String],
    default: []
  },
  PointOfContact1: {
    type: String,
    required: true
  },
  PointOfContact2: {
    type: String,
    required: true
  },
  averagePricePerCrop: {
    type: Number
  },
  averageCostperHousehold: {
    type: Number
  },
  totalPriceAllHouseholds: {
    type: Number,
    default: 0
  },
  totalPriceAllCrops: {
    type: Number,
    default: 0
  },
  totalOverallPrice: {
    type: Number,
    default: 0
  },
  availableMachines: {
    type: [String],   
    default: []
  }
});

export default mongoose.model("Village", villageSchema);
