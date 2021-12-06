import express from "express";
import router from "./routes";

const port = 3000;

const app = express();

app.use("/", router);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

export default app;
