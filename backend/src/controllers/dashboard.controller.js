import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

export const studentDashboard = asyncHandler(async (req, res) => {

    const [

        totalApplications,

        pendingApplications,

        acceptedApplications,

        rejectedApplications

    ] = await Promise.all([

        Application.countDocuments({

            applicant: req.user._id

        }),

        Application.countDocuments({

            applicant: req.user._id,

            status: "Pending"

        }),

        Application.countDocuments({

            applicant: req.user._id,

            status: "Accepted"

        }),

        Application.countDocuments({

            applicant: req.user._id,

            status: "Rejected"

        })

    ]);

    return res.status(200).json({

        success: true,

        dashboard: {

            totalApplications,

            pendingApplications,

            acceptedApplications,

            rejectedApplications

        }

    });

});

export const adminDashboard = asyncHandler(async (req, res) => {

    const [

        totalUsers,

        totalCompanies,

        totalInternships,

        totalApplications

    ] = await Promise.all([

        User.countDocuments(),

        Company.countDocuments(),

        Internship.countDocuments(),

        Application.countDocuments()

    ]);

    return res.status(200).json({

        success: true,

        dashboard: {

            totalUsers,

            totalCompanies,

            totalInternships,

            totalApplications

        }

    });

});