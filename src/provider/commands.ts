import type { ExtensionContext } from 'vscode';
import { commands, window } from 'vscode';
import { getConfig } from '../utils/config';
import { IconService } from '../service/icon';
import { IIconFontInfo } from '../utils/parser';
import { downloadIconFont, saveIconFont } from '../utils/download';
import { DEFAULT_COMMIT_MESSAGE } from '../utils/constant';
import { genCommit } from '../utils/git';

export function registerCommands(
    ctx: ExtensionContext,
    options: {
        extName: string;
    }
) {
    const { extName } = options;

    ctx.subscriptions.push(
        commands.registerCommand(`${extName}.preview`, () => {
            // TODO 预览所有的icons
        })
    );
    ctx.subscriptions.push(
        commands.registerCommand(`${extName}.reload`, () => {
            const config = getConfig(extName);
            IconService.load(config.entries);
        })
    );
    ctx.subscriptions.push(
        commands.registerCommand(`${extName}.update-icons`, async () => {
            for (let index = 0; index < IconService.getIconFontList().length; index++) {
                const info = IconService.getIconFontList()[index];
                await updateIcon(info);
            }
            // 更新成功，reload config
            const config = getConfig(extName);
            IconService.load(config.entries);
        })
    );
    ctx.subscriptions.push(
        commands.registerCommand(`${extName}.update-icons-auto-commit`, async () => {
            for (let index = 0; index < IconService.getIconFontList().length; index++) {
                const info = IconService.getIconFontList()[index];
                await updateIcon(info);
            }
            // 更新成功，reload config
            const config = getConfig(extName);
            IconService.load(config.entries);
            // 显示输入框
            const userInput = await window.showInputBox({
                placeHolder: 'please input your commit message',
                prompt: `enter empty message will use: ${DEFAULT_COMMIT_MESSAGE}`,
            });
            // 生成commit
            const filePaths = config.entries.map((entry) => entry.localPath);
            genCommit(filePaths, userInput || DEFAULT_COMMIT_MESSAGE);
        })
    );

    async function updateIcon(info: IIconFontInfo) {
        const { remotePath, localPath } = info;
        try {
            if (!remotePath) throw new Error('remotePath is empty');
            const code = await downloadIconFont(remotePath);
            await saveIconFont(localPath, code);
            window.showInformationMessage(`${extName}.update-icons success: ${localPath}`);
        } catch (error: any) {
            window.showInformationMessage(`${extName}.update-icons fail: ${error.message}, ${localPath}`);
        }
    }
}
