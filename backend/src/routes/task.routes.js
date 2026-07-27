import express from "express";

import {protect} from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import {

    createTask,

    getMyTasks,

    updateTask,

    deleteTask,

    updateTaskStatus

} from "../controllers/task.controller.js";

const router = express.Router();

// Employer creates task
router.post(

    "/",

    protect,

    authorizeRoles("admin"),

    createTask

);

// Student gets own tasks
router.get(

    "/my-tasks",

    protect,

    authorizeRoles("student"),

    getMyTasks

);

// Employer updates task
router.put(

    "/:id",

    protect,

    authorizeRoles("admin"),

    updateTask

);

// Employer deletes task
router.delete(

    "/:id",

    protect,

    authorizeRoles("admin"),

    deleteTask

);

// Student updates task status
router.patch(

    "/:id/status",

    protect,

    authorizeRoles("student"),

    updateTaskStatus

);

export default router;