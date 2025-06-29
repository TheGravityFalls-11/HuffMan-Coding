import express from 'express'
import mongoose from 'mongoose';
import Village from '../models/Village.js'

const route=express.Router();

route.post('/',async(req,res)=>{
    console.log(req.body);
    try {
        const info=new Village(req.body);
        await info.save();
        return res.status(200).json({message:"data added successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"not able to add data",error:error.message});
    }
})

route.get('/get',async(req,res)=>{
    try {
        const id=req.params.id;
        const info=await Village.find();
        
        return res.status(200).json({info});
    } catch (error) {
        return res.status(500).json({message:"not able to view data",error:error.message});
    }
})

route.get('/get/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const info=await Village.findById(id);
        
        return res.status(200).json({info});
    } catch (error) {
        return res.status(500).json({message:"not able to  view data by id",error:error.message});
    }
})

route.put('/update/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const {villageName,numberOfFarmers,majorCrops,WaterResources ,averageLandperFarmer, PointOfContact1,PointOfContact2,VillageYouthClub ,AcresPerCrop ,SHGandFPOnames,nearbyVillages,availableMachines}=req.body
        const updatedinfo=await Village.findByIdAndUpdate(id,{
villageName,
numberOfFarmers,
majorCrops,
WaterResources ,
 averageLandperFarmer,
 PointOfContact1,
 PointOfContact2,
 VillageYouthClub ,
 AcresPerCrop ,
 SHGandFPOnames,
 nearbyVillages,
 availableMachines
  },{new:true});
        
        return res.status(200).json({updatedinfo});
    } catch (error) {
        return res.status(500).json({message:"not able to update data by id",error:error.message});
    }
})

route.delete('/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteinfo=await Village.findByIdAndDelete(id);
        
        return res.status(200).json({deleteinfo});
    } catch (error) {
        return res.status(500).json({message:"data is not being deleted",error:error.message});
    }
})

export default route;