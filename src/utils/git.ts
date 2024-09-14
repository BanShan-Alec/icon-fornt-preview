import { execSync } from 'child_process';

export function genCommit(folderPaths: string[], message: string) {
    try {
        folderPaths.forEach((path) => {
            execSync(`git add ${path}`, { stdio: 'inherit' });
        });

        // 提交更改
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    } catch (error: any) {
        console.log('genCommit error: ', error.message, folderPaths);
    }
}
