import Task from "../models/Task.js";
import StudentInternship from "../models/StudentInternship.js";
import Certificate from "../models/Certificate.js";
import Badge from "../models/Badges.js";
import UserBadge from "../models/UserBadge.js";
import Notification from "../models/Notification.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

import logActivity from "../utils/logActivity.js";

import { generateCertificatePDF }
    from "../utils/generateCertificatePDF.js";

import { sendCertificateEmail }
    from "../services/email.service.js";



// =====================================
// CREATE TASK
// =====================================

export const createTask = asyncHandler(async (req, res) => {


    const {
        title,
        description,
        assignedTo,
        internship,
        dueDate

    } = req.body;



    const task = await Task.create({

        title,

        description,

        assignedBy: req.user._id,

        assignedTo,

        internship,

        dueDate

    });



    res.status(201).json({

        success: true,

        message: "Task created successfully",

        task

    });


});





// =====================================
// GET MY TASKS
// =====================================


export const getMyTasks =
    asyncHandler(async (req, res) => {


        const tasks =
            await Task.find({

                assignedTo: req.user._id

            })

                .populate(
                    "assignedBy",
                    "firstName lastName email"
                )

                .sort({

                    createdAt: -1

                });



        res.status(200).json({

            success: true,

            tasks

        });


    });






// =====================================
// UPDATE TASK STATUS
// =====================================


export const updateTaskStatus =
    asyncHandler(async (req, res) => {


        const { status } = req.body;



        const task =
            await Task.findById(req.params.id);



        if (!task) {

            throw new AppError(
                "Task not found",
                404
            );

        }




        if (
            task.assignedTo.toString()
            !==
            req.user._id.toString()

        ) {

            throw new AppError(
                "Unauthorized",
                403
            );

        }



        task.status = status;


        await task.save();





        // ===============================
        // Internship Progress Update
        // ===============================


        if (
            status === "Completed"
            &&
            task.internship
        ) {



            const studentInternship =
                await StudentInternship.findOne({

                    student: req.user._id,

                    internship: task.internship

                });




            if (studentInternship) {



                const totalTasks =
                    await Task.countDocuments({

                        internship: task.internship,

                        assignedTo: req.user._id

                    });



                const completedTasks =
                    await Task.countDocuments({

                        internship: task.internship,

                        assignedTo: req.user._id,

                        status: "Completed"

                    });




                const progress =
                    totalTasks === 0
                        ?
                        0
                        :
                        Math.round(
                            (completedTasks / totalTasks) * 100
                        );




                studentInternship.completedTasks =
                    completedTasks;


                studentInternship.progress =
                    progress;






                if (progress >= 100) {



                    studentInternship.status = "Completed";

                    studentInternship.completedAt =
                        new Date();




                    await createCertificate(

                        req.user._id,

                        task.internship

                    );



                    await giveCompletionBadge(

                        req.user._id

                    );



                }



                await studentInternship.save();



            }



        }





        res.status(200).json({

            success: true,

            message: "Task status updated",

            task

        });



    });



export const updateTask = asyncHandler(async (req, res) => {

    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    const {
        title,
        description,
        dueDate,
        status
    } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task
    });

});





// =====================================
// DELETE TASK
// =====================================


export const deleteTask =
    asyncHandler(async (req, res) => {


        const task =
            await Task.findById(req.params.id);



        if (!task) {

            throw new AppError(
                "Task not found",
                404
            );

        }



        await Task.findByIdAndDelete(
            req.params.id
        );



        res.status(200).json({

            success: true,

            message: "Task deleted"

        });


    });







// =====================================
// CREATE CERTIFICATE
// =====================================


const createCertificate =
    async (student, internship) => {


        const existing =
            await Certificate.findOne({

                student,

                internship

            });



        if (existing) {

            return;

        }




        const certificate =
            await Certificate.create({

                student,

                internship,

                certificateNumber:
                    "TM-" + Date.now()

            });



        return certificate;


    };







// =====================================
// GIVE BADGE
// =====================================


const giveCompletionBadge =
    async (userId) => {



        const badge =
            await Badge.findOne({

                title: "Internship Completed"

            });



        if (!badge) {

            return;

        }




        const already =
            await UserBadge.findOne({

                user: userId,

                badge: badge._id

            });



        if (already) {

            return;

        }




        await UserBadge.create({

            user: userId,

            badge: badge._id

        });



    };
