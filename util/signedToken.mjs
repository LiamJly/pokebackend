import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

const getSignedToken = (id) => {
  return (jwt.sign({ _id: id }, process.env.JWT_SECRET, {expiresIn: "1h"}));
  
};

export default getSignedToken;