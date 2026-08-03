import Task from "../../../models/Task.js";

const getRecentTasks = async () => {

    const tasks = await Task.find()

        .populate(
            "assignedTo",
            "firstName lastName avatar"
        )

        .populate(
            "assignedBy",
            "firstName lastName"
        )

        .populate(
            "internship",
            "title category"
        )

        .sort({
            createdAt: -1
        })

        .limit(10);

    return tasks.map(task => ({

        _id: task._id,

        title: task.title,

        description: task.description,

        status: task.status,

        dueDate: task.dueDate,

        createdAt: task.createdAt,

        student: task.assignedTo
            ? {
                _id: task.assignedTo._id,
                fullName: `${task.assignedTo.firstName} ${task.assignedTo.lastName}`,
                avatar: task.assignedTo.avatar
            }
            : null,

        assignedBy: task.assignedBy
            ? `${task.assignedBy.firstName} ${task.assignedBy.lastName}`
            : "Admin",

        internship: task.internship
            ? {
                _id: task.internship._id,
                title: task.internship.title,
                category: task.internship.category
            }
            : null

    }));

};

export default getRecentTasks;