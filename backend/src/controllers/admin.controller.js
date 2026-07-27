import User from "../models/User.js";
import Message from "../models/Message.js";
import Certificate from "../models/Certificate.js";
import Notification from "../models/Notification.js";

import logActivity from "../utils/logActivity.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";


export const getDashboardStats = asyncHandler(async (req, res) => {

    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
        role: "student"
    });

    const totalEmployers = await User.countDocuments({
        role: "employer"
    });

    const totalAdmins = await User.countDocuments({
        role: "admin"
    });

    const totalCompanies = await Company.countDocuments();

    const verifiedCompanies = await Company.countDocuments({
        isVerified: true
    });

    const totalInternships = await Internship.countDocuments();

    const activeInternships = await Internship.countDocuments({
        status: "Active"
    });

    const totalApplications = await Application.countDocuments();

    return res.status(200).json({

        success: true,

        stats: {

            totalUsers,
            totalStudents,
            totalEmployers,
            totalAdmins,
            totalCompanies,
            verifiedCompanies,
            totalInternships,
            activeInternships,
            totalApplications

        }

    });

});


export const getAllUsers = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";

    const role = req.query.role || "";

    const query = {};

    if (search) {

        query.$or = [

            {

                firstName: {

                    $regex: search,

                    $options: "i"

                }

            },

            {

                lastName: {

                    $regex: search,

                    $options: "i"

                }

            },

            {

                email: {

                    $regex: search,

                    $options: "i"

                }

            }

        ];

    }

    if (role) {

        query.role = role;

    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)

        .select("-password")

        .sort({

            createdAt: -1

        })

        .skip((page - 1) * limit)

        .limit(limit);

    return res.status(200).json({

        success: true,

        currentPage: page,

        totalPages: Math.ceil(totalUsers / limit),

        totalUsers,

        users

    });

});



export const blockUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user) {

        throw new AppError(

            "User not found",

            404

        );

    }

    if (user.role === "admin") {

        throw new AppError(

            "Admin account cannot be blocked",

            403

        );

    }

    user.isBlocked = true;

    await user.save();

    await logActivity(

        req,

        req.user._id,

        "BLOCK_USER",

        "Admin",

        `Blocked user: ${user.email}`

    );

    return res.status(200).json({

        success: true,

        message: "User blocked successfully",

        user

    });

});


export const unblockUser = asyncHandler(async (req, res) => {

    const user = await User.findById(

        req.params.id

    );

    if (!user) {

        throw new AppError(

            "User not found",

            404

        );

    }

    user.isBlocked = false;

    await user.save();

    await logActivity(

        req,

        req.user._id,

        "UNBLOCK_USER",

        "Admin",

        `Unblocked user: ${user.email}`

    );

    return res.status(200).json({

        success: true,

        message: "User unblocked successfully",

        user

    });

});


export const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(

        req.params.id

    );

    if (!user) {

        throw new AppError(

            "User not found",

            404

        );

    }

    if (user.role === "admin") {

        throw new AppError(

            "Admin account cannot be deleted",

            403

        );

    }

    await Application.deleteMany({

        applicant: user._id

    });

    await Message.deleteMany({

        $or: [

            {

                sender: user._id

            },

            {

                receiver: user._id

            }

        ]

    });

    await Meeting.deleteMany({

        $or: [

            {

                student: user._id

            },

            {

                employer: user._id

            }

        ]

    });

    await Offer.deleteMany({

        student: user._id

    });

    await Certificate.deleteMany({

        student: user._id

    });

    await User.findByIdAndDelete(

        user._id

    );

    await logActivity(

        req,

        req.user._id,

        "DELETE_USER",

        "Admin",

        `Deleted user: ${user.email}`

    );

    return res.status(200).json({

        success: true,

        message: "User deleted successfully"

    });

});
