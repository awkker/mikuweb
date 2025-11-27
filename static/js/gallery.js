// 画廊功能 - 查看大图 + 爱心收藏
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // 如果页面没有lightbox元素，则不初始化lightbox功能
    if (!lightbox || !lightboxImg || !closeBtn) {
        return;
    }

    // 1. 给每个图片卡片添加点击事件
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const imageWrapper = item.querySelector('.image-wrapper');
        const likeBtn = item.querySelector('.like-btn');
        
        // 点击图片区域 -> 打开大图
        if (imageWrapper && img) {
            imageWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // 点击爱心按钮 -> 切换喜欢状态
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                likeBtn.classList.toggle('liked');
                // 切换爱心符号
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.textContent = '♥';
                } else {
                    likeBtn.textContent = '♡';
                }
            });
        }
    });

    // 2. 关闭功能的函数
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    // 3. 点击关闭按钮
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // 4. 点击黑色背景区域也能关闭
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 5. 按 ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            e.stopPropagation();
            closeLightbox();
        }
    });
});
