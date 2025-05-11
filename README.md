# Automation Exercise

This repository contains automated tests for the Automation Exercise website using Playwright with TypeScript.

## Installation Guide

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn package manager

2. **Installation Steps**
   ```bash
   # Clone the repository
   git clone https://github.com/minhnguyenqc87/automation-exercise.git
   cd automation-exercise

   # Install dependencies
   yarn install

   # Install Playwright browsers
   npx playwright install
   ```

3. **Running Tests**
   ```bash
   # Run all tests
   yarn test

   # Run API Test Case
   yarn test:api

   # Run Test Case 001
   yarn test:tc001
   
   # Run Test Case 2
   yarn test:tc002
   ```
## Project Structure

```
automation-exercise/
├── tests/
│   ├── api/                    # API test implementations
│   │   ├── services/          # API service implementations
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   └── product.service.ts
│   │   └── base/             # Base API configurations
│   │       ├── api.config.ts
│   │       └── api.base.ts
│   │
│   ├── core/                  # Core utilities and helpers
│   │   ├── setup/            # Test setup and configurations
│   │   │   ├── test.setup.ts
│   │   │   └── env.config.ts
│   │   └── utils/            # Utility functions and helpers
│   │       ├── test.utils.ts
│   │       └── data.utils.ts
│   │
│   ├── pages/                # Page Object Models
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   └── login.page.ts
│   │
│   └── specs/               # Test specifications
│       ├── api/            # API test specifications
│       │   ├── product.spec.ts
│       │   └── brand.spec.ts
│       └── tc/             # Test case folders
│           ├── tc001/      # Test case 001
│           │   ├── tc001.spec.ts
│           │   └── tc001.data.ts
│           └── tc002/      # Test case 002
│               ├── tc002.spec.ts
│               └── tc002.data.ts
│
├── test-results/           # Test execution results
├── playwright-report/      # Playwright HTML reports
├── playwright.config.ts    # Playwright configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .eslintrc.json       # ESLint configuration
```

## API Tests (`tests/api/`)

The API folder contains tests for API endpoints. These tests verify:
- API response status codes
- Response payload structure
- Data validation
- API integration scenarios

## Core Utilities (`tests/core/`)

The core folder contains essential utilities and helpers:
- Custom commands and assertions
- Test data generators
- Environment configuration
- Common test utilities
- Shared functions and constants

## Page Object Models (`tests/pages/`)

The pages folder implements the Page Object Model (POM) pattern:
- Each page class represents a web page
- Encapsulates page-specific selectors and methods
- Provides reusable page interactions
- Maintains separation between test logic and page structure

## Test Specifications (`tests/specs/`)

The specs folder contains the actual test cases:
- Organized by feature or functionality
- Implements test scenarios
- Uses Page Objects for interactions
- Contains test data and assertions

## Additional Information

- **Configuration**: The project uses `playwright.config.ts` for test configuration
- **TypeScript**: The project is written in TypeScript for better type safety
- **ESLint**: Code quality is maintained using ESLint
- **Prettier**: Code formatting is handled by Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 