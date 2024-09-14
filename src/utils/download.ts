import https from 'https';
import fs from 'fs';
import { getHash, isNetworkUrl } from '.';

export function downloadIconFont(url: string) {
    if (!isNetworkUrl(url)) throw new Error('remotePath is not a network url');

    return new Promise<string>((resolve, reject) => {
        const request = https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.log('[downloadIconFont Error]', url);
                return reject('[downloadIconFont Error]');
            }
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => {
                chunks.push(chunk);
            });
            res.on('end', () => {
                const allData = Buffer.concat(chunks);
                const stringData = allData.toString('utf8'); // 如果数据是字符串，可以指定编码
                // console.log('Received data:', stringData);
                resolve(stringData);
            });
            res.on('error', reject);
        });
        request.end();
        request.on('error', reject);
    });
}

export async function checkNeedUpdate(localPath: string, code: string) {
    const localCode = await fs.promises.readFile(localPath, 'utf-8');
    if (localCode.length !== code.length) {
        return true;
    }
    // 计算hash
    const localPathHash = getHash(localCode);
    const codeHash = getHash(code);

    return localPathHash !== codeHash;
}

export async function saveIconFont(localPath: string, code: string) {
    if (!(await checkNeedUpdate(localPath, code))) {
        throw new Error('iconfont.js is lastest! no need update');
    }

    // 保存文件
    await fs.promises.writeFile(localPath, code);
}
