(function () {
  "use strict";

  var PER_PAGE = 8;
  var posts = [];

  function loadPosts() {
    var el = document.getElementById("fulcrum-posts-data");
    if (!el) return [];
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return [];
    }
  }

  function normalizeTags(tags) {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.filter(Boolean);
    if (typeof tags === "string") return tags.split(/[,，、\s]+/).filter(Boolean);
    return [];
  }

  function allTags(list) {
    var map = {};
    list.forEach(function (p) {
      normalizeTags(p.tags).forEach(function (t) {
        map[t] = (map[t] || 0) + 1;
      });
    });
    return Object.keys(map)
      .sort(function (a, b) {
        return map[b] - map[a] || a.localeCompare(b, "zh");
      })
      .map(function (t) {
        return { name: t, count: map[t] };
      });
  }

  function renderTagCloud(activeTag) {
    var cloud = document.getElementById("fulcrum-tag-cloud");
    var clearBtn = document.getElementById("fulcrum-tag-clear");
    if (!cloud) return;

    var tags = allTags(posts);
    cloud.innerHTML = "";

    if (tags.length === 0) {
      cloud.innerHTML = '<span class="fulcrum-empty">暂无标签，在 Obsidian 前言区添加 tags</span>';
      if (clearBtn) clearBtn.hidden = true;
      return;
    }

    tags.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fulcrum-tag" + (activeTag === item.name ? " active" : "");
      btn.textContent = item.name + " (" + item.count + ")";
      btn.dataset.tag = item.name;
      btn.addEventListener("click", function () {
        var next = activeTag === item.name ? "" : item.name;
        if (clearBtn) clearBtn.hidden = !next;
        renderTagCloud(next);
        if (document.getElementById("fulcrum-archive")) {
          renderArchive(next, 1);
        }
      });
      cloud.appendChild(btn);
    });

    if (clearBtn) {
      clearBtn.hidden = !activeTag;
      clearBtn.onclick = function () {
        renderTagCloud("");
        if (document.getElementById("fulcrum-archive")) renderArchive("", 1);
      };
    }
  }

  function renderRecent() {
    var list = document.getElementById("fulcrum-recent-list");
    if (!list) return;
    list.innerHTML = "";
    posts.slice(0, 6).forEach(function (p) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = p.url;
      a.textContent = p.title;
      if (p.date) {
        a.title = p.date;
      }
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function filterPosts(tag, query) {
    var q = (query || "").trim().toLowerCase();
    return posts.filter(function (p) {
      var tags = normalizeTags(p.tags);
      if (tag && tags.indexOf(tag) === -1) return false;
      if (!q) return true;
      var hay =
        (p.title || "") +
        " " +
        tags.join(" ") +
        " " +
        (p.excerpt || "") +
        " " +
        (p.date || "");
      return hay.toLowerCase().indexOf(q) !== -1;
    });
  }

  function initSearch() {
    var input = document.getElementById("fulcrum-search-input");
    var results = document.getElementById("fulcrum-search-results");
    if (!input || !results) return;

    function showResults(items) {
      results.innerHTML = "";
      if (!items.length) {
        results.hidden = true;
        return;
      }
      items.slice(0, 8).forEach(function (p) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = p.url;
        a.textContent = p.title;
        li.appendChild(a);
        results.appendChild(li);
      });
      results.hidden = false;
    }

    input.addEventListener("input", function () {
      var q = input.value.trim();
      if (!q) {
        results.hidden = true;
        if (document.getElementById("fulcrum-archive")) renderArchive("", 1);
        return;
      }
      showResults(filterPosts("", q));
      if (document.getElementById("fulcrum-archive")) {
        renderArchiveFiltered(filterPosts("", q), 1);
      }
    });

    document.addEventListener("click", function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.hidden = true;
      }
    });
  }

  function renderArchiveFiltered(filtered, page) {
    var archive = document.getElementById("fulcrum-archive");
    var pageInfo = document.getElementById("fulcrum-page-info");
    var prevBtn = document.getElementById("fulcrum-prev");
    var nextBtn = document.getElementById("fulcrum-next");
    if (!archive) return;

    var total = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    page = Math.max(1, Math.min(page, total));
    var start = (page - 1) * PER_PAGE;
    var slice = filtered.slice(start, start + PER_PAGE);

    archive.innerHTML = "";
    if (!slice.length) {
      archive.innerHTML = '<li class="fulcrum-empty">没有匹配的文章</li>';
    }

    slice.forEach(function (p) {
      var li = document.createElement("li");
      li.className = "fulcrum-archive-item";
      var tags = normalizeTags(p.tags);
      var tagsHtml = tags.length
        ? '<div class="fulcrum-item-tags">' +
          tags
            .map(function (t) {
              return '<span class="fulcrum-item-tag">' + escapeHtml(t) + "</span>";
            })
            .join("") +
          "</div>"
        : "";

      li.innerHTML =
        '<div class="fulcrum-archive-meta">' +
        (p.date ? escapeHtml(p.date) : "") +
        "</div>" +
        '<h2 class="fulcrum-archive-title"><a href="' +
        escapeAttr(p.url) +
        '">' +
        escapeHtml(p.title) +
        "</a></h2>" +
        (p.excerpt
          ? '<p class="fulcrum-archive-excerpt">' + escapeHtml(p.excerpt) + "…</p>"
          : "") +
        '<a class="fulcrum-read-more" href="' +
        escapeAttr(p.url) +
        '">阅读全文 →</a>' +
        tagsHtml;
      archive.appendChild(li);
    });

    if (pageInfo) pageInfo.textContent = "第 " + page + " 页 / 共 " + total + " 页（" + filtered.length + " 篇）";
    if (prevBtn) {
      prevBtn.disabled = page <= 1;
      prevBtn.onclick = function () {
        renderArchiveFiltered(filtered, page - 1);
      };
    }
    if (nextBtn) {
      nextBtn.disabled = page >= total;
      nextBtn.onclick = function () {
        renderArchiveFiltered(filtered, page + 1);
      };
    }
  }

  function renderArchive(tag, page) {
    renderArchiveFiltered(filterPosts(tag, ""), page);
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function initSidebarToggle() {
    var btn = document.getElementById("fulcrum-toggle-sidebar");
    var sidebar = document.getElementById("fulcrum-sidebar");
    if (!btn || !sidebar) return;
    btn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
    });
  }

  posts = loadPosts();
  renderTagCloud("");
  renderRecent();
  initSearch();
  initSidebarToggle();

  if (document.getElementById("fulcrum-archive")) {
    renderArchive("", 1);
  }
})();
