export function createDocumentationPrompt(code: string, isTypeScript: boolean): string {
    const language = isTypeScript ? "TypeScript" : "JavaScript";
    const annotations = isTypeScript ? "type annotations" : "JSDoc comments";

    const prompt = `
I have the following ${language} code file:

----------------------------------------
${code}
----------------------------------------

I would like you to write detailed documentation and ${annotations} for it. Make variable and function names more clear and easier to understand.  Do NOT change the underlying code logic itself, only add the documentation and ${annotations}.

Respond ONLY with the code file with the documentation added, and nothing else. Do not respond with any other text.
    `;
    return prompt
}
