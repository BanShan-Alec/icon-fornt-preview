import { Uri } from 'vscode';

export const isNetworkUrl = (url: string | Uri) => {
    if (typeof url === 'string') {
        try {
            const u = Uri.parse(url);
            return ['http', 'https'].includes(u.scheme);
        } catch (error) {
            return false;
        }
    }
    return ['http', 'https'].includes(url.scheme);
};

export const getHash = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
