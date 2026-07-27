import User from "../models/User.js";


import asyncHandler from "../utils/asyncHandler.js";


export const searchInternships = asyncHandler( async (req, res) => {

        const {

            keyword = "",

            location = "",

            workMode = "",

            internshipType = "",

            experience = "",

            duration = "",

            skill = "",

            minStipend = "",

            maxStipend = "",

            status = "",

            sort = "newest",

            page = 1,

            limit = 10

        } = req.query;

        const query = {};

        if (workMode) {

            query.workMode = workMode;

        }

        if (experience) {

            query.experience = experience;

        }

        if (duration) {

            query.duration = duration;

        }

        if (status) {

            query.status = status;

        }


        if (minStipend || maxStipend) {

            query.stipend = {};

            if (minStipend) {

                query.stipend.$gte = Number(minStipend);

            }

            if (maxStipend) {

                query.stipend.$lte = Number(maxStipend);

            }

        }


        if (skill) {

            query.skills = {

                $in: [skill]

            };

        }


        query.lastDate = {

            $gte: new Date()

        };

        if (keyword) {

            query.title = {

                $regex: keyword,

                $options: "i"

            };

        }

        if (location) {

            query.location = location;

        }

        if (internshipType) {

            query.internshipType = internshipType;

        }

        if (experienceLevel) {

            query.experienceLevel = experienceLevel;

        }

        let sortOption = {

            createdAt: -1

        };

        if (sort === "oldest") {

            sortOption = {

                createdAt: 1

            };

        }

        if (sort === "stipend-high") {

            sortOption = {

                stipend: -1

            };

        }

        if (sort === "stipend-low") {

            sortOption = {

                stipend: 1

            };

        }

        if (sort === "last-date") {

            sortOption = {

                lastDate: 1

            };

        }

        if (req.query.featured === "true") {

            query.isFeatured = true;

        }

        const total = await Internship.countDocuments(query);

        const internships = await Internship.find(query)

            .populate(

                "company",

                "companyName companyLogo"

            )

            .sort(sortOption)

            .skip((page - 1) * limit)

            .limit(Number(limit));

        return res.status(200).json({

            success: true,

            currentPage: Number(page),

            totalPages: Math.ceil(total / limit),

            total,

            internships

        });

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

});