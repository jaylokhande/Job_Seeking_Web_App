import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please provide your name"] ,
        minLength : [3,"Name must contain at least 3 char"],
        maxLength : [30 , "Name not exceed 30 char"]
    },
    email :{
        type : String ,
        required: [true,"Please provide your email"],
        validate : [validator.isEmail , "Please provide a  valid email"]
    },
    phone :{
        type : Number ,
        required : [true , "please provide phone number "]
    },
    password :{
        type : String,
        required : [true  ,   "Please provide a Password"],
        minLength : [8,"Password must contain at least 3 char"],
        maxLength : [30 , "Password not exceed 30 char"],
        select : false
    },
    role : {
        type : String,
        required : [true , "please provide your role"],
        enum : [ "Job Seeker" , "Employer" ]
    },
    createdAt :{
        type : Date ,
        default : Date.now ,
    }

});

// hashing password

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// compared pass 

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password) ;
}

// generating a jwt token for authorization

userSchema.methods.getJWTToken = async function(){
    return jwt.sign({id : this._id},process.env.JWT_SECRET_KEY ,{
        expiresIn : process.env.JWT_EXPIRE 
    });
};

export const User = mongoose.model("User",userSchema);