import mongoose from "mongoose";

const studentInternshipSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
        required: true
    },

    completedTasks: {
        type: Number,
        default: 0
    },

    progress: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "Not Started",
            "In Progress",
            "Completed"
        ],
        default: "Not Started"
    },

    startedAt: {
        type: Date
    },

    completedAt: {
        type: Date
    },

    certificateIssued: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "StudentInternship",
    studentInternshipSchema
);