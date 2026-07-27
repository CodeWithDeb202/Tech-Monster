import express from "express";

import {protect} from "../middleware/auth.middleware.js";

import authorizeRoles from "../middleware/role.middleware.js";

import {

    getDashboardStats,

    getAllUsers,

    blockUser,

    unblockUser,

    deleteUser,

} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(

    "/dashboard",

    protect,

    authorizeRoles("admin"),

    getDashboardStats

);


router.get(

    "/users",

    protect,

    authorizeRoles("admin"),

    getAllUsers

);



router.patch(

    "/users/:id/block",

    protect,

    authorizeRoles("admin"),

    blockUser

);

router.patch(

    "/users/:id/unblock",

    protect,

    authorizeRoles("admin"),

    unblockUser

);


router.delete(

    "/users/:id",

    protect,

    authorizeRoles("admin"),

    deleteUser

);

export default router;