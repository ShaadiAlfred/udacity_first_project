import express from "express";
import fs from "fs";
import { getImagesExtension, getImagesPath } from "../../helpers";
import { doesImageHaveSameDimensions, getResizedBufferedImage } from "../../helpers/sharp";

const router = express.Router();

router.get(
    "/",
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response | void> => {
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

            if (await doesImageHaveSameDimensions(thumbImagePath, width, height)) {
                return res.sendFile(thumbImagePath);
            }
        }

        const extension = getImagesExtension(filename);

        try {
            const bufferedResizedImage = await getResizedBufferedImage(fullImagePath, width, height);

            // Cache if it doesn't exist
            if (!isCached) {
                try {
                    fs.writeFileSync(thumbImagePath, bufferedResizedImage);
                } catch (error) {
                    console.error("Error while caching");
                    next(error);
                }
            }

            res.contentType(extension);
            return res.send(bufferedResizedImage);
        } catch (error) {
            console.error("Error while sending response");
            return next(error);
        }
    },
);

export default router;
