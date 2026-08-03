import asyncHandler from "../../utils/asyncHandler.js";

import {
    getServerStatus
} from "../../services/Server/index.js";

export const serverStatus = asyncHandler(async (req, res) => {

    const status = await getServerStatus();

    res.status(200).json({

        success: true,

        status

    });

});