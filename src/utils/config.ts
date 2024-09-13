import { workspace } from 'vscode';

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
    tagName: 'icon',
    propName: 'name',
    entries: [],
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
    });

    return config;
};
