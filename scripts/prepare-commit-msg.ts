import { execSync } from 'child_process';

if (process.platform === 'win32') {
    execSync(`start cmd /c yarn git-cz --hook`);
} else {
    execSync(`exec < /dev/tty && git-cz --hook`, { stdio: 'inherit' });
}
