#!/usr/bin/env node

import commandLineArgs from 'command-line-args';

import * as fs from 'fs';
import * as path from 'path';

import { twirlTimer, clearTwirlTimer } from './utils';
import { validateCommand } from './validate';
import { generateDocumentation } from './index';
import { createDocumentationPrompt } from './prompts';

async function main(): Promise<void> {
    const optionDefinitions = [
        { name: 'version', alias: 'v', type: Boolean },
        { name: 'help', alias: 'h', type: Boolean },
        { name: 'key', alias: 'k', type: String },
        { name: 'doc', alias: 'd', type: Boolean },
        { name: 'to-ts', type: Boolean },
        { name: 'refactor', alias: 'r', type: Boolean },
        { name: 'test', alias: 't', type: Boolean },
        { name: 'file', alias: 'f', type: String },
    ];

    const args = commandLineArgs(optionDefinitions);
    let validatedArguments = validateCommand(args);

    if(validatedArguments.length === 1) {
        return;
    }

    const [parsedArguments, lines] = validatedArguments;
    const code = lines.join('\n');

    if (parsedArguments.writeDocumenation) {
        console.log(`Generating documentation for the file ${parsedArguments.filePath}...`);
        const query = createDocumentationPrompt(code, parsedArguments.isTypeScript);
        const documentedCode = await generateDocumentation(query, parsedArguments.apiKey);

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
        return;
    }
}

(async () => {
    const timer = twirlTimer();
    await main();
    clearTwirlTimer(timer);
})();
