<%*
/* 已有 permalink 则不再插入，避免重复 */
const fm = tp.frontmatter;
if (fm && fm.permalink) {
  tR = "";
  return;
}
-%>
---
permalink: /fulcrum/your-english-slug/
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - 随笔
---
