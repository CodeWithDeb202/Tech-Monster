import Task from "../models/Task.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createTask = asyncHandler( async (req, res) => {

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

        return res.status(201).json({

            success: true,

            message: "Task created successfully",

            task

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

});

export const getMyTasks = asyncHandler( async (req, res) => {
        const tasks = await Task.find({

            assignedTo: req.user._id

        })

        .populate("assignedBy", "firstName lastName email")

        .sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            tasks

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

});


export const updateTask = asyncHandler( async (req, res) => {

        const task = await Task.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        if (!task) {

            throw new AppError(
                "Task not found",
                404
            )

        }

        return res.status(200).json({

            success: true,

            message: "Task updated",

            task

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

});

export const deleteTask = asyncHandler( async (req, res) => {

        const task = await Task.findById(req.params.id);

        if (!task) {

            throw new AppError(
                "Task not found",
                404
            )

        }

        await Task.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Task deleted"

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });


});


export const updateTaskStatus = asyncHandler( async (req, res) => {

        const { status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {

            throw new AppError(
                "Task not found",
                404
            )

        }

        task.status = status;

        await task.save();

        return res.status(200).json({

            success: true,

            message: "Task status updated",

            task

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

});