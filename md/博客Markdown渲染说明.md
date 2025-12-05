# 博客 Markdown 渲染说明

## 概述

`blog-layout.js` 支持两种内容展示模式：
1. **Markdown 模式** - 点击卡片加载外部 md 文件并渲染
2. **普通文本模式** - 显示卡片内的摘要文字（原有功能）

## 使用方法

### 模式 A：Markdown 文件渲染

给卡片添加 `data-md` 属性，指定 md 文件路径：

```html
<div class="article-card" data-id="1" data-md="../../md/文章名.md">
    <div class="article-info">
        <h2 class="article-title">文章标题</h2>
        <p class="article-excerpt">简短摘要（列表页显示）</p>
    </div>
    <div class="article-cover">
        <img src="封面图.png" alt="描述">
    </div>
</div>
```

**点击卡片后**：加载 `data-md` 指定的 md 文件 → 解析渲染 → 显示在弹窗中

### 模式 B：普通文本（原有功能）

不添加 `data-md` 属性：

```html
<div class="article-card" data-id="2">
    <div class="article-info">
        <h2 class="article-title">文章标题</h2>
        <p class="article-excerpt">
            这段文字会直接显示在弹窗中...
        </p>
    </div>
    <div class="article-cover">
        <img src="封面图.png" alt="描述">
    </div>
</div>
```

**点击卡片后**：直接显示 `article-excerpt` 的内容

## 依赖说明

使用 Markdown 模式需要引入以下库：

```html
<!-- Markdown 解析 -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<!-- XSS 防护（可选但推荐） -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.8/purify.min.js"></script>

<!-- 代码高亮（可选） -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<!-- GitHub 风格样式（可选） -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown-light.min.css">
```

## 弹窗 HTML 结构

```html
<div class="article-modal" id="articleModal">
    <span class="modal-close">&times;</span>
    <div class="modal-content">
        <div class="modal-image">
            <img src="" alt="" id="modalImg">
        </div>
        <div class="modal-body">
            <h2 class="modal-title" id="modalTitle">作品标题</h2>
            <!-- 普通文本模式 -->
            <div class="modal-text" id="modalText"></div>
            <!-- Markdown 渲染模式 -->
            <div id="content" class="markdown-body"></div>
        </div>
    </div>
</div>
```

## 工作流程

```
用户点击文章卡片
       ↓
检查是否有 data-md 属性
       ↓
  ┌────┴────┐
  ↓         ↓
有 md      无 md
  ↓         ↓
隐藏 #modalText    隐藏 #content
显示 #content      显示 #modalText
  ↓         ↓
fetch(mdPath)      读取 excerpt
  ↓         ↓
marked.parse()     直接显示文本
  ↓
DOMPurify.sanitize()
  ↓
hljs.highlightElement()
  ↓
渲染到 #content
```

## 文件路径说明

`data-md` 的路径是**相对于当前 HTML 文件**的路径：

```
static/
├── html/
│   └── blog.html        ← 当前页面
└── ...

md/
├── 文章1.md
└── 文章2.md
```

从 `blog.html` 访问 `md/文章1.md`：

```html
data-md="../../md/文章1.md"
```

## 错误处理

加载失败时会显示友好的错误提示：

- 文件不存在
- 网络错误
- marked 库未加载

## 注意事项

1. **必须使用 HTTP 服务器** - 直接双击打开 HTML 文件会因 CORS 导致 fetch 失败
2. **路径区分大小写** - 在 Linux 服务器上尤其注意
3. **md.js 已弃用** - Markdown 功能已集成到 `blog-layout.js`，无需再引入 `md.js`

