// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');
config.testMatch = ['**/?(*.)+(spec).[tj]s?(x)'];

module.exports = config;
