import UserService from "../services/UserService.mjs";


export const signUp = async (req, res) => {
try{
    const newUser = req.body;
    const savedUser = await UserService.createUser(newUser);

    res.status(200).json({
        success:true,
        data: savedUser,
    });
}catch(error){
    res.status(400).json({
        status: "Bad Request",
    })
    console.error(error);
}
};

export const signIn = async (req, res) =>{
    try{
        const payload = req.body;
        console.log(payload)
        const token = await UserService.signIn(payload);
        res.status(200).json({
            success: true,
            token: token
        });
    } catch(error){
        res.status(400).json({
            status: "Bad Request",
        })
        console.error(error);
    }
};

//export default {signUp, signIn}