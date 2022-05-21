import * as core from '@actions/core'
import * as github from '@actions/github';

try {
  const yourName = core.getInput('name-of-user');
  console.log(`Hello ${yourName}!`);
  const time = new Date().toTimeString();
  core.setOutput('Time', time);
  const payload = JSON.stringify(github.context.payload, undefined, 0);
  console.log(`The Event Payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
