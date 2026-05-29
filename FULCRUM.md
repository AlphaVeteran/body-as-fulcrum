# Fulcrum 博客（Obsidian → GitHub Pages）

`fulcrum/` 目录下的 Markdown 会发布为独立博客，风格类似 Hexo：列表分页、全文阅读、侧边栏搜索与关键词。

## Obsidian 配置

1. 在 Obsidian 设置 → **核心插件** 中启用 **模板**
2. 将模板文件夹设为仓库内的 `_templates`
3. 建议为「插入模板」设快捷键（设置 → 快捷键 → 搜索 `Insert template`）

### Obsidian Git（已预配置，见 `.obsidian/plugins/obsidian-git/data.json`）

| 项 | 值 | 作用 |
|----|-----|------|
| 启动时 pull | 开 | 打开库先拉远程 |
| 改文件后 commit | 开 | 停止编辑后自动提交 |
| 自动 commit 间隔 | 10 分钟 | 定时备份 |
| 自动 push 间隔 | 10 分钟 | **推送到 GitHub → 触发 Pages 构建** |
| 自动 pull 间隔 | 30 分钟 | 多设备同步 |
| push 前 pull | 开 | 减少冲突 |

**首次使用：** 设置 → 社区插件 → 启用 **Git**。执行一次 **Push**，用 GitHub 用户名 + Fine-grained Token 完成认证。

**写作位置：** 只改 `fulcrum/` 下的 md；`_posts` 已迁至 [dev2hedge](https://github.com/AlphaVeteran/dev2hedge)。

### 方式 A：新建笔记

在 `fulcrum/` 下**新建**笔记时，Templater 会自动套用 **Fulcrum博文模板-Templater**（完整 front matter + 写作说明）。

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

### 方式 C：Templater 文件夹模板（已预配置）

**前提：** 安装社区插件 [Templater](https://github.com/SilentVoid13/Templater)，并启用。

#### 1. 基础设置

| 设置项 | 值 |
|--------|-----|
| Template folder location | `_templates` |
| Trigger Templater on new file creation | **开启** |
| Enable Folder Templates | **开启** |

#### 2. 绑定 `fulcrum/` 文件夹

在 **Folder Templates** 里点 **Add new**，填：

| 字段 | 值 |
|------|-----|
| Folder | `fulcrum`（若 vault 根就是本仓库，只写文件夹名即可） |
| Template | `Fulcrum博文模板-Templater` |

保存后，在 Obsidian **文件列表**里于 `fulcrum/` 下**新建**笔记，会自动插入完整博文结构（front matter + 说明段落）；已有 `permalink` 的文件会跳过（见模板内判断）。从 Finder **拷贝已有正文**的 md 进 `fulcrum/` 时，仍建议手动插 **Fulcrum前置元数据**（见方式 B）。

#### 3. 从 Finder 拷贝 md 时

Obsidian 已打开该仓库时，把 `.md` 拷进 `fulcrum/` 后：

1. 在 Obsidian 左侧点一下该新文件（让 Obsidian 完成索引）
2. 打开文件 → `Cmd+P` → **插入模板** → 选 **Fulcrum前置元数据**（勿用 Templater 替换，否则会套上完整博文说明段）

更稳的做法：先在 Obsidian 里 `fulcrum/` 下新建空笔记（会自动带头）→ 再把正文粘贴进去，删掉说明段。

#### 4. 与「核心插件 · 模板」的关系

- **Templater 文件夹模板**：`fulcrum/` 下**新建** → 用 `Fulcrum博文模板-Templater.md`（完整结构）
- **核心模板 · 插入模板**：拷贝旧文后手动加头 → 用 `Fulcrum前置元数据.md`（`{{date}}` 语法）

两套可并存，不要给「默认模板」指定 Fulcrum。

## 两个模板会冲突吗？

**一般不会。** 各管一种场景，不会自动叠加。

| 模板 | 何时用 |
|------|--------|
| **Fulcrum博文模板-Templater** | 在 `fulcrum/` **新建**笔记（Templater 自动） |
| **Fulcrum前置元数据** | 已写好正文、**拷贝进** `fulcrum/` 后，文首手动「插入模板」 |

避免搞混的三条规则：

1. **不要把「默认模板」设成 Fulcrum**  
   设置 → 模板 →「模板位置」指到 `_templates` 即可；**默认模板**留空，或继续用 **Jekyll模板**（给 `_posts` 用）。否则在仓库根目录新建笔记也会套上 Fulcrum 头。

2. **拷贝旧文后只插「前置元数据」**  
   若已在 `fulcrum/` 新建并自动套了博文模板，说明段删掉即可；若已有 `---` 头，不要插第二次。

3. **Templater 只绑一个文件夹模板**  
   `fulcrum/` 已绑定 **Fulcrum博文模板-Templater**（新建用）；不要改成同时绑「博文模板」和「前置元数据」。

**自检：** 文首只有一对 `---`，且含 `permalink` 与 `date`；正文里没有模板里的「在此开始写作」等说明字，即表示没插错。

## Front matter 字段

| 字段 | 说明 |
|------|------|
| `title` | 标题（可省略，使用文件名） |
| `permalink` | 英文 URL，如 `/fulcrum/my-post/`（部署必需） |
| `date` | `YYYY-MM-DD`，用于排序与显示 |
| `tags` / `keywords` | 关键词数组，出现在侧边栏标签云 |

## 在线地址

- 博客首页：<https://alphaveteran.github.io/body-as-fulcrum/fulcrum/>
- dev2hedge 主站（原 `_posts`）：<https://alphaveteran.github.io/dev2hedge/>

推送到 `main` 分支后，GitHub Actions 会自动部署。

## 已有文章

10 篇旧文已批量补上 `title`、`date`（git 入库日 2026-05-18）和 `tags`。若要调整标签，直接改各文 front matter 即可。
