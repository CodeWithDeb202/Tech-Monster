import express from "express";

import {protect} from "../middleware/auth.middleware.js";

import {

sendMessage,

getMessages,

markAsSeen

} from "../controllers/message.controller.js";

import chatUpload from "../middleware/chatUpload.middleware.js";

import {

    uploadChatFile

} from "../controllers/chatUpload.controller.js";

const router = express.Router();

router.post(

    "/",

    protect,

    sendMessage

);

router.get(

    "/:userId",

    protect,

    getMessages

);

router.patch(

    "/seen/:userId",

    protect,

    markAsSeen

);

router.post(

    "/upload",

    protect,

    chatUpload.single("file"),

    uploadChatFile

);

export default router;