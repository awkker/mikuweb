# CSS 颜色变量使用说明

## 定义的 Miku 主题色

在 `static/css/word.css` 中定义了全局颜色变量：

```css
:root {
    --miku-color: rgb(102, 205, 170);       /* 完整颜色值 */
    --miku-color-rgb: 102, 205, 170;        /* RGB数值，用于rgba() */
}
```

**颜色预览：** 🎨 rgb(102, 205, 170) - 中等水绿色（Medium Aquamarine）

---

## 使用方法

### 1. 直接使用颜色

适用于：`color`、`background-color`、`border-color` 等

```css
.my-element {
    color: var(--miku-color);
    background-color: var(--miku-color);
    border: 2px solid var(--miku-color);
}
```

### 2. 使用带透明度的颜色

需要使用 `rgba()` 时，使用 `--miku-color-rgb` 变量：

```css
.my-element {
    /* 90% 不透明度 */
    color: rgba(var(--miku-color-rgb), 0.9);
    
    /* 50% 不透明度 */
    background-color: rgba(var(--miku-color-rgb), 0.5);
    
    /* 20% 不透明度 */
    border-color: rgba(var(--miku-color-rgb), 0.2);
}
```

### 3. 用于渐变色

```css
.gradient-element {
    /* 线性渐变 */
    background: linear-gradient(135deg, var(--miku-color) 0%, #667eea 100%);
    
    /* 径向渐变 */
    background: radial-gradient(circle, var(--miku-color), transparent);
}
```

### 4. 用于阴影

```css
.shadow-element {
    /* 文字阴影 */
    text-shadow: 2px 2px 4px var(--miku-color);
    
    /* 盒子阴影 */
    box-shadow: 0 4px 12px var(--miku-color);
    
    /* 带透明度的阴影 */
    box-shadow: 0 4px 12px rgba(var(--miku-color-rgb), 0.3);
}
```

---

## 项目中的实际应用

### 当前已使用的地方：

1. **标题渐变色**（第一个颜色）
```css
.gradient-title {
    background: linear-gradient(135deg, var(--miku-color) 0%, #667eea 50%, #764ba2 100%);
}
```

2. **诗句文字颜色**（带透明度）
```css
.poem {
    color: rgba(var(--miku-color-rgb), 0.9);
}
```

3. **箭头悬停颜色**
```css
.scroll-arrow:hover span {
    border-color: var(--miku-color);
}
```

---

## 如何添加更多颜色变量

如果需要定义更多主题色，可以在 `:root` 中添加：

```css
:root {
    --miku-color: rgb(102, 205, 170);
    --miku-color-rgb: 102, 205, 170;
    
    /* 添加更多颜色 */
    --miku-pink: rgb(255, 182, 193);
    --miku-pink-rgb: 255, 182, 193;
    
    --miku-blue: rgb(135, 206, 250);
    --miku-blue-rgb: 135, 206, 250;
}
```

然后就可以使用：
```css
.element {
    color: var(--miku-pink);
    background: rgba(var(--miku-blue-rgb), 0.5);
}
```

---

## 优势

✅ **统一主题色** - 所有地方使用同一个变量，保持颜色一致  
✅ **易于修改** - 只需修改一处，所有使用该颜色的地方都会更新  
✅ **提高可维护性** - 代码更清晰，颜色管理更方便  
✅ **支持透明度** - 可以灵活调整不透明度  

---

## 注意事项

⚠️ CSS 变量需要浏览器支持（现代浏览器都支持）  
⚠️ 使用 `rgba()` 时，必须用 `--miku-color-rgb` 而不是 `--miku-color`  
⚠️ 变量名区分大小写  
⚠️ `:root` 定义的变量是全局的，在所有CSS文件中都可以使用

---

## 浏览器兼容性

- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+
- ✅ iOS Safari 9.3+
- ✅ Android Browser 62+

基本上所有现代浏览器都支持！

