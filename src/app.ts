import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(errorHandler);

export default app;
