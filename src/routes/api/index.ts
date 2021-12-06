import express from "express";
import imagesRoute from "./images";

const router = express.Router();

router.get("/", (_: express.Request, res: express.Response): express.Response => {
    return res.send("Select a service");
});

router.use("/images", imagesRoute);

export default router;
