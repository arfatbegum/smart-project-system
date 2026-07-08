import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1", router);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Smart Project & Task Collaboration API",
    version: "1.0.0",
    status: "Running",
  });
});

export default app;