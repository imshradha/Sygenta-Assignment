import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const isValidReqBody = function (value) {
    if (Object.keys(value).length == 0) { return false }
    else return true;
}

export const isValid = function (value) {
    if (typeof (value) == "undefined" || typeof (value) == null) { return false }
    if (typeof (value).trim().length == 0) { return false }
    if (typeof (value) == "string" && (value).trim().length > 0) { return true }
}

export const isValidString = function (value) {
    if (!/^[A-Za-z ]+$/.test(value)) { return false }
    else return true
}

export const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false
}

export const isValidPhone = function (value) {
    if (/^\d{10}$/.test(value)) { return true }
    else return false
}

export const isValidPassword = function (value) {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value) == true) { return true }
    else return false
}

export function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

