import path from "path";
import { getImagesExtension, getImagesPath } from "../helpers";
import { doesImageHaveSameDimensions, getResizedBufferedImage } from "../helpers/sharp";

describe("Helper functions tests", () => {
    const imageFileName = "test.png";
    const imageFileName2 = "test";

    it("should return image extension", () => {
        expect(getImagesExtension(imageFileName)).toEqual("png");
    });

    it("should return jpg if the file name doesn't have extension", () => {
        expect(getImagesExtension(imageFileName2)).toEqual("jpg");
    });

    it("should return the correct path of the original image", () => {
        const expectedPath = path.join(__dirname, "../..", "assets/full", imageFileName);

        expect(getImagesPath(imageFileName)).toEqual(expectedPath);
    });

    it("should return the correct path of the original image if the file doesn't provide an extension", () => {
        const expectedPath = path.join(__dirname, "../..", "assets/full", imageFileName2 + ".jpg");

        expect(getImagesPath(imageFileName2)).toEqual(expectedPath);
    });

    it("should return the correct path of the thumb image", () => {
        const expectedPath = path.join(__dirname, "../..", "assets/thumb", imageFileName);

        expect(getImagesPath(imageFileName, false)).toEqual(expectedPath);
    });

    it("should return the correct path of the thumb image if the file doesn't provide an extension", () => {
        const expectedPath = path.join(__dirname, "../..", "assets/thumb", imageFileName2 + ".jpg");

        expect(getImagesPath(imageFileName2, false)).toEqual(expectedPath);
    });
});

describe("Sharp helper functions tests", () => {
    const originalImagePath = path.join(__dirname, "../../assets/full/image.jpg");
    const thumbImagePath = path.join(__dirname, "../../assets/thumb/image.jpg");

    it("should return true if image has the right dimensions", async () => {
        // Make sure that image.jpg in the assets/thumb directory is 200x200
        // Otherwise the test will fail

        expect(await doesImageHaveSameDimensions(thumbImagePath, 200, 200)).toBe(true);
    });

    it("should return a buffer", async () => {
        const bufferedImage = await getResizedBufferedImage(originalImagePath, 200, 200);

        expect(Buffer.isBuffer(bufferedImage)).toBe(true);
    });
});
