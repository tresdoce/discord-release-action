"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const run = async () => {
    try {
        const gh_token = core.getInput('GITHUB_TOKEN');
        console.log(`GITHUB_TOKEN: ${gh_token}`);
        const owner = core.getInput('owner');
        console.log(`OWNER: ${owner}!`);
        const repo = core.getInput('repo');
        console.log(`REPO: ${repo}!`);
        const tag = core.getInput('tag');
        console.log(`TAG: ${tag}!`);
        const octokit = github.getOctokit(gh_token);
        const data = octokit.request.endpoint('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
            baseUrl: 'https://api.github.com',
            owner,
            repo,
            tag,
        });
        console.log(data);
    }
    catch (error) {
        if (error instanceof Error)
            core.setFailed(error.message);
    }
};
exports.run = run;
//# sourceMappingURL=action.js.map