

const userSignUp =async ( req,res) => {
    const data = req.body;

    console.log("signup:data::", data)
    res.json({success: true, message: "User Created Successfully"})
}

const userLogin = async (req,res) => {
    const {email, password} = req.body;

    res.json({success:true, message: "User login successfully", email, password})
}


module.exports ={
    userSignUp,
    userLogin,
}