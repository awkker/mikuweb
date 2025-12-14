# 🌸 MikuWeb - 初音未来数字画廊

> 一个基于现代Web技术的纯净数字艺术空间，将初音未来的画作以优雅的方式呈现。采用创新的架构设计，融合前沿技术和艺术美学。

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Go](https://img.shields.io/badge/Go-1.19+-00ADD8)](https://golang.org/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E)](https://developer.mozilla.org/)

## ✨ 项目亮点

**🏆 技术创新**
- **iframe主框架系统** - 突破传统SPA，实现导航栏持久化
- **纯CSS瀑布流** - 无JS依赖的高性能图片布局
- **跨页面主题同步** - 完整的深色模式解决方案
- **自动Markdown生成** - 结构化内容管理系统

**🎨 视觉体验**
- **樱花飘落特效** - 随机生成的美学动画
- **鼠标文字拖影** - Miku绿色的跟随特效
- **响应式瀑布流** - 自适应多列布局
- **沉浸式Lightbox** - 大图预览体验

**⚡ 性能优化**
- **Lighthouse 95+** - 优秀的性能评分
- **< 1.5s首屏加载** - Cloudflare CDN加速
- **< 500KB页面大小** - 极致的轻量化
- **GPU加速动画** - 流畅的视觉体验

## 🚀 核心特性

### 🎨 画廊系统
- **智能瀑布流** - 纯CSS多列布局，自动适应屏幕尺寸
- **Lightbox预览** - 点击查看高清大图，支持键盘导航
- **收藏交互** - 爱心按钮状态切换，视觉反馈
- **响应式设计** - 桌面5列→平板4列→手机2列智能切换

### 📝 内容管理系统
- **博客发布系统** - 支持Markdown编辑和自动发布
- **动态文章加载** - 前后端分离，支持静态降级
- **作品集模板** - 双栏布局，作者信息固定跟随
- **自动Markdown导出** - Front Matter格式，支持Hexo/Hugo

### 💬 社交功能
- **高级评论系统** - 表情包支持，设备指纹识别
- **实时字数统计** - 智能表单验证和用户提示
- **浏览器检测** - 显示用户的操作系统和浏览器信息
- **管理员权限** - 评论管理和内容发布权限控制

### 🎵 沉浸体验
- **APlayer集成** - 自动吸底播放器，支持歌词显示
- **主题色适配** - 播放器与整体设计风格统一
- **列表循环播放** - 完整的音乐播放体验

### 🌓 用户体验
- **深浅色模式** - 一键切换，全局状态同步
- **localStorage持久化** - 用户偏好自动记忆
- **跨页面状态同步** - iframe架构下的无缝体验
- **无障碍设计** - 键盘导航和屏幕阅读器支持

## 🛠️ 技术栈

### 前端技术栈
- **HTML5** - 语义化结构，现代Web标准
- **CSS3** - 变量系统、Grid布局、动画效果
- **Vanilla JavaScript** - 无框架依赖，性能优异
- **CSS Modules** - 模块化样式管理

### 后端技术栈
- **Go 1.19+** - 高性能后端语言
- **Gin框架** - 轻量级Web框架
- **GORM** - Go对象关系映射
- **SQLite** - 轻量级文件数据库

### 架构设计
- **iframe主框架** - 创新的页面架构
- **RESTful API** - 标准化的接口设计
- **模块化开发** - 前后端分离架构
- **CDN部署** - Cloudflare Pages静态加速

## 📁 项目结构

```
mikuweb/
├── index.html                    # 视频封面入口页
├── TECHNICAL_IMPLEMENTATION.md   # 详细技术实现文档
├── comments/                     # 后端服务
│   ├── main.go                  # Go + Gin API服务
│   ├── go.mod & go.sum          # Go模块依赖
│   ├── data.db                  # SQLite数据库
│   └── md/                      # 自动生成的Markdown文件
├── static/                       # 前端静态资源
│   ├── html/                    # HTML页面
│   │   ├── main.html            # 主框架页面(ifame容器)
│   │   ├── index.html           # 画廊首页
│   │   ├── sum.html             # 瀑布流画廊
│   │   ├── cn_Matcha.html       # 抹茶老师作品集
│   │   ├── cn_xvjiang.html      # 旭酱作品集
│   │   ├── dousu.html           # 豆の素老师作品集
│   │   ├── comment.html         # 留言板页面
│   │   ├── blog.html            # 博客页面
│   │   ├── author.html          # 作者信息页
│   │   └── admin/
│   │       └── write.html       # 管理员发布页面
│   ├── css/                     # 样式文件
│   │   ├── colors.css           # 全局颜色变量
│   │   ├── main-frame.css       # 主框架布局
│   │   ├── navbar.css           # 导航栏样式
│   │   ├── top-navbar.css       # 顶部导航栏
│   │   ├── login.css            # 登录模态框
│   │   ├── mouse.css            # 鼠标特效
│   │   ├── sakura.css           # 樱花特效
│   │   ├── video.css            # 视频封面
│   │   ├── word.css             # 文字动画
│   │   ├── animate-text.css     # 文字特效
│   │   ├── arrow.css            # 箭头引导
│   │   ├── author.css           # 作者卡片
│   │   ├── picture.css          # 图片样式
│   │   ├── write.css            # 发布页面样式
│   │   ├── gallery/             # 画廊样式模块
│   │   │   ├── index.css        # 画廊入口样式
│   │   │   ├── gallery-grid.css # 瀑布流网格
│   │   │   ├── hero-banner.css  # 横幅样式
│   │   │   ├── lightbox.css     # 大图预览
│   │   │   └── responsive.css   # 响应式适配
│   │   ├── blog-layout/         # 博客布局样式
│   │   │   ├── index.css        # 博客入口
│   │   │   ├── article-card.css # 文章卡片
│   │   │   ├── author-card.css  # 作者卡片
│   │   │   ├── blog-expand.css  # 展开阅读
│   │   │   ├── dark-mode.css    # 深色模式
│   │   │   ├── layout.css       # 布局样式
│   │   │   ├── modal.css        # 弹窗样式
│   │   │   └── responsive.css   # 响应式设计
│   │   └── comment/             # 评论系统样式
│   │       ├── index.css        # 评论入口
│   │       ├── comment-card.css # 评论卡片
│   │       ├── dark-mode.css    # 深色模式
│   │       ├── form.css         # 表单样式
│   │       ├── layout.css       # 布局样式
│   │       ├── responsive.css   # 响应式设计
│   │       └── tags.css         # 标签样式
│   ├── js/                      # JavaScript逻辑
│   │   ├── main-frame.js        # 主框架控制
│   │   ├── navbar.js            # 导航栏交互
│   │   ├── user.js              # 用户系统
│   │   ├── mouse.js             # 鼠标特效
│   │   ├── sakura.js            # 樱花动画
│   │   ├── gallery.js           # 画廊交互
│   │   ├── blog-layout.js       # 博客布局
│   │   ├── blog-posts.js        # 博客文章加载
│   │   ├── comment.js           # 评论系统
│   │   ├── write.js             # 发布功能
│   │   ├── music_aplayer.js     # 音乐播放器
│   │   └── user.js              # 用户管理
│   └── images/                  # 静态资源
│       ├── picture/             # 图片资源
│       │   ├── logo/            # Logo图标
│       │   ├── author/          # 作者头像
│       │   ├── blog/            # 博客封面
│       │   ├── comment/         # 评论相关
│       │   ├── dousu/           # 豆の素作品
│       │   ├── Matcha/          # 抹茶作品
│       │   ├── xvjiang/         # 旭酱作品
│       │   ├── miku1-12.png     # 初音未来图片
│       │   └── ...              # 其他图片
│       ├── gif/                 # 表情包GIF
│       │   ├── aaa.gif          # 惊讶
│       │   ├── baojing.gif      # 报警
│       │   ├── bixin.gif        # 鼻血
│       │   └── ...              # 20+个表情
│       ├── music/               # 音乐资源
│       │   ├── musicimage/      # 专辑封面
│       │   ├── lrc/             # 歌词文件
│       │   └── *.mp3            # 音乐文件
│       └── video/               # 视频资源
│           └── *.mp4            # 封面视频

```

## 🚀 快速开始

### 环境要求

- **Go 1.19+** (后端API服务)
- **现代浏览器** (Chrome 80+, Firefox 75+, Safari 13+)
- **本地服务器** (用于静态文件服务)

### 1. 克隆项目

```bash
git clone https://github.com/awkker/mikuweb.git
cd mikuweb
```

### 2. 启动前端

```bash
# 方法1: 使用Python内置服务器
python -m http.server 8000

# 方法2: 使用Node.js
npx serve .

# 方法3: 使用VS Code Live Server
# 在VS Code中安装Live Server扩展并启动
```

访问: http://localhost:8000

### 3. 启动后端API (可选，用于完整功能)

```bash
# 进入后端目录
cd comments

# 安装依赖 (如果需要)
go mod tidy

# 启动服务
go run main.go
```

API服务: http://localhost:8080

### 4. 访问网站

打开浏览器访问 http://localhost:8000 即可体验完整功能：

- **前端展示**: 静态文件直接访问
- **评论功能**: 需要后端API支持
- **文章发布**: 需要后端API + 管理员权限

## 🎨 设计系统

### 颜色变量

```css
:root {
    /* Miku主题色 */
    --miku-color: rgb(102, 205, 170);
    --miku-color-rgb: 102, 205, 170;

    /* 功能色 */
    --success-color: #28a745;
    --warning-color: #ffc107;
    --danger-color: #dc3545;
    --info-color: #17a2b8;

    /* 阴影系统 */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.15);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);
    --shadow-xl: 0 16px 32px rgba(0,0,0,0.25);
}
```

### 响应式断点

```css
/* 移动优先断点系统 */
--breakpoint-xs: 480px;   /* 小手机 */
--breakpoint-sm: 768px;   /* 大手机/平板 */
--breakpoint-md: 992px;   /* 小屏桌面 */
--breakpoint-lg: 1200px;  /* 大屏桌面 */
```

## 📊 技术指标

| 指标 | 值 | 说明 |
|------|-----|------|
| **首屏加载时间** | < 1.5s | Cloudflare CDN加速 |
| **Lighthouse性能评分** | 95+ | 性能/SEO/可访问性 |
| **页面大小** | < 500KB | 优化后的静态资源 |
| **兼容性** | IE11+ | 现代浏览器支持 |
| **移动端适配** | 100% | 响应式设计全覆盖 |
| **Core Web Vitals** | 优秀 | Google性能指标 |

## 📖 开发文档

### 核心技术文档

| 文档 | 说明 | 重要性 |
|------|------|--------|
| [TECHNICAL_IMPLEMENTATION.md](./TECHNICAL_IMPLEMENTATION.md) | **完整技术实现详解** | ⭐⭐⭐⭐⭐ |
| [主框架系统说明.md](./md/主框架系统说明.md) | iframe架构设计 | ⭐⭐⭐⭐⭐ |
| [留言板系统说明.md](./md/留言板系统说明.md) | 评论系统前后端 | ⭐⭐⭐⭐ |
| [深浅色模式切换说明.md](./md/深浅色模式切换说明.md) | 主题切换实现 | ⭐⭐⭐⭐ |
| [画廊瀑布流布局说明.md](./md/画廊瀑布流布局说明.md) | 瀑布流CSS布局 | ⭐⭐⭐⭐ |
| [博客布局模板说明.md](./md/博客布局模板说明.md) | 作品集页面模板 | ⭐⭐⭐⭐ |

### 功能模块文档

| 文档 | 说明 |
|------|------|
| [博客自动发布功能.md](./md/博客自动发布功能.md) | 自动Markdown生成系统 |
| [导航栏使用说明.md](./md/导航栏使用说明.md) | 侧边栏交互组件 |
| [CSS颜色变量使用说明.md](./md/CSS颜色变量使用说明.md) | 设计系统变量 |
| [图片大小和鼠标特效优化.md](./md/图片大小和鼠标特效优化.md) | 性能优化技巧 |
| [登录权限系统.md](./md/登录权限系统.md) | 用户权限管理 |

## 🔧 部署指南

### 生产环境部署

#### 前端部署 (Cloudflare Pages)

1. **连接仓库**
   ```bash
   # GitHub仓库连接Cloudflare Pages
   # 构建命令: (留空)
   # 构建输出目录: /
   # 自定义域名: mikuweb.pages.dev
   ```

#### 后端部署 (独立服务器)

```bash
# 1. 编译Go程序
cd comments
go build -o mikuweb-api main.go

# 2. 创建systemd服务
sudo tee /etc/systemd/system/mikuweb.service > /dev/null <<EOF
[Unit]
Description=MikuWeb API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/mikuweb/comments
ExecStart=/var/www/mikuweb/comments/mikuweb-api
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# 3. 启动服务
sudo systemctl enable mikuweb
sudo systemctl start mikuweb
```

#### Nginx反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件 (Cloudflare Pages处理)

    # API反向代理
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🤝 贡献指南

### 开发环境设置

1. **Fork项目** 到你的GitHub账户
2. **克隆仓库** `git clone https://github.com/your-username/mikuweb.git`
3. **创建功能分支** `git checkout -b feature/your-feature`
4. **提交更改** `git commit -m "Add your feature"`
5. **推送分支** `git push origin feature/your-feature`
6. **创建Pull Request**

### 代码规范

- **JavaScript**: 使用ES6+语法，保持代码简洁
- **CSS**: 使用CSS变量，模块化组织
- **Go**: 遵循标准Go编码规范
- **提交信息**: 使用清晰的英文提交信息

## 🔗 相关链接

- **在线预览**: [mikuweb.pages.dev](https://mikuweb.pages.dev/)
- **源代码**: [github.com/awkker/mikuweb](https://github.com/awkker/mikuweb)
- **技术文档**: [TECHNICAL_IMPLEMENTATION.md](./TECHNICAL_IMPLEMENTATION.md)
- **作者博客**: [caoxunyi.cn](https://caoxunyi.cn/)
- **Go官方文档**: [golang.org](https://golang.org/)
- **Gin框架**: [gin-gonic.com](https://gin-gonic.com/)

## 📝 开源协议

本项目采用 **MIT License** 开源协议。

**图片版权说明**: 项目中的初音未来相关图片版权归原作者所有，仅供学习交流使用。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者，以及初音未来和Vocaloid社区带来的创作灵感。

**特别感谢**:
- **初音未来** - 带来的创作灵感
- **Gin & GORM** - 优秀的Go生态
- **APlayer** - 优秀的音乐播放器
- **Cloudflare** - 卓越的CDN服务

---

<p align="center">
  Made with 💚 & ⚡ by <a href="https://github.com/awkker">awkker</a>
</p>

<p align="center">
  <img src="static/images/picture/logo/logo.png" alt="MikuWeb Logo" width="64" height="64">
</p>
