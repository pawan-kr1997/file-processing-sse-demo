import type { FileContext } from "../context/fileContext.js";
import { convertFile, extractContent, generateSpeechScript, processSemantic, validateFile } from "../helper.js";
import type { FileHandler } from "./fileHandler.js";

export class PptFileHandler implements FileHandler {
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
