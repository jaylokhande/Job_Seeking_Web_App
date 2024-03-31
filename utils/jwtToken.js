// use of these script to direct login when user registered 

export const sendToken = async (user , statuscode ,res ,message )=>{
    const token = await user.getJWTToken();
    console.log(token);
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*100
        ),
        httpOnly : true,
        
    };
    res.status(statuscode).cookie("token",token,options).json({
        success : true ,
        user ,
        message,
        token,
    });
    
};