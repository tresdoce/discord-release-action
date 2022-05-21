import * as core from '@actions/core';
import { run } from './action';

if (require.main === module) {
  run()
    .then(() => process.exit(0))
    .catch((error) => {
      core.setFailed(error);
      process.exit(1);
    });
}
