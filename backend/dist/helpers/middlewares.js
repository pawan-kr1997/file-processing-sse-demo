import { FileContext, FileHandlerFactory } from "./fileHelper.js";
import { ProgressDecorator } from "./decorator.js";
export const fileUploadMiddleware = async (req, res, next) => {
    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // Create file context with response object
    req.fileContext = new FileContext("f101", "asw-path", {}, res);
    const fileHandler = FileHandlerFactory.createHandler("pdf");
    req.fileHandler = new ProgressDecorator(fileHandler);
    next();
};
export const fileValidationMiddleware = async (req, res, next) => {
    await req.fileHandler.validate(req.fileContext);
    next();
};
export const fileConversionMiddleware = async (req, res, next) => {
    await req.fileHandler.convert(req.fileContext);
    next();
};
export const contentExtractionMiddleware = async (req, res, next) => {
    await req.fileHandler.extractContent(req.fileContext);
    next();
};
export const semanticProcessingMiddleware = async (req, res, next) => {
    await req.fileHandler.processSemantics(req.fileContext);
    next();
};
export const speechScriptGenerationMiddleware = async (req, res, next) => {
    await req.fileHandler.generateScript(req.fileContext);
    next();
};
//# sourceMappingURL=middlewares.js.map