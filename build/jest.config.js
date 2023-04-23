"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};
exports.default = config;
