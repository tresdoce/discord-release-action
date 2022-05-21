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
const axios_1 = __importDefault(require("axios"));
const webhook = 'https://discord.com/api/webhooks/976295901737914378/3MDpf4sHU1cVZ5dal7qwnnqQeCIukj_RBXMvlC3EcZ3CO4iYz68-EsVDG4bkmpqXWGUP';
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
        const getReleaseResponse = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
            baseUrl: 'https://api.github.com',
            owner,
            repo,
            tag,
        });
        const { data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl, name: name, body: body, draft: draft, prerelease: prerelease, author: author, }, } = getReleaseResponse;
        console.log(getReleaseResponse);
        console.log(`Got release info: '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${name}', '${draft}', '${prerelease}', '${body}', '${author}'`);
        const payload = {
            username: 'GitHub',
            avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
            content: `🎉  New release of [**${name}**](${htmlUrl}) is out!\n\n\n**✨ Features**\n\n* **typeorm:** add typeorm module with test container ([c3b089f](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/c3b089f74037e186bb32a35b598323658540d90f))\n\n\n**📝 Docs**\n\n* **readme:** add test utils in table toolkit ([fc33307](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/fc3330735fb9b2a511c07a7f7e157803b19b2d98))\n* **readme:** edit badge of version ([e82e040](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/e82e040cd43fb756ca36b8cb88fe1daf3a8c4f4c))\n\n\n**👨‍💻 Chores**\n\n* edit package json ([576cdc6](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/576cdc6b97b15437639f3debfb5bc96687c41be8))\n* edit test ([cd86f76](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/cd86f76e5002bf494b8dafb397702464c3d85223))\n* **sonar:** edit sonar args ([441d22c](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/441d22c63bb5b66a46b3a9a4e331f8e45fb811c6))\n* **test-utils:** add singleton of test container ([e2c9d55](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/e2c9d551db82b32712e969b0ed3428d8dced3369))\n* **test-utils:** edit package ([ec4a3d7](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/ec4a3d7902b74b01ffc300adaaf307dedd209648))\n* **typeorm:** edit test ([cf8f8ed](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/cf8f8ed2517be62ee429f719170a89a80990eadb))\n* work with test ([130be13](https://github.com/tresdoce/tresdoce-nestjs-toolkit/commit/130be138000d4fdc93bf103003c5fd4ec70467c2))\n\n`,
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
        axios_1.default
            .post(webhook, payload)
            .then((res) => {
            core.setOutput('result', 'Webhook sent');
        })
            .catch((error) => {
            if (error instanceof Error)
                core.setFailed(`Post to webhook failed, ${error}`);
        });
    }
    catch (error) {
        if (error instanceof Error)
            core.setFailed(error.message);
    }
};
exports.run = run;
//# sourceMappingURL=action.js.map