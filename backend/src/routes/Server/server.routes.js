import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import authorizeRoles from "../../middleware/role.middleware.js";

import { serverStatus } from "../../controllers/Server/server.controller.js";

const router = express.Router();

router.get(
    "/status",
    protect,
    authorizeRoles("admin"),
    serverStatus
);

export default router;