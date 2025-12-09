// 侧边导航栏 - 交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 读取并应用主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const expandableItems = document.querySelectorAll('.nav-item.expandable');
    
    // 如果页面没有侧边栏元素，直接返回
    if (!sidebar) return;

    // 打开/关闭侧边栏
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }
    
    // 关闭侧边栏
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
    
    // 汉堡菜单按钮点击
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // 遮罩层点击关闭
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // 可展开菜单项
    expandableItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            item.classList.toggle('expanded');
        });
    });
    
    // 主题切换
    const themeToggle = document.querySelector('.theme-toggle');
    
    // 应用主题
    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // 更新按钮文字
        const themeText = document.querySelector('.theme-text');
        if (themeText) {
            themeText.textContent = isDark ? '深色模式' : '浅色模式';
        }
        
        // 同步到 iframe
        const iframe = document.getElementById('contentFrame');
        if (iframe && iframe.contentDocument) {
            try {
                if (isDark) {
                    iframe.contentDocument.body.classList.add('dark-mode');
                } else {
                    iframe.contentDocument.body.classList.remove('dark-mode');
                }
            } catch (e) {
                // 跨域时无法访问
            }
        }
    };
    
    // 初始化主题按钮文字
    if (document.body.classList.contains('dark-mode')) {
        const themeText = document.querySelector('.theme-text');
        if (themeText) themeText.textContent = '深色模式';
    }
    
    // 主题切换点击事件
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = !document.body.classList.contains('dark-mode');
            applyTheme(isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // ESC 键关闭侧边栏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});
