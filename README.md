# How to Use

## Config
> edit `.vscode/settings.json`
```json
{
    "iconfont-js-helper.tagName": "Icon",
    "iconfont-js-helper.propName": "name",
    "iconfont-js-helper.entries": [
        {
            // Relative path: default relative to current workspace
            "localPath": "./iconfont.js",
            "remotePath": "https://at.alicdn.com/t/c/xxx.js"
        },
        {
            // Absolute path
            "localPath": "G:/icon-fornt-preview/test/icon-font-preview-test/iconfont copy.js",
            "remotePath": "https://at.alicdn.com/t/c/xxx.js"
        }
    ]
}
```

## Use RemotePath
> get remotePath from `Ali`，remotePath is `Optional` config

![ali-icon](https://github.com/BanShan-Alec/icon-fornt-preview/blob/main/assets/ali-icon.png)


## Mouse hover
![hover](https://github.com/BanShan-Alec/icon-fornt-preview/blob/main/assets/hover.png)

## Code completion
![completion](https://github.com/BanShan-Alec/icon-fornt-preview/blob/main/assets/complet.png)

## Update Icons

> After setting a valid remotePath，you can `Update Icons` with commands.
>
> It also support auto git commit after all iconfont.js update success.

![update](https://github.com/BanShan-Alec/icon-fornt-preview/blob/main/assets/update-cmd.png)
