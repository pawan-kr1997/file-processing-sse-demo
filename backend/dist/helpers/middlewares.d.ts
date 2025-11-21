import type { NextFunction, Request, Response } from "express";
import { FileContext, type FileHandler } from "./fileHelper.js";
declare global {
    namespace Express {
        interface Request {
            fileContext: FileContext;
            fileHandler: FileHandler;
        }
    }
}
export declare const fileUploadMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const fileValidationMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const fileConversionMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const contentExtractionMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const semanticProcessingMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const speechScriptGenerationMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=middlewares.d.ts.map