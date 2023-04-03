import dotenv from 'dotenv';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

/**
 * The array of frames used in twirlTimer function to create a twirling animation.
 */
const FRAME_LIST = [
    chalk.red('|'),
    chalk.green('/'),
    chalk.blue('-'),
    chalk.yellow('\\'),
];

/**
 * A function that creates a twirling circle animation.
 * @returns A timer object used to stop the animation.
 */
export function twirlTimer(): NodeJS.Timer {
  let index = 0;
  return setInterval(() => {
    const frame = FRAME_LIST[index];
    process.stdout.write(`\r${frame}`);
    index = (index + 1) % FRAME_LIST.length;
  }, 200);
}

/**
 * Stops the twirling circle animation.
 * @param timer The timer object returned by the twirlTimer function.
 */
export function clearTwirlTimer(timer: NodeJS.Timer): void {
  clearInterval(timer);
  process.stdout.write('\r '); // Clears the displayed line.
}

/**
 * Displays the version of the type-scriptor package.
 */
 export function displayVersion(): void {
    const packageJson = require('../package.json');
    console.log(`type-scriptor version: ${packageJson.version}`);
    return;
}

/**
 * Displays the instructions to use type-scriptor to the console.
 */
export function displayHelp(): void {
    console.log(`Welcome to type-scriptor!
    
You can start by saving your OpenAI API key: type-scriptor -k API_KEY

Don't have an API key? Get one here: https://platform.openai.com/account/api-keys

Usage:
  type-scriptor [-v|--version]
    This command displays the current version of tyoe-scriptor you are using.
  
  type-scriptor [-k|--key] API_KEY
    This command saves your OpenAI API key to your environment variables. This is required to use type-scriptor.
  
  type-scriptor [-f|--file] FILE_PATH [-d|--doc]
    This command generates a documentation and type annotations for the given file.

  type-scriptor [-f|--file] FILE_PATH [--to-ts]
    This command generates a TypeScript file from the given file and generates documentation.

  type-scriptor [-f|--file] FILE_PATH [-r|--refactor]
    This command refactors the given file, adds documentation, and improves code performance.
  
  type-scriptor [-f|--file] FILE_PATH [-t|--test]
    This command generates unit tests for the given file using Jest.

  type-scriptor [-h|--help]
    This command displays this exact help message.
`);
}

/**
 * Saves the given OpenAI API key to a .env file in the user's home directory.
 * @param apiKey The OpenAI API key to save.
 */
export function saveApiKey(apiKey: string): void {
    const envPath = path.join(os.homedir(), '.type-scriptor.env');
    fs.writeFileSync(envPath, `API_KEY=${apiKey}\n`, { encoding: 'utf-8' });
    console.log('API key saved successfully.');
}

/**
 * Loads the previously saved OpenAI API key from the .env file in the user's home directory.
 * @returns The saved OpenAI API key if found, undefined otherwise.
 */
export function loadApiKey(): string | undefined {
    const envPath = path.join(os.homedir(), '.type-scriptor.env');
    if (fs.existsSync(envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(envPath));
        return envConfig.API_KEY;
    }
    return undefined;
}