import express from "express";
import cors from "cors";
import {
    contentExtractionMiddleware,
    fileConversionMiddleware,
    fileUploadMiddleware,
    fileValidationMiddleware,
    semanticProcessingMiddleware,
    speechScriptGenerationMiddleware,
} from "./pipeline/middlewares.js";

const app = express();

app.use(cors());

app.post(
    "/upload",
    fileUploadMiddleware,
    fileValidationMiddleware,
    fileConversionMiddleware,
    contentExtractionMiddleware,
    semanticProcessingMiddleware,
    speechScriptGenerationMiddleware,
    (req, res) => {
        res.end();
    }
);

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
