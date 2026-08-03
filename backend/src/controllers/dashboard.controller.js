import User from "../models/User.js";
import Task from "../models/Task.js";
import Attendance from "../models/Attendance.js";
import StudentInternship from "../models/StudentInternship.js";
import UserBadge from "../models/UserBadge.js";
import Internship from '../models/Internship.js';
import Certificate from "../models/Certificate.js";

import ActivityLog from "../models/ActivityLog.js";

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

    const allInternships = await StudentInternship.find()
        .populate("internship");

    const internships = allInternships.filter(item =>
        item.student.equals(req.user._id)
    );

    const allInternship = await Internship.find({
        isPublished: true
    });

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

    const enrolledIds = internships.map(i =>
        i.internship?._id.toString()
    );

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

        allInternship: allInternship.map(item => ({
            _id: item._id,
            title: item.title,
            thumbnail: item.thumbnail,
            category: item.category,
            level: item.level,
            duration: item.duration,
            totalTasks: item.totalTasks,
            totalNotes: item.totalNotes,
            enrolled: enrolledIds.includes(item._id.toString())
        })),

        recommendedInternships: recommendedInternships.map(item => ({
            _id: item._id,
            title: item.title,
            thumbnail: item.thumbnail,
            category: item.category,
            level: item.level,
            duration: item.duration,
            totalTasks: item.totalTasks,
            totalNotes: item.totalNotes,
            enrolled: enrolledIds.includes(item._id.toString())
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
        totalStudents,
        totalInternships,
        totalCertificates,
        totalTasks,
        totalAttendance,
        activeStudentsCount,
        internships
    ] = await Promise.all([
        User.countDocuments({ role: "student" }),
        Internship.countDocuments(),
        Certificate.countDocuments(),
        Task.countDocuments(),
        Attendance.countDocuments(),
        StudentInternship.countDocuments({
            status: "In Progress"
        }),
        Internship.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title category thumbnail duration")
    ]);

    const present = await Attendance.countDocuments({
        status: "Present"
    });

    const absent = await Attendance.countDocuments({
        status: "Absent"
    });

    const leave = await Attendance.countDocuments({
        status: "Leave"
    });


    // Recent Students with Avatar and Name
    const recentStudents = await User.find({
        role: "student"
    })
        .sort({ createdAt: -1 })
        .limit(6)
        .select("firstName lastName avatar createdAt");

    // Active Students with Internship Details
    const activeStudents = await StudentInternship.find({
        status: "In Progress"
    })
        .populate({
            path: "student",
            select: "firstName lastName avatar"
        })
        .populate({
            path: "internship",
            select: "title totalTasks"
        })
        .sort({ progress: -1 })
        .limit(6);


    // Weekly Attendance

    const weeklyAttendance = [];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {

        const count = await Attendance.countDocuments({

            $expr: {
                $eq: [
                    {
                        $dayOfWeek: "$createdAt"
                    },
                    i + 1
                ]
            }

        });

        weeklyAttendance.push({

            day: days[i],

            attendance: count

        });

    }

    const topInternships = await Internship.aggregate([
        {
            $lookup: {
                from: "studentinternships",
                localField: "_id",
                foreignField: "internship",
                as: "students"
            }
        },
        {
            $project: {
                title: 1,
                thumbnail: 1,
                level: 1,
                totalTasks: 1,
                isPublished: 1,
                joinedStudents: {
                    $size: "$students"
                }
            }
        },
        {
            $sort: {
                joinedStudents: -1
            }
        },
        {
            $limit: 5
        }
    ]);

    const recentTasks = await Task.find()
        .populate(
            "assignedTo",
            "firstName lastName avatar"
        )
        .populate(
            "internship",
            "title"
        )
        .sort({
            createdAt: -1
        })
        .limit(6);


    const thisMonthCertificates = await Certificate.countDocuments({
        issueDate: {
            $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
            )
        }
    });

    const recentCertificates = await Certificate.find()
        .populate(
            "student",
            "firstName lastName avatar"
        )
        .populate(
            "internship",
            "title"
        )
        .sort({
            createdAt: -1
        })
        .limit(5);


    const recentActivities = await ActivityLog.find()
        .populate(
            "user",
            "firstName lastName avatar"
        )
        .sort({
            createdAt: -1
        })
        .limit(8);

    res.status(200).json({

        success: true,

        dashboard: {

            stats: {

                totalStudents,

                totalInternships,

                activeStudents: activeStudentsCount,

                totalCertificates,

                totalTasks,

                totalAttendance

            },

            attendanceSummary: {

                present,

                absent,

                leave

            },

            recentStudents,
            activeStudents,

            internships,

            weeklyAttendance,
            topInternships,
            recentTasks: recentTasks.map(task => ({

                _id: task._id,

                title: task.title,

                status: task.status,

                dueDate: task.dueDate,

                student: task.assignedTo
                    ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
                    : "Unknown",

                avatar: task.assignedTo?.avatar,

                internship:
                    task.internship?.title || ""

            })),

            certificateAnalytics: {

                total: totalCertificates,

                thisMonth: thisMonthCertificates

            },

            recentCertificates: recentCertificates.map(item => ({

                _id: item._id,

                student:

                    item.student ?

                        `${item.student.firstName} ${item.student.lastName}`

                        :

                        "Unknown",

                avatar: item.student?.avatar,

                internship:

                    item.internship?.title,

                certificateNumber:

                    item.certificateNumber,

                issueDate:

                    item.issueDate

            })),

            recentActivities: recentActivities.map(item => ({

                _id: item._id,

                user: item.user
                    ? `${item.user.firstName} ${item.user.lastName}`
                    : "System",

                avatar: item.user?.avatar,

                action: item.action,

                module: item.module,

                description: item.description,

                createdAt: item.createdAt

            })),


        }

    });

});