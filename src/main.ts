import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const gh_token = core.getInput('GITHUB_TOKEN');
    console.log(`GITHUB_TOKEN: ${gh_token}!`);

    //const time = new Date().toTimeString();
    //core.setOutput('Time', time);
    const payload = JSON.stringify(github.context.payload, undefined, 0);
    console.log(`The Event Payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
