import User from "../../../models/User.js";
import Internship from "../../../models/Internship.js";
import StudentInternship from "../../../models/StudentInternship.js";
import Task from "../../../models/Task.js";
import Certificate from "../../../models/Certificate.js";

const getStats = async () => {

    const [

        totalStudents,

        totalAdmins,

        totalInternships,

        publishedInternships,

        activeStudents,

        completedStudents,

        totalCertificates,

        totalTasks,

        pendingTasks,

        completedTasks

    ] = await Promise.all([

        User.countDocuments({
            role: "student"
        }),

        User.countDocuments({
            role: "admin"
        }),

        Internship.countDocuments(),

        Internship.countDocuments({
            isPublished: true
        }),

        StudentInternship.countDocuments({
            status: "In Progress"
        }),

        StudentInternship.countDocuments({
            status: "Completed"
        }),

        Certificate.countDocuments(),

        Task.countDocuments(),

        Task.countDocuments({
            status: "Pending"
        }),

        Task.countDocuments({
            status: "Completed"
        })

    ]);

    return {

        totalStudents,

        totalAdmins,

        totalInternships,

        publishedInternships,

        activeStudents,

        completedStudents,

        totalCertificates,

        totalTasks,

        pendingTasks,

        completedTasks

    };

};

export default getStats;