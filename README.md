# type-scriptor

![Tests](https://img.shields.io/badge/tests-100%25-brightgreen)

`type-scriptor` is an NPM package CLI tool that uses ChatGPT to improve your JavaScript and TypeScript code. It helps you write better code by automatically generating documentation, refactoring code to improve performance and maintainability, adding unit tests using Jest, and converting JavaScript code to TypeScript.

All the unit tests for this project were generated using this very tool!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Setting Up Your API Key](#setting-up-your-api-key)
- [Usage](#usage)
  - [Generating Documentation](#generating-documentation)
  - [Converting JavaScript to TypeScript](#converting-javascript-to-typescript)
  - [Refactoring Code](#refactoring-code)
  - [Generating Unit Tests](#generating-unit-tests)
  - [Displaying Help](#displaying-help)
  - [Displaying the Version](#displaying-the-version)
- [Contributing](#contributing)
- [License](#license)

## Features

`type-scriptor` provides the following features:

- Automatically generate documentation for your JavaScript or TypeScript code using ChatGPT.
- Refactor your code to improve performance, code quality, modularity, and maintainability.
- Convert JavaScript code to TypeScript.
- Generate unit tests using Jest.

## Installation

To install `type-scriptor`, run the following command:

```bash
npm install -g type-scriptor
```

This will install `type-scriptor` globally on your system, making it available as a command-line tool.

## Setting Up Your API Key

Before using type-scriptor, you need to save your OpenAI API key. If you don't have an API key, get one from [OpenAI's API key page](https://platform.openai.com/account/api-keys).

To save your API key, run:

```bash
type-scriptor -k API_KEY
```

Replace `API_KEY` with your actual OpenAI API key.

## Usage

In all examples below, replace `FILE_PATH` with the relative path to the file you want to use.

### Generate Documentation

To generate documentation and type annotations for a given file, run:

```bash
type-scriptor -f FILE_PATH -d
```

### Convert to TypeScript

To convert a file to TypeScript and generate documentation, run:

```bash
type-scriptor -f FILE_PATH --to-ts
```

### Refactor Code

To refactor a file, add documentation, and improve code performance, run:

```bash
type-scriptor -f FILE_PATH -r
```

### Generate Unit Tests

To generate unit tests for a given file using Jest, run:

```bash
type-scriptor -f FILE_PATH -t
```

### Display Help

To display help instructions, run:

```bash
type-scriptor -h
```

### Display Version

To display the current version of `type-scriptor`, run:

```bash
type-scriptor -v
```

## Contributing

We welcome contributions to improve `type-scriptor`! To contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository and make your changes.
3. Commit your changes, and push them to your forked repository on GitHub.
4. Create a pull request against the original repository, describing your changes and the reasoning behind them.

Please ensure that your code is properly formatted, and all tests pass before submitting a pull request.

## License

`type-scriptor` is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

