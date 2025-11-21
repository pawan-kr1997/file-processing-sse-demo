export const validateFile = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("File validation completed");
            resolve("File validation completed");
        }, 1000);
    });
};
export const convertFile = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("File converted");
            resolve("File converted");
        }, 1000);
    });
};
export const extractContent = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("File content extracted");
            resolve("File content extracted");
        }, 1500);
    });
};
export const processSemantic = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("File semantic processed");
            resolve("File semantic processed");
        }, 10000);
    });
};
export const generateSpeechScript = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("File speech script generated");
            resolve("File speech script generated");
        }, 4000);
    });
};
//# sourceMappingURL=helper.js.map