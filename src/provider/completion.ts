import { CompletionItem, CompletionItemKind, Position, Range, languages } from 'vscode';
import type { CompletionItemProvider, ExtensionContext } from 'vscode';
import { gePropNameTernaryReg, getPropNameReg, LANGUAGE_IDS } from '../utils/constant';
import { IconService } from '../service/icon';
import { getIconMarkDown } from '../utils/markdown';

export function registerCompletion(
    context: ExtensionContext,
    options: {
        tagName: string;
        propName: string;
    }
) {
    const { tagName, propName } = options;
    const PROP_NAME_RE = getPropNameReg(tagName, propName);
    const PROP_NAME_TERNARY_RE = gePropNameTernaryReg(tagName, propName);

    const iconProvider: CompletionItemProvider = {
        provideCompletionItems(document, position) {
            // 判断是否符合tagName & propName的正则，例如<Icon name="xxx" />
            const line = document.getText(
                new Range(
                    new Position(Math.max(0, position.line - 5), 0),
                    new Position(position.line, position.character)
                )
            );

            if (!PROP_NAME_RE.test(line) && !PROP_NAME_TERNARY_RE.some((reg) => reg.test(line))) return null;

            const completionItems: CompletionItem[] = IconService.getAllIconSymbol().map((symbol) => {
                const item = new CompletionItem(symbol, CompletionItemKind.Color);
                // item.detail = symbol;
                item.documentation = getIconMarkDown(symbol);
                return item;
            });

            return completionItems;
        },
    };

    context.subscriptions.push(languages.registerCompletionItemProvider(LANGUAGE_IDS, iconProvider, '"', "'"));
}
