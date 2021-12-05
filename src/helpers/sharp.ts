import Sharp from "sharp";

// Fixes caching issue on Windows when retrieving metadata
if (process.platform === "win32") {
    Sharp.cache(false);
}

export const doesImageHaveSameDimensions = async (
    imagePath: string,
    width: number,
    height: number,
): Promise<boolean> => {
    const sharp = Sharp(imagePath);

    const metadata = await sharp.metadata();

    return metadata.width === width && metadata.height === height;
};

export const getResizedBufferedImage = async (imagePath: string, width: number, height: number): Promise<Buffer> => {
    return await Sharp(imagePath).resize(width, height).toBuffer();
};
