import Base64 from './base64';
import { window } from 'vscode';
import { DARK_COLOR, LIGHT_COLOR } from './constant';

export function toDataUrl(str: string) {
    return `data:image/svg+xml;base64,${Base64.encode(str)}`;
}

export function getSvgColor() {
    const { kind } = window.activeColorTheme;
    if (kind === 2 || kind === 3) return DARK_COLOR;
    else return LIGHT_COLOR;
}

export function changeSvgColor(svg: string, color = getSvgColor()) {
    // 在svg根标签上添加fill属性
    return svg.replace(/fill=".*?"/g, `fill="${color}"`).replace(/<svg/, `<svg fill="${color}"`);
}

// export function pathToSvg(info: IconInfo, fontSize: number) {
//   return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${fontSize * info.ratio}px" height="${fontSize}px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 ${info.width} ${info.height}">${info.body}</svg>`
// }
