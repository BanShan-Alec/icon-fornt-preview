import { execSync } from 'child_process';
import { getWorkspacePath } from './file';

export function genCommit(folderPaths: string[], message: string) {
    const rootPath = getWorkspacePath();
    try {
        folderPaths.forEach((path) => {
            execSync(`git add ${path}`, { stdio: 'inherit', cwd: rootPath });
        });

        // 提交更改
        execSync(`git commit -m "${message}"`, { stdio: 'inherit', cwd: rootPath });
    } catch (error: any) {
        console.log('genCommit error: ', error.message, folderPaths);
    }
}
