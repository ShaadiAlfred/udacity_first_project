import path from "path";

export const getImagesPath = (imagePath: string, isFull = true) => {
    let fullOrThumb = isFull ? "full" : "thumb";

    return path.join(__dirname, "../../", `assets/${fullOrThumb}`, imagePath);
}