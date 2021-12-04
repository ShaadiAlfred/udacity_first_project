import express from "express";
import fs from "fs";
import { getImagesPath } from "../../helpers";

const router = express.Router();

router.get("/", (req, res) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (
        filename === undefined ||
        width === undefined ||
        height === undefined
    ) {
        return res.status(422).send("Missing parameters");
    }

    if (filename.length === 0) {
        return res.status(422).send("You have to enter a filename");
    }

    if (isNaN(width) || isNaN(height)) {
        return res.status(422).send("Height or width are not valid");
    }

    const imagePath = getImagesPath(filename)

    if (! fs.existsSync(imagePath)) {
        return res.status(404).send("Chosen image does not exist");
    }

    res.sendFile(imagePath);
});

export default router;