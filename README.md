# How to Use

The plugin dependency on localPath's `iconfont-js`.

The `remotePath` is an optional configuration for automatically updating local `iconfont-js`.

## Config

> edit `.vscode/settings.json`
```json
{
    "iconfont-js-helper.tagName": "Icon",
    "iconfont-js-helper.propName": "name",
    "iconfont-js-helper.entries": [
        {
            // `localPath` is Requirement config
            // Support relative path: default relative to current workspace
            "localPath": "./iconfont.js",
        },
        {
            // Support absolute path
            "localPath": "G:/icon-fornt-preview/test/icon-font-preview-test/iconfont copy.js",
            // `remotePath` is Optional config
            "remotePath": "https://at.alicdn.com/t/c/xxx.js"
        }
    ]
}
```

## Use RemotePath
> get remotePath from `Ali`，remotePath is `Optional` config

![ali-icon](https://raw.githubusercontent.com/BanShan-Alec/icon-fornt-preview/main/assets/ali-icon.png)


## Mouse hover
![hover](https://raw.githubusercontent.com/BanShan-Alec/icon-fornt-preview/main/assets/hover.png)

## Code completion
![completion](https://raw.githubusercontent.com/BanShan-Alec/icon-fornt-preview/main/assets/complet.png)

## Commands

### Update Icons

> After setting a valid remotePath，you can `Update Icons` with commands.
>
> It also support auto git commit after all iconfont.js update success.

### Overwrite Icons

> The `Overwrite Icons` command forcibly overwrites the local file with the content from remotePath without any file comparison.
> 
> If the `localPath` does not exist, it will create a new iconfont.js file.
>
> Differences between `Update Icons` and `Overwrite Icons`:
> - `Update Icons`: Only updates when the remote file differs from the local file
> - `Overwrite Icons`: Overwrites the local file with the remote file regardless of whether they are the same

![update](https://raw.githubusercontent.com/BanShan-Alec/icon-fornt-preview/main/assets/update-cmd.png)


