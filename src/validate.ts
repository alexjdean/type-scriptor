/**
 * TypeScript file validator and transformer.
 * @module index
 */

import * as path from 'path';
import * as fs from 'fs';
import { displayVersion, displayHelp, saveApiKey, loadApiKey } from './utils';

/**
 * The maximum number of lines a file can have to be processed by the program.
 */
const LINES_LIMIT = 1250;

/**
 * Creates an object containing the parsed command line arguments.
 * @param {any} rawArguments - The raw command line arguments object.
 * @returns {Array} - An array containing the parsed arguments object and the number of requested actions.
 */
export function createArgumentsObject(rawArguments: any): Array<any> {
    let parsedArguments = {
        showVersion: (!rawArguments.version ? false : true),
        showHelp: (!rawArguments.help ? false : true),
        writeDocumentation: (!rawArguments.doc ? false : true),
        convertToTypeScript: (!rawArguments['to-ts'] ? false : true),
        refactor: (!rawArguments.refactor ? false : true),
        test: (!rawArguments.test ? false : true),
        filePath: (!rawArguments.file ? "" : rawArguments.file),
        apiKey: ""
    }
    
    let apiKey = rawArguments.key || process.env.API_KEY;

    if (apiKey && !rawArguments.file) {
        saveApiKey(apiKey);
        return [0]
    }

    apiKey = apiKey || loadApiKey();
    parsedArguments["apiKey"] = apiKey;

    const actions = [parsedArguments.writeDocumentation, parsedArguments.convertToTypeScript, parsedArguments.refactor, parsedArguments.test].filter(Boolean).length;
    return [parsedArguments, actions];
}

/**
 * Validates the command line arguments and file path and returns them for further processing.
 * @param {any} rawArguments - The raw command line arguments object.
 * @returns {Array} - An array containing the parsed arguments object and an array of the file's code lines.
 * @throws {Error} Will throw an error if the provided file path or command is invalid.
 */
export function validateCommand(rawArguments: any): Array<any> {
    let [parsedArguments, actions] = createArgumentsObject(rawArguments);

    if(parsedArguments === 0) {
        return [0];
    }

    if (parsedArguments.showVersion && parsedArguments.showHelp) {
        throw new Error("Error: Invalid command. Please request either the version or the help message.");
    }

    if ((parsedArguments.showVersion || parsedArguments.showHelp) && actions > 0) {
        throw new Error("Error: Invalid command. Please do not request actions when requesting the version or the help message.");
    }

    if ((parsedArguments.showVersion || parsedArguments.showHelp) && parsedArguments.filePath) {
        throw new Error("Error: Invalid command. Please do not provide file path when requesting the version or the help message.");
    }

    if (parsedArguments.showVersion) {
        displayVersion();
        return [0];
    }

    if (parsedArguments.showHelp) {
        displayHelp();
        return [0];
    }

    if (actions > 1) {
        throw new Error("Error: Invalid command. Please request only one action.");
    }

    if (parsedArguments.filePath) {
        if (actions === 0) {
            throw new Error("Error: Invalid command. Please request an action when providing a file path.");
        }

        if (parsedArguments.apiKey === "") {
            throw new Error(`Error: Invalid command. Please provide an API key when providing a file path.
            
            You can do so by running: type-scriptor -k API_KEY`);
        }
    }

    if (actions > 0) {
        if (parsedArguments.filePath === "") {
            throw new Error("Error: Invalid command. Please provide a file path when requesting an action.");
        }

        if (parsedArguments.apiKey === "") {
            throw new Error(`Error: Invalid command. Please provide an API key when requesting an action.
            
            You can do so by running: type-scriptor -k API_KEY`);
        }
    }

    const fullPath = path.resolve(process.cwd(), parsedArguments.filePath);
    const ext = path.extname(fullPath);

    if (parsedArguments.filePath) {
        if (ext !== '.js' && ext !== '.ts') {
            throw new Error("Error: Invalid command. Please provide a JavaScript or TypeScript file.");
        } else if (ext === '.ts') {
            parsedArguments["isTypeScript"] = true;
        } else {
            parsedArguments["isTypeScript"] = false;
        }
    }

    const code = fs.readFileSync(fullPath, 'utf-8');
    let lines = code.split('\n');

    if (lines.length > LINES_LIMIT) {
        throw (`Error: The provided file has more than ${LINES_LIMIT} lines of code. Please provide a smaller file to process.`);
    }

    return [parsedArguments, lines]
}
