// 侧边导航栏交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const expandableItems = document.querySelectorAll('.nav-item.expandable');
    
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
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const themeIcon = this.querySelector('.theme-icon');
            const themeText = this.querySelector('.theme-text');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.textContent = '🌙';
                themeText.textContent = '深色模式';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = '浅色模式';
            }
        });
    }
    
    // 设置当前页面的激活状态
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link[href]');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
    
    // ESC键关闭侧边栏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});

