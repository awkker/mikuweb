// 文章详情弹窗功能（支持 Markdown 渲染）
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('articleModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');
    const modalContent = document.getElementById('content'); // markdown 容器
    const closeBtn = document.querySelector('.modal-close');
    
    // 如果页面没有弹窗元素，不初始化
    if (!modal) return;
    
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
            container.innerHTML = cleanHtml;
            
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
            `;
        }
    }
    
    // 点击文章卡片打开详情
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.article-cover img');
            const titleEl = this.querySelector('.article-title');
            const categoryEl = this.querySelector('.article-category');
            const dateEl = this.querySelector('.article-date');
            const excerptEl = this.querySelector('.article-excerpt');
            const mdPath = this.dataset.md; // 获取 md 文件路径
            
            // 设置图片
            if (img && modalImg) {
                modalImg.src = img.src;
            }
            
            // 设置标题
            if (titleEl && modalTitle) {
                modalTitle.textContent = titleEl.textContent;
            }
            
            // 设置分类（可选）
            if (modalCategory) {
                if (categoryEl) {
                    modalCategory.textContent = '📁 ' + categoryEl.textContent;
                    modalCategory.style.display = '';
                } else {
                    modalCategory.style.display = 'none';
                }
            }
            
            // 设置日期（可选）
            if (modalDate) {
                if (dateEl) {
                    modalDate.textContent = '📅 ' + dateEl.textContent;
                    modalDate.style.display = '';
                } else {
                    modalDate.style.display = 'none';
                }
            }
            
            // 判断使用 Markdown 还是普通文本
            if (mdPath && modalContent) {
                // 有 md 路径，加载 markdown 文件
                if (modalText) modalText.style.display = 'none';
                modalContent.style.display = '';
                loadMarkdown(mdPath, modalContent);
            } else if (excerptEl) {
                // 没有 md 路径，使用原有的摘要文本
                if (modalContent) modalContent.style.display = 'none';
                if (modalText) {
                    modalText.style.display = '';
                    modalText.textContent = excerptEl.textContent;
                }
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭弹窗
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
