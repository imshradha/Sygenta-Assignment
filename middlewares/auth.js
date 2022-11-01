import jwt from "jsonwebtoken";

export const Authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(404).send({ status: false, message: "token must be required in the header" });
    
        let decodedToken = jwt.verify(token, "sygenta-agri-app")
        
          req.headers['Farmer-login'] = decodedToken.farmerId
          next();
        }
       catch (error) { res.status(500).send({ status: false, message: error.message })}
};



