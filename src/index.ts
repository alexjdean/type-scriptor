/**
 * Importing the prompts file to get the methods that generate prompts and fetch responses from GPT
 */
import { createDocumentationPrompt, createConversionPrompt, createRefactorPrompt, createTestPrompt } from './prompts';

/**
 * Importing the file system and path libraries to read and write files to the system
 */
import * as fs from 'fs';
import * as path from 'path';

/**
 * Sends a query to OpenAI API endpoint to get a response with generated code
 * @param query The prompt string to be sent to OpenAI API
 * @param apiKey The API key to access GPT
 * @returns A Promise with a string response containing the generated code
 */
async function queryGPT(query: string, apiKey: string): Promise<string> {
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

  try {
    let updatedCode = data.choices[0].message.content;
    return updatedCode;
  } catch (error) {
    console.error('Error processing OpenAI API response:', data);
    throw new Error('Failed to process OpenAI API response');
  }
}

/**
 * Generates documentation for given TypeScript or JavaScript code and saves it as a new file with a "_modified" suffix
 * @param parsedArguments An object containing parsed command line arguments
 * @param code A string containing the code to be documented
 * @returns A Promise with void
 */
export async function documentCode(parsedArguments: any, code: string): Promise<void> {
  console.log(`Generating documentation for the file ${parsedArguments.filePath}...`);
  
  // Create a prompt string to generate documentation using the input code and a boolean flag indicating whether it is TypeScript
  const query = createDocumentationPrompt(code, parsedArguments.isTypeScript);
  // Send query to OpenAI API and get the response containing the documented code
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

/**
 * Converts given JavaScript code into TypeScript and saves it as a new file
 * @param parsedArguments An object containing parsed command line arguments
 * @param code A string containing the code to be converted
 * @returns A Promise with void
 */
export async function convertToTypeScript(parsedArguments: any, code: string): Promise<void> {
  console.log(`Converting the file ${parsedArguments.filePath} to TypeScript...`);

  // Check if the input file is already in TypeScript
  if (parsedArguments.isTypeScript) {
      console.log(`It seems like your file is already in TypeScript - We can make it better...`);
  }

  // Create a prompt string to convert code to TypeScript using the input code and a boolean flag indicating whether it is TypeScript
  const query = createConversionPrompt(code, parsedArguments.isTypeScript);
  // Send query to OpenAI API and get the response containing the converted code
  const convertedCode = await queryGPT(query, parsedArguments.apiKey);

  // Get the original file's path, name, and extension
  const originalFilePath = parsedArguments.filePath;
  const fileDir = path.dirname(originalFilePath);
  const fileName = path.basename(originalFilePath, path.extname(originalFilePath));

  // Create the modified file path with the ".ts" extension
  const modifiedFilePath = path.join(fileDir, `${fileName}_modified.ts`);
  // Write the converted code to the modified file
  fs.writeFileSync(modifiedFilePath, convertedCode);

  console.log(`\nConversion to TypeScript complete and saved to ${modifiedFilePath}`);
}

/**
 * Refactors given code and saves it as a new file with a "_modified" suffix with the same extension
 * @param parsedArguments An object containing parsed command line arguments
 * @param code A string containing the code to be refactored
 * @returns A Promise with void
 */
export async function refactorCode(parsedArguments: any, code: string): Promise<void> {
  console.log(`Refactoring the file ${parsedArguments.filePath}...`);

  // Create a prompt string to refactor the input code
  const query = createRefactorPrompt(code, parsedArguments.isTypeScript);
  // Send query to OpenAI API and get the response containing the refactored code
  const refactoredCode = await queryGPT(query, parsedArguments.apiKey);

  // Get the original file's path, name, and extension
  const originalFilePath = parsedArguments.filePath;
  const fileDir = path.dirname(originalFilePath);
  const fileName = path.basename(originalFilePath, path.extname(originalFilePath));
  const fileExt = path.extname(originalFilePath);

  // Create the modified file path with the "_modified" suffix and the same extension
  const modifiedFilePath = path.join(fileDir, `${fileName}_modified${fileExt}`);
  // Write the refactored code to the modified file
  fs.writeFileSync(modifiedFilePath, refactoredCode);

  console.log(`\nRefactoring complete and saved to ${modifiedFilePath}`);
}

/**
 * Generates test cases for the input code and saves them as a new file with a ".test" suffix
 * @param parsedArguments An object containing parsed command line arguments
 * @param code A string containing the code to be tested
 * @returns A Promise with void
 */
export async function testCode(parsedArguments: any, code: string): Promise<void> {
  console.log(`Testing the file ${parsedArguments.filePath}...`);

  // Create a prompt string to generate tests for the input code using a boolean flag indicating whether it is TypeScript
  const query = createTestPrompt(code, parsedArguments.isTypeScript, parsedArguments.filePath);
  // Send query to OpenAI API and get the response containing the generated tests
  const tests = await queryGPT(query, parsedArguments.apiKey);

  // Get the original file's path, name, and extension
  const originalFilePath = parsedArguments.filePath;
  const fileDir = path.dirname(originalFilePath);
  const fileName = path.basename(originalFilePath, path.extname(originalFilePath));
  const fileExt = path.extname(originalFilePath);

  // Create the modified file path with the ".test" extension
  const modifiedFilePath = path.join(fileDir, `${fileName}.test${fileExt}`);
  // Write the tests to the modified file
  fs.writeFileSync(modifiedFilePath, tests);

  console.log(`\nTesting complete and saved to ${modifiedFilePath}`);
}
