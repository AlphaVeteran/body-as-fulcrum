# Fulcrum 博客（Obsidian → GitHub Pages）

`fulcrum/` 目录下的 Markdown 会发布为独立博客，风格类似 Hexo：列表分页、全文阅读、侧边栏搜索与关键词。

## Obsidian 配置

1. 在 Obsidian 设置 → **核心插件** 中启用 **模板**
2. 将模板文件夹设为仓库内的 `_templates`
3. 建议为「插入模板」设快捷键（设置 → 快捷键 → 搜索 `Insert template`）

### 方式 A：新建笔记

用 **Fulcrum博文模板** 新建，保存到 `fulcrum/`。

### 方式 B：拷贝已有 md（你的习惯）

1. 把写好的 `.md` **拷贝到** `fulcrum/`
2. 在 Obsidian 中打开该文件，光标放在**全文最开头**
3. `Cmd+P` → **插入模板**（Insert template）→ 选 **Fulcrum前置元数据**
4. 改三处：
   - `permalink`：英文路径，如 `/fulcrum/my-new-post/`（**必填**，部署用）
   - `date`：写作日期
   - `tags`：关键词
5. `title` 可省略（默认用文件名）；`layout` 不必写（`_config.yml` 已自动指定）
6. 同步到 GitHub 的 `main` 分支

若装了 **Templater** 插件，可在 `fulcrum/` 文件夹设置「文件夹模板」，新文件/移入该文件夹时自动插入前置元数据。

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
