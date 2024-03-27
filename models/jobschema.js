import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    title : {
        type : String ,
        required : [true ,"Please provide job title"],
        minlength : [3 , "Job title must contain at least 3 char"],
        maxlength : [50 , "Job title cannot exceed 50 char"],
    },
    description : {
        type : String ,
        required : [true , "Please provide job description"],
        minlength : [3 , "Job title must contain at least 3 char"],
        maxlength : [50 , "Job title cannot exceed 50 char"],
    },
    category :{
        type : String ,
        required : [true , "Job catgeory "]
    },
    country :{
        type : String ,
        required : [true , "Job city required"]
    },
    location :
    {
        type : String ,
        required : [true , "Please provide exact loation"],
        minlength : [50,"Job Location must contain at least 50 char"],
    },
    fixedSalary : {
        type : Number,
        minlength : [4,"Fixed salary must contain at least 4 char"],
        maxlength :[9,"Fixed salary cannot exceed 9"]
    },
    salaryFrom : {
        type : Number ,
        minlength : [4,"Salary must contain at least 4 digit"],
        maxlength : [9,"Fixed salary cannot exceed 9 digit"]
    },
    salaryTo : {
        type : Number ,
        minlength : [4,"Salary must contain at least 4 digit"],
        maxlength : [9,"Fixed salary cannot exceed 9 digit"]
    },
    expired :{
        type : Boolean,
        default : false
    },
    jobPostedOn : {
        type : Date ,
        default : Date.now ,
    },
    postedBy : {
        type : mongoose.Schema.ObjectId ,
        ref : "User",
        required : true ,
    }

})

export const job = mongoose.model("Job",jobschema);