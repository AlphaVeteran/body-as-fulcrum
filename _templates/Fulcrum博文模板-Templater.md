<%*
/* 已有 permalink 则不再插入，避免重复 */
const fm = tp.frontmatter;
if (fm && fm.permalink) {
  tR = "";
  return;
}
-%>
---
layout: fulcrum-post
title: <% tp.file.title %>
permalink: /fulcrum/your-english-slug/
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - 随笔
keywords:
  - 
---

在此开始写作。保存到 `fulcrum/` 目录后，同步到 GitHub 即可在浏览器查看。

- Fulcrum：<https://alphaveteran.github.io/body-as-fulcrum/fulcrum/>
- dev2hedge：<https://alphaveteran.github.io/dev2hedge/>
- 在 front matter 里填写 `tags` 或 `keywords`，会出现在侧边栏关键词云
- `title` 留空则使用文件名作为标题
