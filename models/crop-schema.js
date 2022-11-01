import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const cropSchema = new mongoose.Schema({
    name : String,
    farmerId : ObjectId,
    quantity : String
})

const crop = mongoose.model('Crop', cropSchema)

export default crop;