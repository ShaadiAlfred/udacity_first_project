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

    if (! fs.existsSync(fullImagePath)) {
        return res.status(404).send("Chosen image does not exist");
    }

    const thumbImagePath = getImagesPath(filename, false);

    if (fs.existsSync(thumbImagePath)) {
        let sharp = Sharp(thumbImagePath);

        const metadata = await sharp.metadata();

        if (metadata.height !== height || metadata.width !== width) {
            sharp = Sharp(fullImagePath).resize(width, height);

            const extension = getImagesExtension(filename);

            res.contentType(extension);
            return res.send(await sharp.toBuffer());
        }

        return res.sendFile(thumbImagePath);
    }

    let sharp = Sharp(fullImagePath);

    sharp = sharp.resize(width, height);

    try {
        await sharp.toFile(thumbImagePath);
    } catch (error) {
        console.error(error);
    }

    res.sendFile(thumbImagePath);
});

export default router;
