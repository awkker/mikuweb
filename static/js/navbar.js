// 侧边导航栏 - 全局组件

// 创建导航栏HTML结构
function createNavbar() {
    const navbarHTML = `
        <!-- 汉堡菜单按钮 -->
        <button class="menu-toggle" aria-label="打开菜单">
            <span></span>
            <span></span>
            <span></span>
        </button>
        
        <!-- 遮罩层 -->
        <div class="sidebar-overlay"></div>
        
        <!-- 侧边导航栏 -->
        <nav class="sidebar">
            <!-- 头部标题 -->
            <div class="sidebar-header">
                <h1 class="sidebar-title">Miku画廊</h1>
            </div>
            
            <!-- 主题切换 -->
            <div class="theme-toggle">
                <span class="theme-text">浅色模式</span>
            </div>
            
            <!-- 导航菜单 -->
            <ul class="nav-menu">
                <!-- 首页 -->
                <li class="nav-item">
                    <a href="../../index.html" class="nav-link">
                        <span class="nav-text">首页</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="../html/index.html" class="nav-link">
                        <span class="nav-text">站点介绍</span>
                    </a>
                </li>

                <!-- 精选主展厅 -->
                <li class="nav-item">
                    <a href="../html/sum.html" class="nav-link">
                        <span class="nav-text">精选主展厅</span>
                    </a>
                </li>
                
                <li class="nav-item expandable">
                    <a href="#" class="nav-link">
                        <span class="nav-text">画师副展厅</span>
                        <span class="expand-icon">▼</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item">
                            <a href="../html/cn_Matcha.html" class="nav-link">
                                <span class="nav-text">抹茶老师作品集</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../html/cn_xvjiang.html" class="nav-link">
                                <span class="nav-text">旭酱作品集</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="../html/dousu.html" class="nav-link">
                                <span class="nav-text">豆の素老师作品集</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <!-- 关于本站（可展开） -->
                <li class="nav-item expandable">
                    <a href="#" class="nav-link">
                        <span class="nav-text">关于本站</span>
                        <span class="expand-icon">▼</span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item">
                            <a href="#about" class="nav-link">
                                <span class="nav-text">站点介绍</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#history" class="nav-link">
                                <span class="nav-text">建站历程</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#contact" class="nav-link">
                                <span class="nav-text">联系方式</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    `;
    
    // 将导航栏插入到body的开头
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
}

// 页面加载时自动创建导航栏
document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏
    createNavbar();
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

