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
            "remotePath": "https://at.alicdn.com/t/c/font_4172623_rfo0lkc7zd.js"
        },
        {
            // Absolute path
            "localPath": "G:/icon-fornt-preview/test/icon-font-preview-test/iconfont copy.js",
            "remotePath": "https://at.alicdn.com/t/c/font_3764609_3s7v85xv8iq.js"
        }
    ]
}
```

## Use RemotePath
> get remotePath from `Ali`，remotePath is `Optional` config

![ali-icon](https://github.com/zhoutengshen/icon-fornt-preview/blob/main/doc/ali-icon.png)


## Mouse hover
![hover](https://github.com/zhoutengshen/icon-fornt-preview/blob/main/doc/dome.jpg)

![image-20240916161355996](README.assets/image-20240916161355996.png)

![image-20240916161136192](README.assets/image-20240916161136192.png)

## Code completion
![completion](https://github.com/zhoutengshen/icon-fornt-preview/blob/main/doc/dome-hover.png)

## Update Icons

> After setting a valid remotePath，you can `Update Icons` with commands.
>
> It also support auto git commit after all iconfont.js update success.

![image-20240916160457874](README.assets/image-20240916160457874.png)