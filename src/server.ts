import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
dotenv.config();

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
            console.log(`Auth endpoints: http://localhost:${PORT}/api/auth`);
            console.log(`Event endpoints: http://localhost:${PORT}/api/events`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
