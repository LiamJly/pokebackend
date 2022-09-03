import bcrypt from "bcryptjs";
import User from "../models/User.mjs";
import getSignedToken from "../util/signedToken.mjs"

const createUser = async (payload) => {
    return User.find({email : payload.email})
    .exec()
    .then((user) =>{
        if (user.length > 0)
        throw new Error(`User already exists`);
    return bcrypt
    .hash(payload.password, 10)
    .then((hashed) =>{
        const newUser = new User({
            email : payload.email,
            password : hashed,
        });
        return newUser.save();
    })
    .catch((err) =>{
        throw new Error(err)
    });
});
}

const signIn =  async (payload) =>{
    return User.findOne({email : payload.email})
    .exec()
    .then((user) =>{
        if (!user)
        throw new Error("Please enter credentials");
        else{
            return bcrypt
            .compare(payload.password, user.password)
            .then((res) =>{
                if(res){
                    const token = getSignedToken(user._id.toString())
                    return token;
                }else{
                    throw new Error("Incorrect credentials, try again");
                }
            })
            .catch((err) =>{
                throw new Error(err);
            });
        }
    });
}

export default {createUser, signIn}


