import type { ExtensionContext, HoverProvider } from 'vscode';
import { Hover, MarkdownString, Position, Range, languages } from 'vscode';
import { gePropNameTernaryReg, getPropNameReg, LANGUAGE_IDS } from '../utils/constant';
import { getIconMarkDown } from '../utils/markdown';

export function registerHover(
    context: ExtensionContext,
    options: {
        tagName: string;
        propName: string;
    }
) {
    const { tagName, propName } = options;
    const PROP_NAME_RE = getPropNameReg(tagName, propName);
    const PROP_NAME_TERNARY_RE = gePropNameTernaryReg(tagName, propName);

    const hoverProvider: HoverProvider = {
        provideHover(document, position) {
            // 判断是否符合tagName & propName的正则，例如<Icon name="xxx" />
            const line = document.getText(
                new Range(
                    new Position(Math.max(0, position.line - 5), 0),
                    new Position(position.line, position.character)
                )
            );
            if (!PROP_NAME_RE.test(line) && !PROP_NAME_TERNARY_RE.some((reg) => reg.test(line))) {
                return null;
            }

            // 匹配到propName，查询icon
            // getWordRangeAtPosition: 获取给定位置的单词范围。默认正则为/\w+(-\w+)*|\w+(_\w+)*/
            // 默认正则把`icon-ic_changdi`匹配成`icon-ic` & `changdi`，这是不符合预期的
            const word = document.getText(document.getWordRangeAtPosition(position, /\w+((-|_)\w+)*/));
            const markdownString = getIconMarkDown(word, {
                fontSize: 64,
            });
            if (!markdownString) {
                return new Hover(new MarkdownString(`Icon \`${word}\` is not found`));
            }

            return new Hover(markdownString);
        },
    };

    context.subscriptions.push(languages.registerHoverProvider(LANGUAGE_IDS, hoverProvider));
}
