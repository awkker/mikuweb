// 博客文章动态加载模块
// 从后端 API 获取文章列表，动态生成文章卡片

const BlogPosts = (function() {
    const API_URL = 'http://localhost:8080/posts';
    const MD_BASE_PATH = '../../comments/md/';  // MD 文件相对路径
    const DEFAULT_COVER = '../images/picture/blog/default.jpg';  // 默认封面
    
    // 封面图列表（随机选择）
    const COVER_IMAGES = [
        '../images/picture/blog/b1.jpeg',
        '../images/picture/blog/b2.jpg',
        '../images/picture/blog/b3.jpg',
        '../images/picture/作为谢礼的冰淇淋-初音未来1_0001.jpg'
    ];
    
    /**
     * 获取随机封面图
     */
    function getRandomCover() {
        const index = Math.floor(Math.random() * COVER_IMAGES.length);
        return COVER_IMAGES[index];
    }
    
    /**
     * 格式化日期
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];  // YYYY-MM-DD
    }
    
    /**
     * 生成安全的文件名（与后端 Go 逻辑一致）
     */
    function getSafeFilename(id, title) {
        let safeTitle = title.replace(/\//g, '-');
        safeTitle = safeTitle.replace(/ /g, '-');
        return `${id}-${safeTitle}.md`;
    }
    
    /**
     * 创建文章卡片 HTML
     */
    function createArticleCard(post) {
        const mdPath = MD_BASE_PATH + getSafeFilename(post.id, post.title);
        // 优先使用文章自带的封面图，否则随机选择
        const cover = post.cover ? post.cover : getRandomCover();
        const date = formatDate(post.created_at);
        
        const card = document.createElement('div');
        card.className = 'article-card';
        card.dataset.id = post.id;
        card.dataset.md = mdPath;
        
        card.innerHTML = `
            <div class="article-info">
                <h2 class="article-title">${post.title}</h2>
                <p class="article-excerpt">${post.summary || ''}</p>
                <span class="article-date">${date}</span>
            </div>
            <div class="article-cover">
                <img src="${cover}" alt="${post.title}" onerror="this.src='${getRandomCover()}'">
            </div>
        `;
        
        return card;
    }
    
    /**
     * 加载文章列表
     */
    async function loadPosts() {
        const articleList = document.querySelector('.article-list');
        if (!articleList) return;
        
        // 显示加载状态
        const loadingEl = document.createElement('div');
        loadingEl.className = 'posts-loading';
        loadingEl.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>正在加载文章...</p>
            </div>
        `;
        
        // 获取静态文章（作为备用）
        const staticCards = articleList.querySelectorAll('.article-card');
        const staticCardsArray = Array.from(staticCards);
        
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('API 请求失败');
            }
            
            const posts = await response.json();
            
            if (posts && posts.length > 0) {
                // 清空现有文章（保留静态的，插入动态的在前面）
                // 创建分隔线
                const divider = document.createElement('div');
                divider.className = 'posts-divider';
                
                // 在静态文章前插入动态文章
                const fragment = document.createDocumentFragment();
                
                posts.forEach(post => {
                    const card = createArticleCard(post);
                    fragment.appendChild(card);
                });
                
                // 插入分隔线
                fragment.appendChild(divider);
                
                // 插入到列表最前面
                if (articleList.firstChild) {
                    articleList.insertBefore(fragment, articleList.firstChild);
                } else {
                    articleList.appendChild(fragment);
                }
                
                // 重新绑定点击事件（因为新添加的卡片需要绑定）
                bindCardEvents();
                
                console.log(`✅ 成功加载 ${posts.length} 篇动态文章`);
            }
            
        } catch (error) {
            console.log('📝 后端未运行，显示静态文章');
            // 后端不可用时，静态文章已经在页面上，不需要额外处理
        }
    }
    
    /**
     * 重新绑定卡片点击事件
     * （因为动态添加的卡片需要重新绑定）
     */
    function bindCardEvents() {
        // 获取 blog-layout.js 中的展开/弹窗逻辑
        // 这里我们触发一个自定义事件，让 blog-layout.js 重新绑定
        document.dispatchEvent(new CustomEvent('posts-loaded'));
    }
    
    /**
     * 初始化
     */
    function init() {
        // 页面加载完成后加载文章
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadPosts);
        } else {
            // 延迟一点执行，确保其他脚本已加载
            setTimeout(loadPosts, 100);
        }
    }
    
    return {
        init,
        loadPosts,
        createArticleCard
    };
})();

// 自动初始化
BlogPosts.init();
