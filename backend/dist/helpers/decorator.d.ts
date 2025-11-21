import type { FileContext, FileHandler } from "./fileHelper.js";
export declare class ProgressDecorator implements FileHandler {
    private adaptee;
    constructor(fileHandler: FileHandler);
    validate(context: FileContext): Promise<void>;
    convert(context: FileContext): Promise<void>;
    extractContent(context: FileContext): Promise<void>;
    processSemantics(context: FileContext): Promise<void>;
    generateScript(context: FileContext): Promise<void>;
}
//# sourceMappingURL=decorator.d.ts.map