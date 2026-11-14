# Xinyu Fang · Personal Homepage

参考 https://hatchetproject.github.io/ 的布局制作的独立静态主页模板。没有使用参考作者的照片、论文、个人经历或源代码。

按用户提供的清单和后续修改保留 7 篇真实论文，7 篇均已配备真实主图；个人简介、联系方式、动态、学术服务与经历仍为占位。网页无需安装依赖，可直接托管于 GitHub Pages。

## 修改内容

- 编辑 `profile.js`：姓名、简介、联系方式、动态、论文、学术服务与经历都在同一个文件里。
- `service` 栏目用于填写审稿服务，按 Conferences 和 Journals 列出会议、期刊名称及年份。
- 更换头像：用自己的图片替换 `assets/avatar.svg`，或更改 `profile.js` 的 `avatar` 路径。
- 更换论文配图：更改每篇论文的 `image` 路径。
- 论文真实配图保存在 `assets/publications/`，来源记录见其中的 `SOURCES.md`。图片直接在页面完整展示，不设置点击操作。`imagePending: true` 表示尚缺方法图，补图后将其设为 `false`。
- 论文按数组顺序和 `group` 分组，完整作者填写为数组，只有与个人姓名完全一致的作者会加粗。
- 需要标注通讯作者时，在论文的 `correspondingAuthors` 数组中填入作者姓名，页面会显示 † 和说明。
- 填写完整的 `https://` 链接即可启用论文、代码、项目等链接，留空则不显示按钮。
- 不需要的列表可以设为空数组；如需完全隐藏栏目，可删除 `index.html` 中对应的 section 和导航，并移除 `main.js` 中对应的渲染行。
- 修改页面颜色、字号、宽度和布局：编辑 `assets/style.css`。
- 论文使用参考页的固定左右排版：图片 40%，文字 60%；Trebuchet MS / Helvetica，15px，1.5 倍行距。窄屏统一为文字在上、图片在下。图片完整展示且不设点击；论文总结暂不渲染，原始简介保留在配置中。
- 正式使用时，可删除 `assets/main.js` 中的「模板预览」提示，并更新 `index.html` 的 description。

## 本地查看

在此目录运行 `python3 -m http.server 8000`，浏览器打开 http://localhost:8000。

## GitHub Pages

将这些文件放在 `1-fang/1-fang.github.io` 仓库的 main 分支根目录。
在仓库 Settings → Pages 中选择 Deploy from a branch → main → / (root)。
发布后地址：https://1-fang.github.io/

## 文件结构

```
index.html        页面结构
profile.js        个人内容配置
assets/main.js    内容渲染和导航
assets/style.css  桌面及手机样式
assets/*.svg      原创占位图
.nojekyll         让 GitHub Pages 直接提供静态文件
```
