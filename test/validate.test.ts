const fs = require('fs');
const { validateCommand, createArgumentsObject, LINES_LIMIT } = require('../src/validate');
const utils = require('../src/utils');

test('validateCommand should return 0 if only API key is provided', () => {
    const rawArguments = {
        key: 'API_KEY'
    };
    expect(validateCommand(rawArguments)).toEqual([0]);
});

test('validateCommand should throw an error if both version and help are requested', () => {
    const rawArguments = {
        version: true,
        help: true
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please request either the version or the help message.");
});

test('validateCommand should throw an error if actions are requested with version/help', () => {
    const rawArguments = {
        version: true,
        refactor: true
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please do not request actions when requesting the version or the help message.");
});

test('validateCommand should throw an error if file path is provided with version/help', () => {
    const rawArguments = {
        version: true,
        file: 'test.js'
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please do not provide file path when requesting the version or the help message.");
});

test('validateCommand should throw an error if more than one action is requested', () => {
    const rawArguments = {
        file: 'test.js',
        refactor: true,
        doc: true
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please request only one action.");
});

test('validateCommand should throw an error if file path is provided but no action is requested', () => {
    const rawArguments = {
        file: 'test.js'
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please request an action when providing a file path.");
});

test('validateCommand should throw an error if no API key is provided with file path', () => {
    const rawArguments = {
        file: 'test.js'
    };
    expect(() => validateCommand(rawArguments)).toThrow(`Error: Invalid command. Please request an action when providing a file path.`);
});

test('validateCommand should throw an error if no file path is provided with action', () => {
    const rawArguments = {
        refactor: true
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please provide a file path when requesting an action.");
});

test('validateCommand should throw an error if invalid file extension is provided', () => {
    const rawArguments = {
        file: 'test.html',
        refactor: true,
        key: 'API_KEY'
    };
    expect(() => validateCommand(rawArguments)).toThrow("Error: Invalid command. Please provide a JavaScript or TypeScript file.");
});

test('validateCommand should set isTypeScript to true if file has .ts extension', () => {
    const rawArguments = {
        file: 'test.ts',
        refactor: true,
        key: 'API_KEY'
    };
    const fsReadFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue('test code');
    expect(validateCommand(rawArguments)[0].isTypeScript).toEqual(true)
    expect(fsReadFileSyncSpy).toHaveBeenCalledWith(expect.any(String), 'utf-8');
});

test('validateCommand should set isTypeScript to false if file has .js extension', () => {
    const rawArguments = {
        file: 'test.js',
        refactor: true,
        key: 'API_KEY'
    };
    const fsReadFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue('test code');
    expect(validateCommand(rawArguments)[0].isTypeScript).toEqual(false)
    expect(fsReadFileSyncSpy).toHaveBeenCalledWith(expect.any(String), 'utf-8');
});

test('createArgumentsObject returns correct arguments', () => {
    const rawArguments = {
        version: true
    };
    expect(createArgumentsObject(rawArguments)).toEqual([{
        showVersion: true,
        showHelp: false,
        writeDocumentation: false,
        convertToTypeScript: false,
        refactor: false,
        test: false,
        filePath: "",
        apiKey: undefined
    }, 0]);
});

test('createArgumentsObject should save API key and return 0 if no file path is provided but API key is provided', () => {
    const rawArguments = {
        key: 'API_KEY'
    };
    const saveApiKeySpy = jest.spyOn(utils, 'saveApiKey');
    expect(createArgumentsObject(rawArguments)).toEqual([0]);
    expect(saveApiKeySpy).toHaveBeenCalledWith('API_KEY');
});

test('createArgumentsObject should load API key if it is not provided as an argument', () => {
    const rawArguments = {
        file: 'test.js'
    };
    const loadApiKeySpy = jest.spyOn(utils, 'loadApiKey').mockReturnValue('API_KEY');
    expect(createArgumentsObject(rawArguments)).toEqual([{
        showVersion: false,
        showHelp: false,
        writeDocumentation: false,
        convertToTypeScript: false,
        refactor: false,
        test: false,
        filePath: "test.js",
        apiKey: 'API_KEY'
    }, 0]);
    expect(loadApiKeySpy).toHaveBeenCalled();
});

test('createArgumentsObject should return correct arguments with actions', () => {
    const rawArguments = {
        file: 'test.js',
        refactor: true,
        key: 'API_KEY'
    };
    expect(createArgumentsObject(rawArguments)).toEqual([{
        showVersion: false,
        showHelp: false,
        writeDocumentation: false,
        convertToTypeScript: false,
        refactor: true,
        test: false,
        filePath: "test.js",
        apiKey: 'API_KEY'
    }, 1]);
});
