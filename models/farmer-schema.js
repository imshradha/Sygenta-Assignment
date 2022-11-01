import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
    firstName : String, 
    lastName : String,
    email : String,
    password : String,
    phone : Number
})

const farmer = mongoose.model('Farmer', farmerSchema)

export default farmer;