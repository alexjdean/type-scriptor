import { createDocumentationPrompt, createConversionPrompt, createRefactorPrompt, createTestPrompt } from './prompts';

import * as fs from 'fs';
import * as path from 'path';

async function queryGPT(query: string, apiKey: string) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": query}]
      })
    });
    
    const data = await response.json();
    let updatedCode = data.choices[0].message.content;
    return updatedCode
}

export async function documentCode(parsedArguments: any, code: string): Promise<void> {
    console.log(`Generating documentation for the file ${parsedArguments.filePath}...`);
    const query = createDocumentationPrompt(code, parsedArguments.isTypeScript);
    const documentedCode = await queryGPT(query, parsedArguments.apiKey);

    // Get the original file's path, name, and extension
    const originalFilePath = parsedArguments.filePath;
    const fileDir = path.dirname(originalFilePath);
    const fileName = path.basename(originalFilePath, path.extname(originalFilePath));
    const fileExt = path.extname(originalFilePath);

    // Create the modified file path with the "_modified" suffix
    const modifiedFilePath = path.join(fileDir, `${fileName}_modified${fileExt}`);

    // Write the documented code to the modified file
    fs.writeFileSync(modifiedFilePath, documentedCode);

    console.log(`\nDocumentation generated and saved to ${modifiedFilePath}`);
}

export async function convertToTypeScript(parsedArguments: any, code: string): Promise<void> {
    console.log(`Converting the file ${parsedArguments.filePath} to TypeScript...`);

    if (parsedArguments.isTypeScript) {
        console.log(`It seems like your file is already in TypeScript - We can make it better...`);
    }

    const query = createConversionPrompt(code, parsedArguments.isTypeScript);
    const convertedCode = await queryGPT(query, parsedArguments.apiKey);

    const originalFilePath = parsedArguments.filePath;
    const fileDir = path.dirname(originalFilePath);
    const fileName = path.basename(originalFilePath, path.extname(originalFilePath));

    const modifiedFilePath = path.join(fileDir, `${fileName}_modified.ts`);
    fs.writeFileSync(modifiedFilePath, convertedCode);

    console.log(`\nConversion to TypeScript complete and saved to ${modifiedFilePath}`);
}

export async function refactorCode(parsedArguments: any, code: string): Promise<void> {
    console.log(`Refactoring the file ${parsedArguments.filePath}...`);

    const query = createRefactorPrompt(code, parsedArguments.isTypeScript);
    const refactoredCode = await queryGPT(query, parsedArguments.apiKey);

    const originalFilePath = parsedArguments.filePath;
    const fileDir = path.dirname(originalFilePath);
    const fileName = path.basename(originalFilePath, path.extname(originalFilePath));
    const fileExt = path.extname(originalFilePath);

    const modifiedFilePath = path.join(fileDir, `${fileName}_modified${fileExt}`);
    fs.writeFileSync(modifiedFilePath, refactoredCode);

    console.log(`\nRefactoring complete and saved to ${modifiedFilePath}`);
}

export async function testCode(parsedArguments: any, code: string): Promise<void> {
    console.log(`Testing the file ${parsedArguments.filePath}...`);

    const query = createTestPrompt(code, parsedArguments.isTypeScript, parsedArguments.filePath);
    const tests = await queryGPT(query, parsedArguments.apiKey);

    const originalFilePath = parsedArguments.filePath;
    const fileDir = path.dirname(originalFilePath);
    const fileName = path.basename(originalFilePath, path.extname(originalFilePath));
    const fileExt = path.extname(originalFilePath);

    const modifiedFilePath = path.join(fileDir, `${fileName}.test${fileExt}`);
    fs.writeFileSync(modifiedFilePath, tests);

    console.log(`\nTesting complete and saved to ${modifiedFilePath}`);
}
