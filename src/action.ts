import * as core from '@actions/core';
import * as github from '@actions/github';
import httpClient from './http-client';

export const run = async (): Promise<void> => {
  try {
    const gh_token = core.getInput('GITHUB_TOKEN');
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    //const tag = core.getInput('tag');
    const webhook = core.getInput('webhook');

    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const octokit = github.getOctokit(gh_token);
    // https://api.github.com/repos/tresdoce/tresdoce-nestjs-toolkit/releases/tags/@tresdoce-nestjs-toolkit/typeorm@0.1.0-beta.0

    const getLatestTag = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
      baseUrl: 'https://api.github.com',
      owner,
      repo,
    });

    // Get release by tag
    /*
    const getReleaseResponse = await octokit.request(
      'GET /repos/{owner}/{repo}/releases/tags/{tag}',
      {
        baseUrl: 'https://api.github.com',
        owner,
        repo,
        tag,
      },
    );

    console.log(getReleaseResponse);

    const {
      data: {
        id: releaseId,
        html_url: htmlUrl,
        upload_url: uploadUrl,
        name: name,
        body: body,
        draft: draft,
        prerelease: prerelease,
        author: author,
      },
    } = getReleaseResponse;

    console.log(
      `Got release info: '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${name}', '${draft}', '${prerelease}', '${body}', '${author}'`,
    );*/

    const {
      data: { html_url: htmlUrl, name, body },
    } = getLatestTag;

    if (body) {
      console.log(body)
      const changelog = body.replace(/#/g, '').replace(/\r/g, '').split('\n\n\n');
      changelog[0] = `🎉  New release of [**${name}**](${htmlUrl}) is out!`;
      const content = `${changelog.join('\n\n\n')}`;

      const payload = {
        username: 'GitHub',
        avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4', //'https://avatars.githubusercontent.com/u/75711943?s=200&v=4',
        content: content.toString(),
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
      console.log(payload);
      const res = await httpClient.post(webhook, {
        data: payload,
      });
      console.log(res);
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};
