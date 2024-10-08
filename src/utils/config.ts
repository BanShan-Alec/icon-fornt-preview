import { isAbsolute, resolve } from 'path';
import { workspace } from 'vscode';
import { getWorkspacePath } from './file';

export interface IConfig {
    /** 标签名称 */
    tagName: string;
    /** 属性名 */
    propName: string;
    /** iconfont.js 入口路径 */
    entries: Array<{
        localPath: string;
        remotePath?: string;
    }>;
}

export const DEFAULT_CONFIG: IConfig = {
    tagName: 'Icon',
    propName: 'name',
    entries: [],
};

const handleLocalPath = (localPath: string) => {
    const rootPath = getWorkspacePath();

    if (isAbsolute(localPath) || !rootPath) {
        return localPath;
    }
    return resolve(rootPath, localPath);
};

export const getConfig = (name: string) => {
    const orginConfig = workspace.getConfiguration(name);
    const config: IConfig = { ...DEFAULT_CONFIG };

    Object.keys(config).forEach((_key) => {
        const key = _key as keyof IConfig;
        const value = orginConfig.get(key) as any;

        if (value) {
            config[key] = value;
        }
        if (key === 'entries') {
            config[key] = value.map((entry: any) => ({
                ...entry,
                localPath: handleLocalPath(entry.localPath),
            }));
        }
    });

    return config;
};
