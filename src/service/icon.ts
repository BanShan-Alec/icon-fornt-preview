import { isEmpty } from 'lodash';
import { IConfig } from '../utils/config';
import { getIconFontInfo, IIconFontInfo, IIconItem } from '../utils/parser';
export class IconService {
    // 列表
    private static iconItemList: IIconItem[] = [];
    private static iconFontList: IIconFontInfo[] = [];
    // Map 映射（用于快速数据查找）
    private static iconItemMap = new Map<string, IIconItem>();

    /** 加载图标 */
    static async load(entries: IConfig['entries']) {
        if (isEmpty(entries)) {
            console.log('IconService load error: entries isEmpty');
            return;
        }
        IconService.reset();
        console.time('IconService load escape');
        for (let index = 0; index < entries.length; index++) {
            const entry = entries[index];
            try {
                const iconFontInfo = await getIconFontInfo(entry.localPath);

                this.iconFontList.push({
                    ...iconFontInfo,
                    remotePath: entry.remotePath,
                });
                this.iconItemList.concat(iconFontInfo.items);
                iconFontInfo.items.forEach((item) => {
                    const key = item.symbol;
                    if (this.iconItemMap.has(key)) {
                        console.warn('IconService load error: icon symbol is same!', entry, item.symbol);
                    }
                    this.iconItemMap.set(key, item);
                });
            } catch (error: any) {
                console.log('IconService load error: this entry is invalid ', entry, error.message);
            }
        }
        console.log('IconService load success: ', this.getAllIconSymbol());
        console.timeEnd('IconService load escape');
    }

    static reset() {
        this.iconFontList = [];
        this.iconItemList = [];
        this.iconItemMap.clear();
    }

    static getIconItemList() {
        return this.iconItemList || [];
    }

    static getIconFontList() {
        return this.iconFontList || [];
    }

    static getIconBySymbol(name: string) {
        return this.iconItemMap.get(name);
    }

    static getAllIconSymbol() {
        return Array.from(this.iconItemMap.keys());
    }
}
