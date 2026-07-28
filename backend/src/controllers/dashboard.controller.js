import User from "../models/User.js";
import Task from "../models/Task.js";
import Attendance from "../models/Attendance.js";
import StudentInternship from "../models/StudentInternship.js";
import UserBadge from "../models/UserBadge.js";
import Internship from '../models/Internship.js'

import asyncHandler from "../utils/asyncHandler.js";

export const studentDashboard = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id)
        .select("-password");


    const tasks = await Task.find({

        assignedTo: req.user._id

    });



    const attendance = await Attendance.find({

        student: req.user._id

    });



    const internships = await StudentInternship.find({

        student: req.user._id

    }).populate("internship");

    const recommendedInternships = await Internship.find({
        isPublished: true
    }).limit(6);

    const suggestedUsers = await User.find({
        role: "student",
        _id: { $ne: req.user._id },
        profileCompleted: true
    })
        .select("firstName lastName avatar bio skills")
        .limit(4);



    const badges = await UserBadge.find({

        user: req.user._id

    })
        .populate("badge");





    // ==========================
    // Attendance Analytics
    // ==========================


    const totalAttendance = attendance.length;


    const presentDays = attendance.filter(
        item => item.status === "Present"
    ).length;



    const attendancePercentage =
        totalAttendance === 0
            ?
            0
            :
            Math.round(
                (presentDays / totalAttendance) * 100
            );





    // ==========================
    // Task Analytics
    // ==========================


    const completedTasks =
        tasks.filter(
            task => task.status === "Completed"
        ).length;



    const taskPercentage =
        tasks.length === 0
            ?
            0
            :
            Math.round(
                (completedTasks / tasks.length) * 100
            );





    // ==========================
    // Internship Analytics
    // ==========================


    const completedInternships =
        internships.filter(
            item => item.status === "Completed"
        ).length;




    const totalLearningHours =
        attendance.reduce(

            (sum, item) =>
                sum + item.workingHours,

            0

        );





    // ==========================
    // Weekly Chart Data
    // ==========================


    const weeklyData = [

        attendance.filter(
            a => new Date(a.createdAt).getDay() === 1
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 2
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 3
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 4
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 5
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 6
        ).length,


        attendance.filter(
            a => new Date(a.createdAt).getDay() === 0
        ).length,


    ];





    const dashboard = {


        user: {


            fullName:
                `${user.firstName} ${user.lastName}`,


            email: user.email,


            profilePhoto: user.avatar,


            skills: user.skills,


            profileCompletion:
                user.profileCompleted
                    ?
                    100
                    :
                    70

        },





        stats: {


            internships: internships.length,


            completedInternships,


            attendance:
                attendancePercentage,


            tasks:
                tasks.length,


            completedTasks,


            badges:
                badges.length


        },





        streak: {


            days: presentDays,


            progress: attendancePercentage


        },





        analytics: {


            completedCourses:
                completedInternships,


            hours:
                totalLearningHours,


            growth:
                taskPercentage,


            weeklyData


        },





        internships: internships
            .filter(item => item.internship)
            .map(item => ({
                _id: item._id,
                title: item.internship.title,
                thumbnail: item.internship.thumbnail,
                duration: item.internship.duration,
                progress: item.progress,
                status: item.status
            })),

        recommendedInternships: recommendedInternships.map(item => ({
            _id: item._id,
            title: item.title,
            thumbnail: item.thumbnail,
            category: item.category,
            level: item.level,
            duration: item.duration,
            totalTasks: item.totalTasks,
            totalNotes: item.totalNotes
        })),


        suggestedUsers: suggestedUsers.map(user => ({
            _id: user._id,
            avatar: user.avatar,
            fullName: `${user.firstName} ${user.lastName}`,
            role: user.bio,
            skills: user.skills
        })),


        badges: badges.map(item => item.badge)



    };





    res.status(200).json({

        success: true,

        dashboard

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