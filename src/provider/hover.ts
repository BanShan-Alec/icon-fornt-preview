import type { ExtensionContext, HoverProvider } from 'vscode';
import { Hover, Position, Range, languages } from 'vscode';
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
            const line = document.getText(
                new Range(
                    new Position(Math.max(0, position.line - 5), 0),
                    new Position(position.line, position.character)
                )
            );

            if (!PROP_NAME_RE.test(line) && !PROP_NAME_TERNARY_RE.some((reg) => reg.test(line))) return null;

            const word = document.getText(document.getWordRangeAtPosition(position));
            const markdownString = getIconMarkDown(word);
            if (!markdownString) return null;

            return new Hover(markdownString);
        },
    };

    context.subscriptions.push(languages.registerHoverProvider(LANGUAGE_IDS, hoverProvider));
}
