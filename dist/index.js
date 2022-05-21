"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
try {
    const yourName = core_1.default.getInput('name-of-user');
    console.log(`Hello ${yourName}!`);
    const time = new Date().toTimeString();
    core_1.default.setOutput('Time', time);
    const payload = JSON.stringify(github_1.default.context.payload, undefined, 0);
    console.log(`The Event Payload: ${payload}`);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
//# sourceMappingURL=index.js.map