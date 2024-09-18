import { MarkdownString, Uri } from 'vscode';
import { IconService } from '../service/icon';
import { changeSvgColor, toDataUrl } from './svg';

export function getIconMarkDown(symbol: string, options?: { onlyIcon?: boolean; fontSize?: number }) {
    const { onlyIcon = false, fontSize = 24 } = options || {};

    const info = IconService.getIconBySymbol(symbol);
    if (!info) {
        return;
    }
    const { code, projectId, isFilledColor } = info;
    const icon = toDataUrl(changeSvgColor(code));
    // TODO 本地预览，url为远程预览
    const url = `https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=${projectId}`;

    let MS: MarkdownString;
    if (onlyIcon) {
        MS = new MarkdownString(getImgMarkDown(icon, fontSize));
    } else {
        MS = new MarkdownString(
            `| |\n|:---:|\n| ${getImgMarkDown(
                icon,
                fontSize
            )} |\n| [\`${symbol}\`](${url}) |\n \` isFilledColor: ${!!isFilledColor} \` \n`
        );
    }

    MS.supportHtml = true;
    return MS;
}

function getImgMarkDown(src: string, size: number) {
    return `<img src="${src}" width="${size}" height="${size}">`;
}
