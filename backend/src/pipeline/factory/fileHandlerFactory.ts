import type { FileHandler } from "../handlers/fileHandler.js";
import { PdfFileHandler } from "../handlers/pdfFileHandler.js";
import { PptFileHandler } from "../handlers/pptFileHandler.js";

export class FileHandlerFactory {
    static createHandler(fileExtension: string): FileHandler {
        switch (fileExtension) {
            case "pdf":
                return new PdfFileHandler();
            case "ppt":
                return new PptFileHandler();
            default:
                throw new Error("Unsupported file type");
        }
    }
}
