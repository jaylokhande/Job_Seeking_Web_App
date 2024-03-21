class ErrorHandler extends Error{
    constructor(message , statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal server error";
    err.statuscode = err.statuscode || 500 ;
    if(err.name === "CaseError"){
        const message = 'Resource not found Invalid '+err.path ;
        err = new ErrorHandler(message,400)
    }
    if(err.code === 11000){   // same value present in db
        const message = 'Duplicate '+Object.keys(err.keyValue) ;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "JsonWebTokenError"){
        const message = 'Json web token is Invalid , Try Again' ;
        err = new ErrorHandler(message,400)
    }
    if(err.name === "TokenExpiredError"){
        const message = 'Json web token expired ' ;
        err = new ErrorHandler(message,400)
    }
    return res.status(statuscode).json({
        success : false,
        message : err.message,
    });
}
export default ErrorHandler ;