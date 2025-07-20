// jest.config.js
import  {defaults} from 'jest-config';

/** @type {import('jest').Config} */
const config = {
    moduleDirectories: [...defaults.moduleDirectories],
    testEnvironment: 'node',
    testMatch: ['**/_tests_/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    /*transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },*/
    testTimeout: 10000,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coverageReporters: ['json', 'text', 'html'],
};

export default config;