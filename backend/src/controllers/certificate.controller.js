import Certificate from "../models/Certificate.js";
import Notification from "../models/Notification.js";

import { generateCertificatePDF } from "../utils/generateCertificatePDF.js";
import { sendCertificateEmail } from "../services/email.service.js";

import logActivity from "../utils/logActivity.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const issueCertificate = asyncHandler(async (req, res) => {

    const { offerId } = req.body;

    if (!offerId) {

        throw new AppError(

            "Offer ID is required",

            400

        );

    }

    const offer = await Offer.findById(offerId)
        .populate("student")
        .populate("internship");

    if (!offer) {

        throw new AppError(

            "Offer not found",

            404

        );

    }

    const existingCertificate = await Certificate.findOne({

        offer: offer._id

    });

    if (existingCertificate) {

        throw new AppError(

            "Certificate already issued",

            409

        );

    }

    const certificateNumber =

        "TM-" + Date.now();

    const certificate = await Certificate.create({

        student: offer.student._id,

        internship: offer.internship._id,

        employer: req.user._id,

        offer: offer._id,

        certificateNumber

    });

    const pdfUrl = await generateCertificatePDF(

        certificate,

        offer.student,

        offer.internship

    );

    certificate.pdfUrl = pdfUrl;

    await certificate.save();

    await sendCertificateEmail(

        offer.student.email,

        pdfUrl

    );

    await Notification.create({

        user: offer.student._id,

        title: "Certificate Issued",

        message: "Your internship completion certificate has been issued.",

        type: "certificate"

    });

    await logActivity(

        req,

        req.user._id,

        "ISSUE_CERTIFICATE",

        "Certificate",

        `Issued certificate to ${offer.student.firstName}`

    );

    return res.status(201).json({

        success: true,

        message: "Certificate issued successfully",

        certificate

    });

});

export const getMyCertificates = asyncHandler(async (req, res) => {

    const certificates = await Certificate.find({

        student: req.user._id

    })

    .populate(

        "internship",

        "title"

    )

    .sort({

        createdAt: -1

    });

    return res.status(200).json({

        success: true,

        certificates

    });

});

export const getEmployerCertificates = asyncHandler(async (req, res) => {

    const certificates = await Certificate.find({

        employer: req.user._id

    })

    .populate(

        "student",

        "firstName lastName email"

    )

    .populate(

        "internship",

        "title"

    )

    .sort({

        createdAt: -1

    });

    return res.status(200).json({

        success: true,

        certificates

    });

});


export const downloadCertificate = asyncHandler(async (req, res) => {

    const certificate = await Certificate.findById(

        req.params.id

    );

    if (!certificate) {

        throw new AppError(

            "Certificate not found",

            404

        );

    }

    return res.download(

        certificate.pdfUrl

    );

});