module.exports = {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
        "<rootDir>/setup-jest.ts"
    ],
    globalSetup: "jest-preset-angular/global-setup",
    modulePaths: ["<rootDir>"],
    "setupTestFrameworkScriptFile": "<rootDir>/setup-jest.ts",
    "moduleNameMapper": {
        "@oshc(.*)": "<rootDir>/src/app/modules/oshc/$1",
        "@shared(.*)": "<rootDir>/src/app/@shared/$1"
    },
    "moduleDirectories": [ "node_modules", "src" ],
    "transformIgnorePatterns": [
        //"node_modules/(?!@ngrx|ngx-socket-io)", // List any packages here that error
    ],
    "transform": {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular'
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/cypress/"
    ]
};