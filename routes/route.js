import express from "express";
import { addCrop, getCrops } from "../controllers/crop-controller.js";
import { register, login } from '../controllers/farmer-controller.js';
import { Authentication } from "../middlewares/auth.js";

const router = express.Router();

//Farmer
router.post('/register', register);
router.post('/login', login)

//Crops
router.post('/crops', Authentication, addCrop);
router.get('/allCrops', getCrops);


export default router;