export class ProgressDecorator {
    adaptee;
    constructor(fileHandler) {
        this.adaptee = fileHandler;
    }
    async validate(context) {
        await this.adaptee.validate(context);
        console.log("Pogress: 20%");
        context.sendProgress(20, "Converting");
    }
    async convert(context) {
        await this.adaptee.convert(context);
        console.log("Pogress: 40%");
        context.sendProgress(40, "Extracting content");
    }
    async extractContent(context) {
        await this.adaptee.extractContent(context);
        console.log("Pogress: 60%");
        context.sendProgress(60, "Processing semantics");
    }
    async processSemantics(context) {
        await this.adaptee.processSemantics(context);
        console.log("Pogress: 80%");
        context.sendProgress(80, "Generating script");
    }
    async generateScript(context) {
        await this.adaptee.generateScript(context);
        console.log("Pogress: 100%");
        context.sendProgress(100, "Completed");
    }
}
//# sourceMappingURL=decorator.js.map