#!/usr/bin/env node

import { echoMessage } from './index';
import * as process from 'process';

function main(): void {
    const args = process.argv.slice(2);
    const messageArg = args.find((arg) => arg.startsWith('--message='));

    if (messageArg) {
        const message = messageArg.replace('--message=', '');
        console.log(echoMessage(message));
    } else {
        console.error('Error: No message argument provided. Use --message="<your message>"');
    }
}

main();
