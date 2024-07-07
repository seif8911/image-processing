import express from "express";
import bodyParser from "body-parser";
import imageRoutes from "./routes/imageRoutes";

const app = express();

app.use(bodyParser.json());
app.use("/api/images", imageRoutes);
app.use(express.static("public"));

export default app;
