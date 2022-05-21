import * as core from '@actions/core';
import * as github from '@actions/github';

export const run = async (): Promise<void> => {
  try {
    const gh_token = core.getInput('GITHUB_TOKEN');
    console.log(`GITHUB_TOKEN: ${gh_token}`);
    const owner = core.getInput('owner');
    console.log(`OWNER: ${owner}!`);
    const repo = core.getInput('repo');
    console.log(`REPO: ${repo}!`);
    const tag = core.getInput('tag');
    console.log(`TAG: ${tag}!`);

    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const octokit = github.getOctokit(gh_token);
    // https://api.github.com/repos/tresdoce/tresdoce-nestjs-toolkit/releases/tags/@tresdoce-nestjs-toolkit/typeorm@0.1.0-beta.0
    const data = await octokit.request.endpoint('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
      baseUrl: 'https://api.github.com',
      owner,
      repo,
      tag,
    })
    /*const data = octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
      baseUrl: 'https://api.github.com',
      owner,
      repo,
      tag,
    });*/

    console.log(data);

    //const time = new Date().toTimeString();
    //core.setOutput('Time', time);
    //const payload = JSON.stringify(github.context.payload, undefined, 0);
    //console.log(`The Event Payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};
