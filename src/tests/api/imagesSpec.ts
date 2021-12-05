import app from "../../index";
import request from "supertest";
import fs from "fs";
import { getImagesPath } from "../../helpers";
import Sharp from "sharp";

describe("GET /api/images", async () => {
    it("should generate a new thumbnail with correct dimensions", (done) => {
        const imageFileName = "image";

        expect(fs.existsSync(getImagesPath(imageFileName))).toBe(true);

        // Remove thumb file if it exists
        if (fs.existsSync(getImagesPath(imageFileName, false))) {
            fs.unlinkSync(getImagesPath(imageFileName, false));
        }

        request(app)
            .get("/api/images?filename=image&width=200&height=200")
            .expect(200)
            .expect("Content-Type", "image")
            .end(async (err, res) => {
                // A new thumb should have been generated
                expect(fs.existsSync(getImagesPath(imageFileName, false))).toBe(true);

                const sharp = Sharp(getImagesPath(imageFileName, false));
                const imageMetadata = await sharp.metadata();

                expect(imageMetadata.width).toBe(200);
                expect(imageMetadata.height).toBe(200);

                done();
            });
    });
});
