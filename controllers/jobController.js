import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js';

import { job} from '../models/jobschema.js'

export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await job.find({expired : false});
    res.status(200).json({
        success : true,
        jobs,
    })
})

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources"),400)
    }
    const {title , description , category, country , city , location,fixedSalary , salaryFrom , salaryTo} = req.body ;
    if(!title || !description || !category || !country || !city || !location ){
        return next(new ErrorHandler("Please  fill all the fields",400))
    }
    if((!salaryFrom || !salaryTo )&& !fixedSalary){
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary"))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Cannot enter fix salary and ranged salary together"))
    }

    const postedBy = req.user._id ;
    const job = await job.create({
        title , description , category, country , city , location,fixedSalary , salaryFrom , salaryTo , postedBy
    })
    res.status(200).json({
        success : true ,
        message : "Job post successfully",
        job
    })

})