#!/usr/bin/env node

import commandLineArgs from 'command-line-args';

import { twirlTimer, clearTwirlTimer } from './utils';
import { validateCommand } from './validate';
import { documentCode, convertToTypeScript, refactorCode, testCode } from './index';

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

    if (parsedArguments.writeDocumentation) {
        await documentCode(parsedArguments, code);
        return;
    } else if (parsedArguments.convertToTypeScript) {
        await convertToTypeScript(parsedArguments, code);
        return;
    } else if (parsedArguments.refactor) {
        await refactorCode(parsedArguments, code);
        return;
    } else if (parsedArguments.test) {
        await testCode(parsedArguments, code);
        return;
    }
}

(async () => {
    const timer = twirlTimer();
    await main();
    clearTwirlTimer(timer);
})();
