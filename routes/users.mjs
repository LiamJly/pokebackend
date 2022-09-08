import express from 'express';
import User from '../models/User.mjs'
import {signUp, signIn} from '../controller/userController.mjs'

const router = express.Router()


router.get('/user', async (_, res) =>{
   try{ const data = await User.find();
    res.status(200).json({
       success:true,
        data: data,
    })}
    catch(error){
        res.status(500).json({error: error.message})
    }

});

router.post("/signup", signUp);

router.post("/login", signIn);

export default router