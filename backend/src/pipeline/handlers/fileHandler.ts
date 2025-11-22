import { FileContext } from "../context/fileContext.js";

export interface FileHandler {
    validate(context: FileContext): Promise<void>;
    convert(context: FileContext): Promise<void>;
    extractContent(context: FileContext): Promise<void>;
    processSemantics(context: FileContext): Promise<void>;
    generateScript(context: FileContext): Promise<void>;
}
