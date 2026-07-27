

import dotenv from "dotenv";
dotenv.config({ quiet: true });


import app from "./app.js";
import connectDB from "./config/db.js";


import http from "http";
import { initSocket } from "./socket/socket.js";

import refreshTokenCleanup from "./jobs/refreshTokenCleanup.job.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {

    try {

        await connectDB();


        const server = http.createServer(app);


        initSocket(server);

        refreshTokenCleanup();

        server.listen(PORT, () => {

            console.log(

                `🚀 Server running on http://localhost:${PORT}`

            );

        });

    } catch (error) {
        console.error("Server failed to start");
        console.error(error.stack);
    }

};

startServer();