export const getPropNameReg = (tagName: string, propName: string) =>
    new RegExp(`<${tagName}[\\s\\n\\t][\\s\\S^>]*?${propName}={?['"][\\w-]*$`);
export const gePropNameTernaryReg = (tagName: string, propName: string) => [
    new RegExp(`<${tagName}[\\s\\n\\t][\\s\\S^>]*?${propName}={[\\s\\S^'^"^}]*?\\?[\\s\\n\\t]*['"][\\w-]*$`),
    new RegExp(
        `<${tagName}[\\s\\n\\t][\\s\\S^>]*?${propName}={[\\s\\S^'^"^}]*?\\?[\\s\\n\\t]*(['"])[\\w-]*?\\1[\\s\\n\\t]*:[\\s\\n\\t]*['"][\\w-]*$`
    ),
];
export const LANGUAGE_IDS = ['vue', 'typescript', 'javascript', 'javascriptreact', 'typescriptreact'];
