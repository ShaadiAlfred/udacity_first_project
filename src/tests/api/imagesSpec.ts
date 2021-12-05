import app from "../../index";
import request from "supertest";
import fs from "fs";
import { getImagesPath } from "../../helpers";
import Sharp from "sharp";

fdescribe("GET /api/images", async () => {
    it("should return an error due to an empty filename", (done) => {
        request(app)
            .get("/api/images?width=200&height=100")
            .expect(422)
            .end(async (err, res) => {
                expect(res.text).toEqual("You have to enter a filename");

                done();
            });
    });

    it("should return an error due to invalid filename that doesn't exist", (done) => {
        request(app)
            .get("/api/images?filename=nonexistent&width=200&height=100")
            .expect(422)
            .end(async (err, res) => {
                expect(res.text).toEqual("Chosen image does not exist");

                done();
            });
    });

    it("should return an error due to invalid parameters", (done) => {
        request(app)
            .get("/api/images?filename=image&width")
            .expect(422)
            .end(async (err, res) => {
                expect(res.text).toEqual("Height or width are not valid");

                done();
            });
    });

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
            .end(async () => {
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
