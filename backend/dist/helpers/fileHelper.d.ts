import type { Response } from "express";
export declare class FileContext {
    private fileId;
    private s3Path;
    private metadata;
    private response?;
    private convertedPath?;
    private extractedContent?;
    private script?;
    constructor(fileId: string, s3Path: string, metadata: Record<string, any>, response: Response);
    sendProgress(percent: number, status?: string): void;
    saveToDb(): Promise<void>;
}
export interface FileHandler {
    validate(context: FileContext): Promise<void>;
    convert(context: FileContext): Promise<void>;
    extractContent(context: FileContext): Promise<void>;
    processSemantics(context: FileContext): Promise<void>;
    generateScript(context: FileContext): Promise<void>;
}
export declare class FileHandlerFactory {
    static createHandler(fileExtension: string): FileHandler;
}
//# sourceMappingURL=fileHelper.d.ts.map