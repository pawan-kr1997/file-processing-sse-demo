import type { NextFunction, Request, Response } from "express";
import { FileContext } from "./context/fileContext.js";
import type { FileHandler } from "./handlers/fileHandler.js";
import { FileHandlerFactory } from "./factory/fileHandlerFactory.js";
import { ProgressDecorator } from "./decorators/progressDecorator.js";

declare global {
    namespace Express {
        export interface Request {
            fileContext: FileContext;
            fileHandler: FileHandler;
        }
    }
}

export const fileUploadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

export const fileValidationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await req.fileHandler.validate(req.fileContext);
    next();
};

export const fileConversionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await req.fileHandler.convert(req.fileContext);
    next();
};

export const contentExtractionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await req.fileHandler.extractContent(req.fileContext);
    next();
};

export const semanticProcessingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await req.fileHandler.processSemantics(req.fileContext);
    next();
};

export const speechScriptGenerationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    await req.fileHandler.generateScript(req.fileContext);
    next();
};
