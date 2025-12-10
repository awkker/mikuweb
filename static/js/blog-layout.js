// 博客布局功能
// - 有 data-md 属性的卡片：瀑布式展开阅读
// - 没有 data-md 属性的卡片：弹窗模式查看图文

document.addEventListener('DOMContentLoaded', function() {
    const blogWrapper = document.querySelector('.blog-wrapper');
    const modal = document.getElementById('articleModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.querySelector('.modal-close');
    
    let currentExpandedCard = null;
    
    // 如果没有博客容器，不初始化
    if (!blogWrapper) return;
    
    /**
     * 加载并渲染 Markdown 文件
     */
    async function loadMarkdown(mdPath, container) {
        if (!container) return;
        
        // 显示加载状态
        container.innerHTML = '<div class="md-loading">正在加载文章... (∠・ω< )⌒★</div>';
        
        try {
            const response = await fetch(mdPath);
            if (!response.ok) {
                throw new Error(`无法加载文件: ${mdPath} (状态码: ${response.status})`);
            }
            
            const markdownText = await response.text();
            
            // 检查是否有 marked 库
            if (typeof marked === 'undefined') {
                throw new Error('marked 库未加载，请引入 marked.js');
            }
            
            // 解析 Markdown
            const dirtyHtml = marked.parse(markdownText);
            
            // 清洗 HTML (如果有 DOMPurify)
            const cleanHtml = typeof DOMPurify !== 'undefined' 
                ? DOMPurify.sanitize(dirtyHtml) 
                : dirtyHtml;
            
            // 渲染到页面
            container.innerHTML = cleanHtml + `
                <button class="article-collapse-btn" onclick="collapseArticle(event)">
                    <i class="fa-solid fa-chevron-up"></i> 收起文章
                </button>
            `;
            
            // 代码高亮 (如果有 highlight.js)
            if (typeof hljs !== 'undefined') {
                container.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        } catch (error) {
            console.error('加载 Markdown 失败:', error);
            container.innerHTML = `
                <div class="md-error">
                    加载失败了 QAQ<br>
                    ${error.message}<br><br>
                    <small>提示：请确保文件路径正确，且使用 HTTP 服务器运行。</small>
                </div>
                <button class="article-collapse-btn" onclick="collapseArticle(event)">
                    <i class="fa-solid fa-chevron-up"></i> 收起文章
                </button>
            `;
        }
    }
    
    // ========== 博客文章展开模式 ==========
    
    /**
     * 展开文章卡片（有 data-md 的博客文章）
     */
    function expandArticle(card) {
        // 如果点击的是已展开的卡片，不做任何事
        if (card.classList.contains('expanded')) {
            return;
        }
        
        // 如果有其他卡片展开，先收起
        if (currentExpandedCard && currentExpandedCard !== card) {
            collapseArticleCard(currentExpandedCard);
        }
        
        const mdPath = card.dataset.md;
        let expandContent = card.querySelector('.article-expand-content');
        
        // 如果没有展开内容容器，创建一个
        if (!expandContent) {
            expandContent = document.createElement('div');
            expandContent.className = 'article-expand-content';
            expandContent.innerHTML = '<div class="markdown-body"></div>';
            card.appendChild(expandContent);
        }
        
        const markdownContainer = expandContent.querySelector('.markdown-body');
        
        // 添加展开状态
        card.classList.add('expanded');
        blogWrapper.classList.add('has-expanded');
        currentExpandedCard = card;
        
        // 加载 Markdown 内容
        if (mdPath && markdownContainer) {
            loadMarkdown(mdPath, markdownContainer);
        }
        
        // 平滑滚动到展开的卡片
        setTimeout(() => {
            card.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }, 100);
    }
    
    /**
     * 收起文章卡片
     */
    function collapseArticleCard(card) {
        if (!card) return;
        
        card.classList.remove('expanded');
        
        // 完全移除展开内容元素，确保布局恢复
        const expandContent = card.querySelector('.article-expand-content');
        if (expandContent) {
            expandContent.remove();
        }
        
        // 检查是否还有其他展开的卡片
        const expandedCards = document.querySelectorAll('.article-card.expanded');
        if (expandedCards.length === 0) {
            blogWrapper.classList.remove('has-expanded');
            currentExpandedCard = null;
        }
    }
    
    // 全局收起函数（供按钮调用）
    window.collapseArticle = function(event) {
        event.stopPropagation();
        const card = event.target.closest('.article-card');
        if (card) {
            collapseArticleCard(card);
            
            // 滚动回卡片位置
            setTimeout(() => {
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
            }, 100);
        }
    };
    
    // ========== 图文弹窗模式 ==========
    
    /**
     * 打开图文弹窗（没有 data-md 的图文作品）
     */
    function openModal(card) {
        if (!modal) return;
        
        const img = card.querySelector('.article-cover img');
        const titleEl = card.querySelector('.article-title');
        const excerptEl = card.querySelector('.article-excerpt');
        
        // 设置图片
        if (img && modalImg) {
            modalImg.src = img.src;
        }
        
        // 设置标题
        if (titleEl && modalTitle) {
            modalTitle.textContent = titleEl.textContent;
        }
        
        // 设置内容
        if (excerptEl && modalText) {
            modalText.textContent = excerptEl.textContent;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * 关闭弹窗
     */
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 弹窗关闭按钮
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击遮罩关闭弹窗
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    // ========== 卡片点击事件 ==========
    
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是收起按钮，不处理
            if (e.target.closest('.article-collapse-btn')) {
                return;
            }
            
            // 如果卡片已展开，点击内容区域不收起
            if (this.classList.contains('expanded')) {
                return;
            }
            
            // 根据是否有 data-md 属性决定使用哪种模式
            if (this.dataset.md) {
                // 有 markdown 文件 -> 展开模式
                expandArticle(this);
            } else {
                // 没有 markdown 文件 -> 弹窗模式
                openModal(this);
            }
        });
    });
    
    // ========== 快捷键 ==========
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // ESC 键收起展开的文章或关闭弹窗
            if (currentExpandedCard) {
                collapseArticleCard(currentExpandedCard);
            }
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });
    
    // ========== 回到顶部按钮 ==========
    
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-article';
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.title = '回到文章顶部';
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        if (currentExpandedCard) {
            currentExpandedCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
    });
    
    // 监听滚动，显示/隐藏回到顶部按钮
    window.addEventListener('scroll', () => {
        if (currentExpandedCard) {
            const cardRect = currentExpandedCard.getBoundingClientRect();
            if (cardRect.top < -200) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
});
