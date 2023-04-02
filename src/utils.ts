import dotenv from 'dotenv';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

const frames = [
    chalk.red('|'),
    chalk.green('/'),
    chalk.blue('-'),
    chalk.yellow('\\'),
];

export function twirlTimer(): NodeJS.Timeout {
  let index = 0;
  return setInterval(() => {
    const frame = frames[index];
    process.stdout.write(`\r${frame}`);
    index = (index + 1) % frames.length;
  }, 200);
}

export function clearTwirlTimer(timer: NodeJS.Timeout): void {
  clearInterval(timer);
  process.stdout.write('\r '); // Clear the line
}

export function displayVersion(): void {
    const packageJson = require('../package.json');
    console.log(`type-scriptor version: ${packageJson.version}`);
    return;
}
export function displayHelp(): void {
    console.log(`Welcome to type-scriptor!

You can start by saving your OpenAI API key: type-scriptor -k API_KEY

Don't have an API key? Get one here: https://platform.openai.com/account/api-keys

Usage:
  type-scriptor [-v|--version]
  type-scriptor [-h|--help]
  type-scriptor -api-key="XXX" -doc -file="file.js"
  type-scriptor -key="XXX" -d -f="file.ts"
  type-scriptor -api-key="XXX" -to-ts -file="file.js"
  type-scriptor -key="XXX" -to-ts -f="file.ts"
  type-scriptor -api-key="XXX" -refactor -f="file.js"
  type-scriptor -key="XXX" -r -f="file.ts"
  type-scriptor -api-key="XXX" -test -file="file.js"
  type-scriptor -key="XXX" -t -f="file.ts"
`);
}

export function saveApiKey(apiKey: string): void {
    const envPath = path.join(os.homedir(), '.type-scriptor.env');
    fs.writeFileSync(envPath, `API_KEY=${apiKey}\n`, { encoding: 'utf-8' });
    console.log('API key saved successfully.');
}

export function loadApiKey(): string | undefined {
    const envPath = path.join(os.homedir(), '.type-scriptor.env');
    if (fs.existsSync(envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(envPath));
        return envConfig.API_KEY;
    }
    return undefined;
}
