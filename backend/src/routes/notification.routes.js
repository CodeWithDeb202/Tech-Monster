import express from "express";

import {protect} from "../middleware/auth.middleware.js";

import {

    getMyNotifications,

    markAsRead,

    markAllAsRead,

    deleteNotification

} from "../controllers/notification.controller.js";

const router = express.Router();

router.get(

    "/",

    protect,

    getMyNotifications

);

router.patch(

    "/:id/read",

    protect,

    markAsRead

);

router.patch(

    "/read-all",

    protect,

    markAllAsRead

);

router.delete(

    "/:id",

    protect,

    deleteNotification

);

export default router;