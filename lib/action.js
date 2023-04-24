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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const http_client_1 = __importDefault(require("./http-client"));
const run = async () => {
    try {
        const gh_token = core.getInput('GITHUB_TOKEN');
        const owner = core.getInput('owner');
        const repo = core.getInput('repo');
        const webhook = core.getInput('webhook');
        console.log('GH_TOKEN: ', gh_token);
        console.log('OWNER: ', owner);
        console.log('REPO: ', repo);
        console.log('WEBHOOK: ', webhook);
        const octokit = github.getOctokit(gh_token);
        const getLatestTag = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            baseUrl: 'https://api.github.com',
            owner,
            repo,
        });
        console.log('Latest Tag: ', getLatestTag);
        const { data: { html_url: htmlUrl, name, body }, } = getLatestTag;
        if (body) {
            const changelog = body === null || body === void 0 ? void 0 : body.replace(/#/g, '').replace(/\r/g, '').split('\n\n\n');
            changelog[0] = `🎉  New release of [**${name}**](${htmlUrl}) is out!`;
            const content = `${changelog.join('\n\n\n')}`;
            const payload = {
                username: 'GitHub',
                avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
                content,
                embeds: [
                    {
                        title: `${name}`,
                        url: `${htmlUrl}`,
                        description: '',
                        color: '3066993',
                        image: {
                            url: `https://opengraph.githubassets.com/4e71dd5db14974f45c97e2243f65f904e5ac12996c498f4655ef434c8d1575d3/${owner}/${repo}/releases/tag/${name}`,
                        },
                    },
                ],
            };
            await http_client_1.default.post(webhook, {
                data: JSON.stringify(payload),
            });
        }
    }
    catch (error) {
        if (error instanceof Error)
            core.setFailed(error.message);
    }
};
exports.run = run;
//# sourceMappingURL=action.js.map