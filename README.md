# 🌸 Miku画廊

一个展示初音未来画作的纯净数字空间，基于 Go + Gin + Vanilla JS 构建。

> 我们相信代码的温度在于传递美好，因此我们将舞台完全留给画作，让技术隐于幕后，只为让你在那一抹葱绿中，感受最纯粹的心动。

## ✨ 功能特性

- 🎨 **画廊瀑布流** - 类似 Pixiv 的多列自适应布局
- 📝 **博客风格作品集** - 画师作品展示页面
- 💬 **留言板系统** - 支持评论、删除、设备信息显示
- 🌓 **深浅色模式** - 一键切换，自动记忆偏好
- 🌸 **樱花飘落特效** - 沉浸式视觉体验
- ✨ **鼠标文字拖影** - Miku 绿色跟随特效
- 📱 **响应式设计** - 完美适配桌面/平板/手机
- 🎵 **音乐播放器** - 基于 APlayer 集成

## 📁 项目结构

```
mikuweb/
├── index.html                # 视频封面入口页
├── comments/                 # 留言板后端
│   ├── main.go              # Go + Gin 服务
│   └── comments.db          # SQLite 数据库
├── static/
│   ├── html/
│   │   ├── main.html        # 主框架（iframe容器）
│   │   ├── sum.html         # 画廊瀑布流页面
│   │   ├── cn_Matcha.html   # 画师作品集示例
│   │   ├── comment.html     # 留言板页面
│   │   ├── author.html      # 作者信息页
│   │   └── ...
│   ├── css/
│   │   ├── colors.css       # 全局颜色变量
│   │   ├── navbar.css       # 侧边导航栏
│   │   ├── mouse.css        # 鼠标特效
│   │   ├── sakura.css       # 樱花特效
│   │   ├── gallery/         # 画廊样式模块
│   │   ├── blog-layout/     # 博客布局样式模块
│   │   └── comment/         # 留言板样式模块
│   ├── js/
│   │   ├── navbar.js        # 导航栏 + 主题切换
│   │   ├── main-frame.js    # 主框架 iframe 控制
│   │   ├── gallery.js       # 画廊交互（Lightbox）
│   │   ├── blog-layout.js   # 博客布局交互
│   │   ├── comment.js       # 留言板前端逻辑
│   │   ├── mouse.js         # 鼠标跟随特效
│   │   └── sakura.js        # 樱花飘落动画
│   └── images/
│       ├── picture/         # 图片资源
│       ├── video/           # 视频资源
│       └── music/           # 音乐资源
└── md/                       # 开发文档
```

## 🚀 快速开始

### 前端预览

直接使用本地服务器打开项目即可：

```bash
# 使用 VS Code Live Server 或
npx serve .
# 或
python -m http.server 8000
```

### 启动留言板后端

```bash
cd comments
go run main.go
# 服务启动: http://localhost:8080
```

## 🎨 主题色

项目使用统一的 Miku 绿作为主题色：

```css
:root {
    --miku-color: rgb(102, 205, 170);
    --miku-color-rgb: 102, 205, 170;
}
```

## 📖 开发文档

详细的模块说明文档在 `md/` 目录下：

| 文档 | 说明 |
|------|------|
| 主框架系统说明.md | iframe 架构设计 |
| 导航栏使用说明.md | 侧边栏组件用法 |
| 深浅色模式切换说明.md | 主题切换实现 |
| 画廊瀑布流布局说明.md | 瀑布流 CSS 布局 |
| 博客布局模板说明.md | 作品集页面模板 |
| 留言板系统说明.md | 评论系统前后端 |

## 🔗 链接

- **在线预览**: [mikuweb.pages.dev](https://mikuweb.pages.dev/)
- **源代码**: [github.com/awkker/mikuweb](https://github.com/awkker/mikuweb)
- **作者博客**: [caoxunyi.cn](https://caoxunyi.cn/)

## 📝 License

本项目仅供学习交流使用，图片版权归原作者所有。

---

<p align="center">
  Made with 💚 & ⚡ by <a href="https://github.com/awkker">awkker</a>
</p>
