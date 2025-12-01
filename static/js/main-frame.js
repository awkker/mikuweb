// 主框架页面脚本 - 让侧边导航栏的链接在iframe中打开

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('contentFrame');
    
    if (!iframe) return;
    
    // 同步主题到iframe
    const syncThemeToIframe = () => {
        try {
            if (iframe.contentDocument && iframe.contentDocument.body) {
                const isDark = document.body.classList.contains('dark-mode');
                if (isDark) {
                    iframe.contentDocument.body.classList.add('dark-mode');
                } else {
                    iframe.contentDocument.body.classList.remove('dark-mode');
                }
            }
        } catch (e) {
            // 跨域时无法访问
        }
    };
    
    // iframe加载完成后同步主题
    iframe.addEventListener('load', syncThemeToIframe);
    
    // 延迟执行，等待navbar.js创建完导航栏
    setTimeout(() => {
        // 获取所有导航链接
        const navLinks = document.querySelectorAll('.sidebar .nav-link[href]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 如果是有效的页面链接（不是#或javascript:）
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    e.preventDefault();
                    
                    // 在iframe中加载页面
                    iframe.src = href;
                    
                    // 更新活动状态
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 关闭侧边栏（可选，移动端体验更好）
                    if (window.innerWidth <= 768) {
                        document.body.classList.remove('sidebar-open');
                        document.querySelector('.sidebar')?.classList.remove('active');
                        document.querySelector('.sidebar-overlay')?.classList.remove('active');
                    }
                }
            });
        });
    }, 100);
});
