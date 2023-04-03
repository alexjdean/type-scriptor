# type-scriptor

![Tests](https://img.shields.io/badge/tests-100%25-brightgreen)

`type-scriptor` is an NPM package CLI tool that uses ChatGPT to improve your JavaScript and TypeScript code. It helps you write better code by automatically generating documentation, refactoring code to improve performance and maintainability, adding unit tests using Jest, and converting JavaScript code to TypeScript.

All the unit tests for this project were generated using this very tool!

## Table of Contents

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
- [Examples](#examples)
  - [Documentation](#documentation)
  - [JavaScript to TypeScript](#javascript-to-typescript)
  - [Refactoring](#refactoring)
  - [Unit Tests](#unit-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

`type-scriptor` provides the following features:

- Automatically generate documentation for your JavaScript or TypeScript code using ChatGPT.
- Refactor your code to improve performance, code quality, modularity, and maintainability.
- Convert JavaScript code to TypeScript.
- Generate unit tests using Jest.

## Installation

`type-scriptor` only supports Node versions 16 and 18. If you're using version 16, run the following command:

```bash
npm install -g type-scriptor
```

If you're using Node version 18, run the following command:

```bash
npm install -g type-scriptor@1.1.0
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

## Examples

### Documentation

Suppose you have the following spaceship-themed codebase:

```javascript
// spaceship.js
class Spaceship {
  constructor(name, crewSize) {
    this.name = name;
    this.crewSize = crewSize;
    this.speed = 0;
    this.fuel = 100;
  }

  accelerate(amount) {
    this.speed += amount;
    this.consumeFuel(amount);
  }

  decelerate(amount) {
    this.speed = Math.max(this.speed - amount, 0);
    this.consumeFuel(amount);
  }

  consumeFuel(amount) {
    this.fuel = Math.max(this.fuel - (amount / 10), 0);
  }

  refuel(amount) {
    this.fuel = Math.min(this.fuel + amount, 100);
  }

  boardCrew(crewMembers) {
    this.crewSize += crewMembers;
  }

  disembarkCrew(crewMembers) {
    this.crewSize = Math.max(this.crewSize - crewMembers, 0);
  }
}

function createSpaceship(name, crewSize) {
  return new Spaceship(name, crewSize);
}

function distanceBetweenPlanets(planetA, planetB) {
  const distance = Math.sqrt(Math.pow((planetB.x - planetA.x), 2) + Math.pow((planetB.y - planetA.y), 2));
  return distance;
}

function calculateTravelTime(distance, speed) {
  return distance / speed;
}

module.exports = {
  Spaceship,
  createSpaceship,
  distanceBetweenPlanets,
  calculateTravelTime
};
```

Using the `type-scriptor -f spaceship.js -d` command, our code becomes well-documented and clear to understand. We make it easier for new engineers to get up to speed on the functionality of a given codebase.

```javascript
/**
 * Spaceship class representing a spaceship object.
 * @class
 */
class Spaceship {
  /**
   * Creates a Spaceship object.
   * @constructor
   * @param {string} name - The name of the spaceship.
   * @param {number} crewSize - The number of crew members in the spaceship.
   */
  constructor(name, crewSize) {
    this.name = name;
    this.crewSize = crewSize;
    this.speed = 0;
    this.fuel = 100;
  }

  /**
   * Increases the speed of the spaceship and consumes fuel.
   * @param {number} amount - The amount by which to increase the speed.
   * @returns {void}
   */
  accelerate(amount) {
    this.speed += amount;
    this.consumeFuel(amount);
  }

  /**
   * Decreases the speed of the spaceship and consumes fuel.
   * The spaceship speed can't go below 0.
   * @param {number} amount - The amount by which to decrease the speed.
   * @returns {void}
   */
  decelerate(amount) {
    this.speed = Math.max(this.speed - amount, 0);
    this.consumeFuel(amount);
  }

  /**
   * Reduces the fuel of the spaceship by a calculated amount.
   * @param {number} amount - The amount of speed by which to reduce the fuel.
   * @returns {void}
   */
  consumeFuel(amount) {
    this.fuel = Math.max(this.fuel - (amount / 10), 0);
  }

  /**
   * Refuels the spaceship with the given amount of fuel.
   * The maximum fuel allowed is 100.
   * @param {number} amount - The amount of fuel to refuel.
   * @returns {void}
   */
  refuel(amount) {
    this.fuel = Math.min(this.fuel + amount, 100);
  }

  /**
   * Increases the crew size of the spaceship.
   * @param {number} crewMembers - The number of crew members to add.
   * @returns {void}
   */
  boardCrew(crewMembers) {
    this.crewSize += crewMembers;
  }

  /**
   * Decreases the crew size of the spaceship.
   * Cannot go below 0 crew members.
   * @param {number} crewMembers - The number of crew members to remove.
   * @returns {void}
   */
  disembarkCrew(crewMembers) {
    this.crewSize = Math.max(this.crewSize - crewMembers, 0);
  }
}

/**
 * Creates a new instance of Spaceship.
 * @param {string} name - The name of the spaceship.
 * @param {number} crewSize - The number of crew members in the spaceship.
 * @returns {Spaceship} A new instance of Spaceship.
 */
function createSpaceship(name, crewSize) {
  return new Spaceship(name, crewSize);
}

/**
 * Calculates the distance between two planets.
 * @param {Object} planetA - Object representing the coordinates of planetA.
 * @param {number} planetA.x - The x-coordinate of planetA.
 * @param {number} planetA.y - The y-coordinate of planetA.
 * @param {Object} planetB - Object representing the coordinates of planetB.
 * @param {number} planetB.x - The x-coordinate of planetB.
 * @param {number} planetB.y - The y-coordinate of planetB.
 * @returns {number} The distance between the two planets.
 */
function distanceBetweenPlanets(planetA, planetB) {
  const distance = Math.sqrt(Math.pow((planetB.x - planetA.x), 2) + Math.pow((planetB.y - planetA.y), 2));
  return distance;
}

/**
 * Calculates the travel time between two planets.
 * @param {number} distance - The distance between the two planets.
 * @param {number} speed - The speed of the spaceship.
 * @returns {number} The travel time in seconds.
 */
function calculateTravelTime(distance, speed) {
  return distance / speed;
}

module.exports = {
  Spaceship,
  createSpaceship,
  distanceBetweenPlanets,
  calculateTravelTime
};
```

### JavaScript to TypeScript

Continuing with our spaceship-themed codebase, suppose we decided to migrate to TypeScript. Using the `type-scriptor -f spaceship.js --to-ts` command, our codebase can now use type annotations to prevent potential errors and be even clearer to understand.

```typescript
/**
 * Represents a spaceship object.
 */
class Spaceship {
  /**
   * Creates an instance of Spaceship.
   * @param name - The name of the spaceship.
   * @param crewSize - The number of crew members in the spaceship.
   * @param speed - The current speed of the spaceship.
   * @param fuel - The current fuel level of the spaceship.
   */
  constructor(public name: string, public crewSize: number, public speed: number = 0, public fuel: number = 100) {}

  /**
   * Increases the speed of the spaceship and consumes fuel.
   * @param amount - The amount by which to increase the speed.
   */
  accelerate(amount: number): void {
    this.speed += amount;
    this.consumeFuel(amount);
  }

  /**
   * Decreases the speed of the spaceship and consumes fuel.
   * The spaceship speed can't go below 0.
   * @param amount - The amount by which to decrease the speed.
   */
  decelerate(amount: number): void {
    this.speed = Math.max(this.speed - amount, 0);
    this.consumeFuel(amount);
  }

  /**
   * Reduces the fuel of the spaceship by a calculated amount.
   * @param amount - The amount of speed by which to reduce the fuel.
   */
  consumeFuel(amount: number): void {
    this.fuel = Math.max(this.fuel - amount / 10, 0);
  }

  /**
   * Refuels the spaceship with the given amount of fuel.
   * The maximum fuel allowed is 100.
   * @param amount - The amount of fuel to refuel.
   */
  refuel(amount: number): void {
    this.fuel = Math.min(this.fuel + amount, 100);
  }

  /**
   * Increases the crew size of the spaceship.
   * @param crewMembers - The number of crew members to add.
   */
  boardCrew(crewMembers: number): void {
    this.crewSize += crewMembers;
  }

  /**
   * Decreases the crew size of the spaceship.
   * Cannot go below 0 crew members.
   * @param crewMembers - The number of crew members to remove.
   */
  disembarkCrew(crewMembers: number): void {
    this.crewSize = Math.max(this.crewSize - crewMembers, 0);
  }
}

/**
 * Creates a new instance of Spaceship.
 * @param name - The name of the spaceship.
 * @param crewSize - The number of crew members in the spaceship.
 * @returns A new instance of Spaceship.
 */
function createSpaceship(name: string, crewSize: number): Spaceship {
  return new Spaceship(name, crewSize);
}

interface Planet {
  x: number;
  y: number;
}

/**
 * Calculates the distance between two planets.
 * @param planetA - Object representing the coordinates of planetA.
 * @param planetA.x - The x-coordinate of planetA.
 * @param planetA.y - The y-coordinate of planetA.
 * @param planetB - Object representing the coordinates of planetB.
 * @param planetB.x - The x-coordinate of planetB.
 * @param planetB.y - The y-coordinate of planetB.
 * @returns The distance between the two planets.
 */
function distanceBetweenPlanets(planetA: Planet, planetB: Planet): number {
  const distance = Math.sqrt(Math.pow(planetB.x - planetA.x, 2) + Math.pow(planetB.y - planetA.y, 2));
  return distance;
}

/**
 * Calculates the travel time between two planets.
 * @param distance - The distance between the two planets.
 * @param speed - The speed of the spaceship.
 * @returns The travel time in seconds.
 */
function calculateTravelTime(distance: number, speed: number): number {
  return distance / speed;
}

export { Spaceship, createSpaceship, distanceBetweenPlanets, calculateTravelTime };
```

### Refactoring

We can go further. Suppose we wanted to improve the performance of our codebase. Using the `type-scriptor -f spaceship.ts -r` command, we can improve the performance and organization of our code, making it faster to run and easier to debug.

```typescript
/**
 * Represents a spaceship object.
 */
class Spaceship {
  /**
   * Creates an instance of Spaceship.
   * @param name - The name of the spaceship.
   * @param crewSize - The number of crew members in the spaceship.
   * @param speed - The current speed of the spaceship.
   * @param fuel - The current fuel level of the spaceship.
   */
  constructor(public name: string, public crewSize: number, public speed = 0, public fuel = 100) {}

  /**
   * Increases the speed of the spaceship and consumes fuel.
   * @param amount - The amount by which to increase the speed.
   */
  accelerate(amount: number) {
    this.speed += amount;
    this.consumeFuel(amount);
  }

  /**
   * Decreases the speed of the spaceship and consumes fuel.
   * The spaceship speed can't go below 0.
   * @param amount - The amount by which to decrease the speed.
   */
  decelerate(amount: number) {
    this.speed = Math.max(this.speed - amount, 0);
    this.consumeFuel(amount);
  }

  /**
   * Reduces the fuel of the spaceship by a calculated amount.
   * @param amount - The amount of speed by which to reduce the fuel.
   */
  consumeFuel(amount: number) {
    this.fuel = Math.max(this.fuel - amount / 10, 0);
  }

  /**
   * Refuels the spaceship with the given amount of fuel.
   * The maximum fuel allowed is 100.
   * @param amount - The amount of fuel to refuel.
   */
  refuel(amount: number) {
    this.fuel = Math.min(this.fuel + amount, 100);
  }

  /**
   * Increases the crew size of the spaceship.
   * @param crewMembers - The number of crew members to add.
   */
  boardCrew(crewMembers: number) {
    this.crewSize += crewMembers;
  }

  /**
   * Decreases the crew size of the spaceship.
   * Cannot go below 0 crew members.
   * @param crewMembers - The number of crew members to remove.
   */
  disembarkCrew(crewMembers: number) {
    this.crewSize = Math.max(this.crewSize - crewMembers, 0);
  }
}

/**
 * Creates a new instance of Spaceship.
 * @param {string} name - The name of the spaceship.
 * @param {number} crewSize - The number of crew members in the spaceship.
 * @returns {Spaceship} - A new instance of Spaceship.
 */
function createSpaceship(name: string, crewSize: number): Spaceship {
  return new Spaceship(name, crewSize);
}

interface Planet {
  x: number;
  y: number;
}

/**
 * Calculates the distance between two planets.
 * @param {Planet} planetA - Object representing the coordinates of planetA.
 * @param {number} planetA.x - The x-coordinate of planetA.
 * @param {number} planetA.y - The y-coordinate of planetA.
 * @param {Planet} planetB - Object representing the coordinates of planetB.
 * @param {number} planetB.x - The x-coordinate of planetB.
 * @param {number} planetB.y - The y-coordinate of planetB.
 * @returns {number} - The distance between the two planets.
 */
function distanceBetweenPlanets(planetA: Planet, planetB: Planet): number {
  const dx = planetB.x - planetA.x;
  const dy = planetB.y - planetA.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Calculates the travel time between two planets.
 * @param {number} distance - The distance between the two planets.
 * @param {number} speed - The speed of the spaceship.
 * @returns {number} - The travel time in seconds.
 */
function calculateTravelTime(distance: number, speed: number): number {
  if (speed === 0) {
    return Infinity;
  }
  return distance / speed;
}

export { Spaceship, createSpaceship, distanceBetweenPlanets, calculateTravelTime };
```

### Unit Tests

To top it off, we need solid unit tests to check the funtionality of our spaceship codebase. Using the `type-scriptor -f spaceship.ts -t`, we generate unit tests in about 10 seconds to ensure the exepected behavior of our code.

```typescript
const { Spaceship, createSpaceship, distanceBetweenPlanets, calculateTravelTime } = require('./spaceship.ts');

describe('Spaceship', () => {
  let spaceship;

  beforeEach(() => {
    spaceship = createSpaceship('Test', 1);
  });

  it('should create a new Spaceship instance', () => {
    expect(spaceship instanceof Spaceship).toBe(true);
  });

  it('should set the name, crewSize, speed and fuel properties', () => {
    expect(spaceship.name).toEqual('Test');
    expect(spaceship.crewSize).toEqual(1);
    expect(spaceship.speed).toEqual(0);
    expect(spaceship.fuel).toEqual(100);
  });

  it('should increase the speed of the spaceship and reduce the fuel when accelerating', () => {
    const initialSpeed = spaceship.speed;
    const initialFuel = spaceship.fuel;
    spaceship.accelerate(10);
    expect(spaceship.speed).toEqual(initialSpeed + 10);
    expect(spaceship.fuel).toEqual(initialFuel - 1);
  });

  it('should decrease the speed of the spaceship and reduce the fuel when decelerating', () => {
    spaceship.accelerate(10);
    const initialSpeed = spaceship.speed;
    const initialFuel = spaceship.fuel;
    spaceship.decelerate(5);
    expect(spaceship.speed).toEqual(initialSpeed - 5);
    expect(spaceship.fuel).toEqual(initialFuel - 0.5);
  });

  it('should not decrease the speed below 0 when decelerating', () => {
    spaceship.accelerate(5);
    spaceship.decelerate(10);
    expect(spaceship.speed).toEqual(0);
  });

  it('should reduce the fuel when consuming fuel', () => {
    const initialFuel = spaceship.fuel;
    spaceship.consumeFuel(10);
    expect(spaceship.fuel).toEqual(initialFuel - 1);
  });

  it('should not reduce the fuel below 0 when consuming fuel', () => {
    const initialFuel = spaceship.fuel;
    spaceship.consumeFuel(110);
    expect(spaceship.fuel).toEqual(0);
  });

  it('should increase the fuel level when refueling', () => {
    const initialFuel = spaceship.fuel;
    spaceship.refuel(25);
    expect(spaceship.fuel).toEqual(initialFuel + 25);
  });

  it('should not increase the fuel level above 100 when refueling', () => {
    const initialFuel = spaceship.fuel;
    spaceship.refuel(150);
    expect(spaceship.fuel).toEqual(100);
  });

  it('should increase the crew size when boarding crew members', () => {
    const initialCrewSize = spaceship.crewSize;
    spaceship.boardCrew(2);
    expect(spaceship.crewSize).toEqual(initialCrewSize + 2);
  });

  it('should decrease the crew size when disembarking crew members', () => {
    const initialCrewSize = spaceship.crewSize;
    spaceship.disembarkCrew(1);
    expect(spaceship.crewSize).toEqual(initialCrewSize - 1);
  });

  it('should not decrease the crew size below 0 when disembarking crew members', () => {
    spaceship.disembarkCrew(2);
    expect(spaceship.crewSize).toEqual(0);
  });
});

describe('distanceBetweenPlanets', () => {
  it('should calculate the distance between two planets', () => {
    const planetA = { x: 10, y: 20 };
    const planetB = { x: 30, y: 40 };
    const expectedDistance = 28.284271247461902;
    expect(distanceBetweenPlanets(planetA, planetB)).toEqual(expectedDistance);
  });
});

describe('calculateTravelTime', () => {
  it('should calculate the travel time when speed is greater than 0', () => {
    const distance = 100;
    const speed = 50;
    const expectedTime = 2;
    expect(calculateTravelTime(distance, speed)).toEqual(expectedTime);
  });

  it('should return infinity when speed is 0', () => {
    const distance = 100;
    const speed = 0;
    expect(calculateTravelTime(distance, speed)).toEqual(Infinity);
  });
});
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

