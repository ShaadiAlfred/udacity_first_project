import express from "express";
import apiRoutes from "./api";

const router = express.Router();

router.get("/", (_: express.Request, res: express.Response): express.Response => {
    return res.send("Hello World");
});

router.use("/api", apiRoutes);

export default router;
