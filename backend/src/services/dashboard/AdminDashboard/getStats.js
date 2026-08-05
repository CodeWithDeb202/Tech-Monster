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

        activeInternships,

        activeStudents,

        completedStudents,

        totalCertificates,

        totalTasks,

        submittedTasks,

        approvedTasks,

        incorrectTasks

    ] = await Promise.all([

        User.countDocuments({
            role: "student"
        }),

        User.countDocuments({
            role: "admin"
        }),

        Internship.countDocuments(),

        Internship.countDocuments({
            status: "Active"
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
            status: "Submitted"
        }),

        Task.countDocuments({
            status: "Approved"
        }),

        Task.countDocuments({
            status: "Incorrect"
        })

    ]);

    return {

        totalStudents,

        totalAdmins,

        totalInternships,

        activeInternships,

        activeStudents,

        completedStudents,

        totalCertificates,

        totalTasks,

        submittedTasks,

        approvedTasks,

        incorrectTasks

    };

};

export default getStats;