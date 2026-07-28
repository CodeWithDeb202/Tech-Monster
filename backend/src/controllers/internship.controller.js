import Internship from "../models/Internship.js";
import StudentInternship from "../models/StudentInternship.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";



// =====================================
// ADMIN CREATE INTERNSHIP
// =====================================

export const createInternship = asyncHandler(async(req,res)=>{


    const {

        title,
        slug,
        category,
        level,
        description,
        thumbnail,
        duration,
        totalTasks,
        totalNotes

    } = req.body;



    const internship = await Internship.create({

        title,

        slug,

        category,

        level,

        description,

        thumbnail,

        duration,

        totalTasks,

        totalNotes,

        isPublished:true

    });



    res.status(201).json({

        success:true,

        message:"Internship created successfully",

        internship

    });


});




// =====================================
// GET ALL INTERNSHIP
// =====================================

export const getAllInternships = asyncHandler(async(req,res)=>{


    const internships =
    await Internship.find({

        isPublished:true

    })
    .sort({

        createdAt:-1

    });



    res.status(200).json({

        success:true,

        internships

    });



});





// =====================================
// GET SINGLE INTERNSHIP
// =====================================

export const getSingleInternship =
asyncHandler(async(req,res)=>{


    const internship =
    await Internship.findById(
        req.params.id
    );



    if(!internship){

        throw new AppError(
            "Internship not found",
            404
        );

    }



    res.status(200).json({

        success:true,

        internship

    });



});






// =====================================
// STUDENT JOIN INTERNSHIP
// =====================================

export const joinInternship =
asyncHandler(async(req,res)=>{


    const internship =
    await Internship.findById(
        req.params.id
    );



    if(!internship){

        throw new AppError(
            "Internship not found",
            404
        );

    }




    const alreadyJoined =
    await StudentInternship.findOne({

        student:req.user._id,

        internship:req.params.id

    });



    if(alreadyJoined){

        throw new AppError(

            "Already joined this internship",

            400

        );

    }




    const studentInternship =
    await StudentInternship.create({

        student:req.user._id,

        internship:req.params.id,

        status:"In Progress",

        startedAt:new Date()

    });




    res.status(201).json({

        success:true,

        message:"Internship joined successfully",

        studentInternship

    });



});







// =====================================
// GET MY INTERNSHIP
// =====================================


export const getMyInternships =
asyncHandler(async(req,res)=>{


    const internships =
    await StudentInternship.find({

        student:req.user._id

    })
    .populate(

        "internship"

    )
    .sort({

        createdAt:-1

    });



    res.status(200).json({

        success:true,

        internships

    });



});








// =====================================
// UPDATE PROGRESS
// =====================================


export const updateInternshipProgress =
asyncHandler(async(req,res)=>{


    const {

        progress

    } = req.body;



    const studentInternship =
    await StudentInternship.findOne({

        student:req.user._id,

        internship:req.params.id

    });



    if(!studentInternship){

        throw new AppError(

            "Internship enrollment not found",

            404

        );

    }





    studentInternship.progress =
    progress;



    if(progress>=100){


        studentInternship.progress=100;


        studentInternship.status="Completed";


        studentInternship.completedAt =
        new Date();


    }




    await studentInternship.save();




    res.status(200).json({

        success:true,

        message:"Progress updated",

        studentInternship

    });



});






// =====================================
// COMPLETE INTERNSHIP MANUALLY
// =====================================


export const completeInternship =
asyncHandler(async(req,res)=>{


    const studentInternship =
    await StudentInternship.findOne({

        student:req.user._id,

        internship:req.params.id

    });



    if(!studentInternship){

        throw new AppError(

            "Internship not found",

            404

        );

    }



    studentInternship.status="Completed";

    studentInternship.progress=100;

    studentInternship.completedAt=new Date();



    await studentInternship.save();




    res.status(200).json({

        success:true,

        message:"Internship completed",

        studentInternship

    });


});