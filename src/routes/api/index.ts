import express from "express";
import imagesRoute from "./images";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Select a service");
});

router.use("/images", imagesRoute);

export default router;
