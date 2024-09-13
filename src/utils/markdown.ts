import { MarkdownString, Uri } from 'vscode';
import { IconService } from '../service/icon';

export function getIconMarkDown(symbol: string) {
    const code = IconService.getIconBySymbol(symbol)?.code;
    if (!code) {
        return;
    }
    const url = Uri.parse(`data:image/svg+xml;utf8,${code}`);
    const icon = `<img height="64" src="${url.toString(true)}" >`;
    // TODO isFilledColor
    const markdownString = new MarkdownString(`<p align="center">${icon}</p> \n <p align="center">${symbol}</p> \n`);
    markdownString.supportHtml = true;

    return markdownString;
}
