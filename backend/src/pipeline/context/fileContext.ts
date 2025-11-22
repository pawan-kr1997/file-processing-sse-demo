import type { Response } from "express";

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
