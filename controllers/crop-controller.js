import { isValidObjectId } from 'mongoose';
import cropSchema from '../models/crop-schema.js';
import { isValid, isValidReqBody } from '../validator/valid.js';

export const addCrop = async (req, res) => {
    try {
        const requestBody = req.body;
        const { name, quantity, farmerId } = requestBody;

        if (!isValidReqBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please provide Crop data" })
        }

        if (!isValid(name)) {
            return res.status(400).send({ message: "Please enter crop name" })
        }
        if (!isValidString(name)) {
            return res.status(400).send({ status: false, message: "Invalid Name : Only string is accepted" });
        }

        if (!isValid(quantity)) {
            return res.status(400).send({ message: "Please enter crop quantity" })
        }

        if (!isValid(farmerId)) {
            return res.status(400).send({ message: "Please enter farmerId" })
        }
        if (!isValidObjectId(farmerId)) return res.status(400).send({ status: false, message: "farmerId is not a valid ObjectId" });


        // ------------------Authorization Check------------------------//

        if (req.headers['Farmer-login'] !== requestBody.farmerId)
            return res.status(400).send({ status: false, message: "Unauthorized Access" })

        //--------------------------------------------------------------//

        const newCrop = await cropSchema.create(requestBody);
        return res.status(201).send({ message: "Crop added successfully..", data: newCrop })

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const getCrops = async (req, res) => {
    try {
        const crops = await cropSchema.find().select({ name: 1, quantity: 1, _id: 0 });
        return res.status(200).send(crops);
    } catch (error) {
        return response.status(500).send({ message: error.message })
    }
}