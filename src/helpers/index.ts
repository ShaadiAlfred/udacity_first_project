import path from "path";

export const getImagesExtension = (imageFileName: string): string => {
    if (imageFileName.indexOf(".") > -1) {
        return imageFileName.split(".")[1];
    } else {
        return "jpg";
    }
};

export const getImagesPath = (imageFileName: string, isFull = true): string => {
    const fullOrThumb = isFull ? "full" : "thumb";

    if (imageFileName.indexOf(".") > -1) {
        return path.join(__dirname, "../../", `assets/${fullOrThumb}`, imageFileName);
    } else {
        return path.join(__dirname, "../../", `assets/${fullOrThumb}`, imageFileName + ".jpg");
    }
};
