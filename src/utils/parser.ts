import fs from 'fs';
import { parseFragment, serializeOuter, DefaultTreeAdapterMap } from 'parse5';
import { isTruthy } from '.';

export interface IIconItem {
    symbol: string;
    code: string;
    isFilledColor?: boolean;
    projectId?: string;
}

export interface IIconFontInfo {
    projectId: string;
    localPath: string;
    remotePath?: string;
    items: IIconItem[];
}

async function callIconFontJs(path: string) {
    const window: Record<string, string> = Object.create(null);
    try {
        // eval会读取局部作用域的windows变量，不会污染全局变量
        const code = await fs.promises.readFile(path, 'utf-8');
        eval(code);
    } catch (error) {
        // do nothing
    }
    return window;
}

function transformSymbolToSvg(symbol: DefaultTreeAdapterMap['element']) {
    symbol.tagName = 'svg';
    symbol.attrs.push(
        { name: 'xmlns', value: 'http://www.w3.org/2000/svg' },
        { name: 'width', value: '200' },
        { name: 'height', value: '200' }
    );
    return symbol;
}

function isSvgFilledColor(svg: DefaultTreeAdapterMap['element']) {
    return svg.childNodes.some((child) => {
        if (child.nodeName !== 'path') {return false;}
        const fill = child.attrs?.find((attr) => attr.name === 'fill')?.value;
        return fill && !['none', 'transparent', 'inherit', 'currentColor', 'url(#gradient)'].includes(fill);
    });
}

export async function getIconFontInfo(path: string): Promise<IIconFontInfo> {
    const obj = await callIconFontJs(path);

    const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));

    if (arr.length === 0) {
        throw new Error(`"${path}" is a invalid iconfont file`);
    }

    // key: _iconfont_svg_string_3446014
    const projectId = arr[0].key.split('_')[4];

    // parse code To AST
    const code = arr[0].value as string;
    const document = parseFragment(code);
    const svgDom = document.childNodes[0];

    if (!svgDom || svgDom.nodeName !== 'svg') {
        throw new Error(`"${path}" is a invalid iconfont file`);
    }

    // parse code To IconItem
    const items = Array.from(svgDom.childNodes)
        .map((child) => {
            if (child.nodeName !== 'symbol') {return;}

            return {
                symbol: child.attrs?.find((attr) => attr.name === 'id')?.value || '',
                code: serializeOuter(transformSymbolToSvg(child)),
                isFilledColor: isSvgFilledColor(child),
                projectId,
            };
        })
        .filter(isTruthy);

    return {
        projectId,
        localPath: path,
        items,
    };
}
