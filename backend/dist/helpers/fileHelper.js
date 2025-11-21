import { convertFile, extractContent, generateSpeechScript, processSemantic, validateFile } from "./helper.js";
export class FileContext {
    fileId;
    s3Path;
    metadata;
    response;
    convertedPath;
    extractedContent;
    script;
    constructor(fileId, s3Path, metadata, response) {
        this.fileId = fileId;
        this.s3Path = s3Path;
        this.metadata = metadata;
        this.response = response;
    }
    sendProgress(percent, status = "processing") {
        if (this.response) {
            const data = {
                progress: percent,
                status: status,
            };
            this.response.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    }
    async saveToDb() { }
}
class PdfFileHandler {
    async validate(ctx) {
        await validateFile();
    }
    async convert(ctx) {
        await convertFile();
    }
    async extractContent(ctx) {
        await extractContent();
    }
    async processSemantics(ctx) {
        await processSemantic();
    }
    async generateScript(ctx) {
        await generateSpeechScript();
    }
}
class PptFileHandler {
    async validate(ctx) {
        await validateFile();
    }
    async convert(ctx) {
        await convertFile();
    }
    async extractContent(ctx) {
        await extractContent();
    }
    async processSemantics(ctx) {
        await processSemantic();
    }
    async generateScript(ctx) {
        await generateSpeechScript();
    }
}
export class FileHandlerFactory {
    static createHandler(fileExtension) {
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
//# sourceMappingURL=fileHelper.js.map