import express from "express";

import {protect} from "../middleware/auth.middleware.js";

import authorizeRoles from "../middleware/role.middleware.js";

import {

issueCertificate,

getMyCertificates,

getEmployerCertificates,

downloadCertificate

} from "../controllers/certificate.controller.js";

const router = express.Router();




router.get(

    "/student",

    protect,

    authorizeRoles("student"),

    getMyCertificates

);


router.get(

    "/download/:id",

    protect,

    downloadCertificate

);

export default router;