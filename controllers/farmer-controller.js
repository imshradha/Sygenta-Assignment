import farmerSchema from '../models/farmer-schema.js';
import jwt from 'jsonwebtoken';
import { isValid, isValidReqBody, isValidEmail, isValidPassword, isValidPhone } from '../validator/valid.js';

export const register = async (req, res) => {
    try {
        const requestBody = req.body;

        const { firstName, lastName, email, password } = requestBody;

        if (!isValidReqBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please provide Crop data" })
        }
        if (!isValid(firstName)) {
            return res.status(400).send({ message: "Please enter crop name" })
        }
        if (!isValidString(firstName)) {
            return res.status(400).send({ status: false, message: "Invalid firstName : Only string is accepted" });
        }
        if (!isValid(lastName)) {
            return res.status(400).send({ message: "Please enter crop name" })
        }
        if (!isValidString(lastName)) {
            return res.status(400).send({ status: false, message: "Invalid lastName : Only string is accepted" });
        }
        if (!isValid(email)) {
            return res.status(400).send({ message: "Enter the Email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ message: "This email is not a valid email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ message: "Enter the password" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ message: "This password is not a valid password" })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ message: "Enter phone number" })
        }
        if (!isValidPhone(phone)) {
            return res.status(400).send({ message: "Thios phone is not a valid phone number" })
        }

        const newFarmer = await farmerSchema.create(requestBody);
        return res.status(201).send({ message: "Farmer registered successfully..", data: newFarmer })

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const requestBody = req.body;

        const { email, password } = requestBody;

        if (!isValidReqBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please provide Crop data" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ message: "Enter the Email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ message: "This email is not a valid email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ message: "Enter the password" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ message: "This password is not a valid password" })
        }
        const farmerLogin = await farmerSchema.findOne({ email: email, password: password });
        if (!farmerLogin) {
            return res.status(404).send({ message: "Farmer not found" })
        }
        else {
            const token = jwt.sign({
                farmerId: farmerLogin._id.toString(),
            }, "sygenta-agri-app")

            return res.status(201).send({ message: "Login Successfull", token: token })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}