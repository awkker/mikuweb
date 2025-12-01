// 文章详情弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('articleModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.querySelector('.modal-close');
    
    // 如果页面没有弹窗元素，不初始化
    if (!modal) return;
    
    // 点击文章卡片打开详情
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.article-cover img');
            const titleEl = this.querySelector('.article-title');
            const categoryEl = this.querySelector('.article-category');
            const dateEl = this.querySelector('.article-date');
            const excerptEl = this.querySelector('.article-excerpt');
            
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
            
            // 设置描述文字
            if (excerptEl && modalText) {
                modalText.textContent = excerptEl.textContent;
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
