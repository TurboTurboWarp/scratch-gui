import {spawnSync} from 'node:child_process';

// Keep local builds reproducible, but resolve the current develop branch on Pages.
if (process.env.CF_PAGES === '1') {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const result = spawnSync(npm, ['update', 'scratch-vm', '--include=dev'], {stdio: 'inherit'});

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}
