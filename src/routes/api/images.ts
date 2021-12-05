import express from "express";
import fs from "fs";
import { getImagesExtension, getImagesPath } from "../../helpers";
import Sharp from "sharp";

if (process.platform === "win32") {
    Sharp.cache(false);
}

const router = express.Router();

router.get("/", async (req, res) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (filename === undefined || filename.length === 0) {
        return res.status(422).send("You have to enter a filename");
    }

    if (isNaN(width) || isNaN(height)) {
        return res.status(422).send("Height or width are not valid");
    }

    const fullImagePath = getImagesPath(filename);

    if (!fs.existsSync(fullImagePath)) {
        return res.status(404).send("Chosen image does not exist");
    }

    const thumbImagePath = getImagesPath(filename, false);

    let isCached = false;

    // If the image is cached, return the cached image in case it has the same dimensions
    if (fs.existsSync(thumbImagePath)) {
        isCached = true;

        const sharp = Sharp(thumbImagePath);

        const metadata = await sharp.metadata();

        if (metadata.height === height && metadata.width === width) {
            return res.sendFile(thumbImagePath);
        }
    }

    const extension = getImagesExtension(filename);

    let sharp = Sharp(fullImagePath);

    sharp = sharp.resize(width, height);

    try {
        const bufferedImage = await sharp.toBuffer();

        // Cache if it doesn't exist
        if (!isCached) {
            try {
                fs.writeFileSync(thumbImagePath, bufferedImage);
            } catch (error) {
                console.error("Error while caching");
                console.error(error);
            }
        }

        res.contentType(extension);
        return res.send(bufferedImage);
    } catch (error) {
        console.error("Error while sending response");
        console.error(error);

        res.status(500);
        return res.send("Error happened while processing the image, try again");
    }
});

export default router;
