# Mikuweb 视频背景项目

一个使用视频作为网页背景的项目，展示初音未来的视频作为全屏封面背景。

## 项目结构

```
mikuweb/
├── index.html              # 主页面
├── index.js                # JavaScript文件
├── package.json            # 项目配置
├── static/
│   ├── css/
│   │   └── video.css      # 视频背景样式
│   ├── images/
│   │   ├── picture/       # 图片资源
│   │   └── video/         # 视频资源
│   │       └── 作为谢礼的冰淇淋-初音未来1.mp4
│   └── js/
└── README.md              # 本文档
```

## 功能特性

- ✅ 全屏视频背景
- ✅ 自动播放、循环播放
- ✅ 响应式设计，适配不同屏幕尺寸
- ✅ 视频自动填充屏幕，无黑边
- ✅ 居中显示，保证视频中心部分始终可见

## 技术实现

### HTML 结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mikuweb</title>
    <link rel="stylesheet" href="static/css/video.css">
</head>
<body>
    <video autoplay muted loop playsinline class="bg-video">
        <source src="static/images/video/作为谢礼的冰淇淋-初音未来1.mp4" type="video/mp4">
    </video>
</body>
</html>
```

### CSS 样式

```css
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.bg-video {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: 100vw;
    height: 100vh;
    transform: translate(-50%, -50%);
    z-index: -100;
    object-fit: cover;
    object-position: center;
}
```

## 关键属性说明

### Video 标签属性
- `autoplay`: 自动播放
- `muted`: 静音（必须静音才能自动播放）
- `loop`: 循环播放
- `playsinline`: iOS设备上内联播放，不全屏

### CSS 样式说明
- `position: fixed`: 固定定位，不随页面滚动
- `top: 50%; left: 50%`: 定位到页面中心
- `transform: translate(-50%, -50%)`: 居中对齐
- `object-fit: cover`: 填充整个容器，保持视频比例
- `object-position: center`: 视频内容居中显示
- `z-index: -100`: 置于所有内容下方作为背景

## 遇到的问题与解决方案

### 问题1: CSS文件加载失败（MIME类型错误）

**错误信息：**
```
Refused to apply style from 'http://localhost:63342/css/video.css' 
because its MIME type ('text/html') is not a supported stylesheet MIME type
```

**原因：** CSS文件路径错误，服务器返回404页面（HTML格式），导致MIME类型不匹配

**解决方案：** 修正CSS路径
```html
<!-- 错误 -->
<link rel="stylesheet" href="/css/video.css">

<!-- 正确 -->
<link rel="stylesheet" href="static/css/video.css">
```

### 问题2: 视频type属性错误

**原因：** video标签的type属性应该是MIME类型，不是文件名

**解决方案：**
```html
<!-- 错误 -->
<source src="..." type="作为谢礼的冰淇淋-初音未来">

<!-- 正确 -->
<source src="..." type="video/mp4">
```

### 问题3: 视频尺寸过大显示不全

**需求：** 既要填充整个屏幕（作为背景封面），又要保证内容可见

**解决方案：** 
- 使用 `object-fit: cover` 填充屏幕
- 使用 `transform: translate(-50%, -50%)` 配合 `top: 50%; left: 50%` 确保居中
- 使用 `object-position: center` 保证视频中心部分始终可见

## 使用方法

1. 将视频文件放置在 `static/images/video/` 目录下
2. 在 `index.html` 中引用视频文件
3. 使用本地服务器打开项目（不要直接打开HTML文件）
4. 在视频上方添加其他内容时，确保z-index大于-100

## 扩展建议

如果需要在视频背景上添加内容，可以这样做：

```html
<body>
    <video autoplay muted loop playsinline class="bg-video">
        <source src="static/images/video/作为谢礼的冰淇淋-初音未来1.mp4" type="video/mp4">
    </video>
    
    <!-- 在视频上方的内容 -->
    <div class="content">
        <h1>欢迎来到 Mikuweb</h1>
        <p>你的内容在这里</p>
    </div>
</body>
```

```css
.content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 20vh;
}
```

## 浏览器兼容性

- ✅ Chrome/Edge (现代版本)
- ✅ Firefox (现代版本)
- ✅ Safari (包括iOS)
- ✅ 移动端浏览器

**注意：** 某些移动设备可能会限制自动播放，需要用户交互后才能播放。

## License

本项目仅供学习使用。

