import type { Response } from "express";
import { convertFile, extractContent, generateSpeechScript, processSemantic, validateFile } from "./helper.js";

export class FileContext {
    private fileId: string;
    private s3Path: string;
    private metadata: Record<string, any>;
    private response?: Response;
    private convertedPath?: string;
    private extractedContent?: any;
    private script?: string;

    constructor(fileId: string, s3Path: string, metadata: Record<string, any>, response: Response) {
        this.fileId = fileId;
        this.s3Path = s3Path;
        this.metadata = metadata;
        this.response = response;
    }

    sendProgress(percent: number, status: string = "processing") {
        if (this.response) {
            const data = {
                progress: percent,
                status: status,
            };
            this.response.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    }

    async saveToDb() {}
}

export interface FileHandler {
    validate(context: FileContext): Promise<void>;
    convert(context: FileContext): Promise<void>;
    extractContent(context: FileContext): Promise<void>;
    processSemantics(context: FileContext): Promise<void>;
    generateScript(context: FileContext): Promise<void>;
}

class PdfFileHandler implements FileHandler {
    public async validate(ctx: FileContext) {
        await validateFile();
    }

    public async convert(ctx: FileContext) {
        await convertFile();
    }

    public async extractContent(ctx: FileContext) {
        await extractContent();
    }
    public async processSemantics(ctx: FileContext) {
        await processSemantic();
    }
    public async generateScript(ctx: FileContext) {
        await generateSpeechScript();
    }
}

class PptFileHandler implements FileHandler {
    public async validate(ctx: FileContext) {
        await validateFile();
    }

    public async convert(ctx: FileContext) {
        await convertFile();
    }

    public async extractContent(ctx: FileContext) {
        await extractContent();
    }
    public async processSemantics(ctx: FileContext) {
        await processSemantic();
    }
    public async generateScript(ctx: FileContext) {
        await generateSpeechScript();
    }
}

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
