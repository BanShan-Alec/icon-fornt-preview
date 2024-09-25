import { workspace } from 'vscode';

/**
 * 获取文件后缀
 * @param filename
 * @returns
 */
export const getFileType = (filename: string, withDot: boolean = true) => {
    const regex = /\.[^.]+$/;
    const match = filename.match(regex);
    const value = match ? match[0] : null;
    if (!value) {
        return value;
    }
    if (withDot) {
        return value;
    }
    return value.replace('.', '');
};

/**
 * 判断是否为json 文件
 * @param filename
 * @returns
 */
export const isJsonFile = (filename: string) => {
    const ext = getFileType(filename);
    if (!ext) {
        return false;
    }
    return ext.toUpperCase().includes('JSON');
};

export const getWorkspacePath = () => {
    const workspaceFolders = workspace.workspaceFolders;
    const isWorkspaceEmpty = !workspaceFolders || workspaceFolders.length === 0;
    if (isWorkspaceEmpty) {
        return '';
    }
    return workspaceFolders[0].uri.fsPath;
};
