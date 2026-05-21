# Fulcrum 博客（Obsidian → GitHub Pages）

`fulcrum/` 目录下的 Markdown 会发布为独立博客，风格类似 Hexo：列表分页、全文阅读、侧边栏搜索与关键词。

## Obsidian 配置

1. 在 Obsidian 设置 → **核心插件** 中启用 **模板**
2. 将模板文件夹设为仓库内的 `_templates`
3. 新建笔记时选择 **Fulcrum博文模板**，保存到 `fulcrum/` 目录

## Front matter 字段

| 字段 | 说明 |
|------|------|
| `title` | 标题（可省略，使用文件名） |
| `permalink` | 英文 URL，如 `/fulcrum/my-post/`（部署必需） |
| `date` | `YYYY-MM-DD`，用于排序与显示 |
| `tags` / `keywords` | 关键词数组，出现在侧边栏标签云 |

## 在线地址

- 博客首页：<https://alphaveteran.github.io/body-as-fulcrum/fulcrum/>
- 主站（`_posts`）：<https://alphaveteran.github.io/body-as-fulcrum/>

推送到 `main` 分支后，GitHub Actions 会自动部署。

## 已有文章

10 篇旧文已批量补上 `title`、`date`（git 入库日 2026-05-18）和 `tags`。若要调整标签，直接改各文 front matter 即可。
