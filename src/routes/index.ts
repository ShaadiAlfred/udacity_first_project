import express from "express";
import apiRoutes from "./api";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/api", apiRoutes);

export default router;
