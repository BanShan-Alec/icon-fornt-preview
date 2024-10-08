import { ExtensionContext, workspace } from 'vscode';
import { name as extName } from '../package.json';
import { getConfig } from './utils/config';
import { IconService } from './service/icon';
import { registerHover } from './provider/hover';
import { registerCommands } from './provider/commands';
import { registerCompletion } from './provider/completion';

export async function activate(context: ExtensionContext) {
    console.log(`${extName} is activated`);
    const config = getConfig(extName);
    await IconService.load(config.entries);

    // 注册命令
    context.subscriptions.push(configChangeListener);
    registerHover(context, {
        ...config,
    });
    registerCommands(context, {
        extName,
    });
    registerCompletion(context, {
        ...config,
    });
}
export function deactivate() {
    // 插件停用时的清理工作
    IconService.reset();
}

const configChangeListener = workspace.onDidChangeConfiguration((event) => {
    // 检查特定配置是否发生变化
    if (event.affectsConfiguration(`${extName}.entries`)) {
        // 处理配置变化
        const config = getConfig(extName);
        console.log(`配置已更改: ${JSON.stringify(config)}`);
        // TODO iconfont.js 内容变化时，要触发重新Load
        IconService.load(config.entries);
    }
});
