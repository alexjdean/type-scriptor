import { twirlTimer, clearTwirlTimer, displayVersion, displayHelp, saveApiKey, loadApiKey } from "../src/utils";
import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import dotenv from 'dotenv';

// Test for twirlTimer function
describe("twirlTimer function", () => {
  it("should return a timer object used to stop the animation", () => {
    const timer = twirlTimer();
    expect(typeof timer === "object").toBeTruthy();
    clearInterval(timer);
  });
});

// Test for clearTwirlTimer function
describe("clearTwirlTimer function", () => {
  it("should stop the twirling circle animation", () => {
    const timer = twirlTimer();
    clearTwirlTimer(timer);
    expect(true).toBeTruthy(); // Just making sure the function runs without any errors
  });
});

// Test for displayVersion function
describe("displayVersion function", () => {
  it("should display the version of the type-scriptor package", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const packageJson = require("../package.json");
    displayVersion();
    expect(consoleSpy).toHaveBeenCalledWith(
      `type-scriptor version: ${packageJson.version}`
    );
  });
});

// Test for displayHelp function
describe("displayHelp function", () => {
  it("should display the instructions to use type-scriptor to the console", () => {
    const consoleSpy = jest.spyOn(console, "log");
    displayHelp();
    expect(consoleSpy).toHaveBeenCalled();
  });
});

// Test for saveApiKey function
describe("saveApiKey function", () => {
  it("should save the given OpenAI API key to a .env file in the user's home directory", () => {
    const homedir = os.homedir();
    const envPath = path.join(homedir, ".type-scriptor.env");
    const apiKey = "my_api_key";
    saveApiKey(apiKey);
    const exists = fs.existsSync(envPath);
    expect(exists).toBeTruthy();
    if (exists) {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      expect(envConfig.API_KEY).toBe(apiKey);
      fs.unlinkSync(envPath); // Clean up the created .env file
    }
  });
});

// Test for loadApiKey function
describe("loadApiKey function", () => {
  it("should load the previously saved OpenAI API key from the .env file in the user's home directory", () => {
    const homedir = os.homedir();
    const envPath = path.join(homedir, ".type-scriptor.env");
    const apiKey = "my_api_key";
    fs.writeFileSync(envPath, `API_KEY=${apiKey}\n`, { encoding: "utf-8" });
    const loadedApiKey = loadApiKey();
    expect(loadedApiKey).toBe(apiKey);
    fs.unlinkSync(envPath); // Clean up the created .env file
  });
  it("should return undefined if the .env file does not exist", () => {
    const loadedApiKey = loadApiKey();
    expect(loadedApiKey).toBeUndefined();
  });
});
