import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv' 

const getSignedToken = function (id) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "2hr" });
};

export default getSignedToken;