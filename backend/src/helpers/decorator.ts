import type { FileContext, FileHandler } from "./fileHelper.js";

export class ProgressDecorator implements FileHandler {
    private adaptee: FileHandler;

    constructor(fileHandler: FileHandler) {
        this.adaptee = fileHandler;
    }

    async validate(context: FileContext) {
        await this.adaptee.validate(context);
        console.log("Pogress: 20%");
        context.sendProgress(20, "Converting");
    }
    async convert(context: FileContext) {
        await this.adaptee.convert(context);
        console.log("Pogress: 40%");
        context.sendProgress(40, "Extracting content");
    }
    async extractContent(context: FileContext) {
        await this.adaptee.extractContent(context);
        console.log("Pogress: 60%");
        context.sendProgress(60, "Processing semantics");
    }
    async processSemantics(context: FileContext) {
        await this.adaptee.processSemantics(context);
        console.log("Pogress: 80%");
        context.sendProgress(80, "Generating script");
    }
    async generateScript(context: FileContext) {
        await this.adaptee.generateScript(context);
        console.log("Pogress: 100%");
        context.sendProgress(100, "Completed");
    }
}
