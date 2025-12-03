/**
 * 留言板功能模块
 * 对接后端 API，实现评论的增删查
 */

(function() {
    'use strict';

    // API 配置
    const API_BASE = 'http://localhost:8080';
    
    // 博主标识（可以根据实际情况配置）
    const AUTHOR_NICKNAME = 'awkker';

    // 表情列表
    const EMOJI_LIST = [
        '😊', '😂', '🥰', '😍', '🤔', '😅', '😢', '😭',
        '👍', '👏', '❤️', '🎉', '✨', '🌸', '🎵', '☕'
    ];

    // 浏览器图标映射
    const BROWSER_ICONS = {
        'chrome': '🌐',
        'firefox': '🦊',
        'safari': '🧭',
        'edge': '🌊',
        'opera': '🔴',
        'ie': '📘',
        'default': '🌐'
    };

    // 系统图标映射
    const OS_ICONS = {
        'windows': '🪟',
        'mac': '🍎',
        'linux': '🐧',
        'android': '🤖',
        'ios': '📱',
        'default': '💻'
    };

    /**
     * 解析 User-Agent 获取浏览器信息
     */
    function parseBrowser(ua) {
        ua = ua.toLowerCase();
        if (ua.includes('edg/') || ua.includes('edge/')) {
            const match = ua.match(/edg(?:e)?\/(\d+)/);
            return { name: 'Edge', version: match ? match[1] : '', icon: BROWSER_ICONS.edge };
        }
        if (ua.includes('chrome/') && !ua.includes('edg')) {
            const match = ua.match(/chrome\/(\d+)/);
            return { name: 'Chrome', version: match ? match[1] : '', icon: BROWSER_ICONS.chrome };
        }
        if (ua.includes('firefox/')) {
            const match = ua.match(/firefox\/(\d+)/);
            return { name: 'Firefox', version: match ? match[1] : '', icon: BROWSER_ICONS.firefox };
        }
        if (ua.includes('safari/') && !ua.includes('chrome')) {
            const match = ua.match(/version\/(\d+)/);
            return { name: 'Safari', version: match ? match[1] : '', icon: BROWSER_ICONS.safari };
        }
        return { name: '浏览器', version: '', icon: BROWSER_ICONS.default };
    }

    /**
     * 解析 User-Agent 获取操作系统信息
     */
    function parseOS(ua) {
        ua = ua.toLowerCase();
        if (ua.includes('windows nt 10') || ua.includes('windows nt 11')) {
            return { name: 'Windows 10/11', icon: OS_ICONS.windows };
        }
        if (ua.includes('windows')) {
            return { name: 'Windows', icon: OS_ICONS.windows };
        }
        if (ua.includes('mac os x') || ua.includes('macintosh')) {
            return { name: 'macOS', icon: OS_ICONS.mac };
        }
        if (ua.includes('linux')) {
            return { name: 'Linux', icon: OS_ICONS.linux };
        }
        if (ua.includes('android')) {
            return { name: 'Android', icon: OS_ICONS.android };
        }
        if (ua.includes('iphone') || ua.includes('ipad')) {
            return { name: 'iOS', icon: OS_ICONS.ios };
        }
        return { name: '未知系统', icon: OS_ICONS.default };
    }

    /**
     * 格式化日期
     */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    /**
     * 创建评论卡片 HTML
     */
    function createCommentCard(comment) {
        const browser = parseBrowser(comment.user_agent || '');
        const os = parseOS(comment.user_agent || '');
        const isAuthor = comment.nickname === AUTHOR_NICKNAME;
        
        // 生成头像（使用首字母或默认图片）
        const avatarLetter = (comment.nickname || '?')[0].toUpperCase();
        
        return `
            <div class="comment-card" data-id="${comment.id}">
                <div class="comment-avatar">
                    <div class="avatar-img avatar-placeholder">${avatarLetter}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-user-row">
                        ${isAuthor ? '<span class="tag-author">博主</span>' : ''}
                        <span class="comment-nickname">${escapeHtml(comment.nickname)}</span>
                    </div>
                    <div class="comment-meta-row">
                        <span class="comment-time">${formatDate(comment.created_at)}</span>
                        <span class="comment-browser">
                            <span>${browser.icon}</span>
                            <span>${browser.name} ${browser.version}</span>
                        </span>
                        <span class="comment-os">
                            <span>${os.icon}</span>
                            <span>${os.name}</span>
                        </span>
                        <span class="comment-location">${escapeHtml(comment.location || '未知位置')}</span>
                        <div class="comment-actions">
                            <button class="comment-delete-btn" onclick="CommentModule.deleteComment(${comment.id})" title="删除">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div class="comment-content">${escapeHtml(comment.content)}</div>
                </div>
            </div>
        `;
    }

    /**
     * HTML 转义
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 加载评论列表
     */
    async function loadComments() {
        const listEl = document.getElementById('comment-list');
        const countEl = document.getElementById('comment-count');
        
        if (!listEl) return;
        
        listEl.innerHTML = '<div class="comment-loading">加载中...</div>';
        
        try {
            const response = await fetch(`${API_BASE}/comments`);
            if (!response.ok) throw new Error('网络请求失败');
            
            const comments = await response.json();
            
            if (countEl) {
                countEl.textContent = `${comments.length} 条评论`;
            }
            
            if (comments.length === 0) {
                listEl.innerHTML = `
                    <div class="comment-empty">
                        <div class="comment-empty-icon">🌸</div>
                        <div class="comment-empty-text">还没有评论，来说点什么吧~</div>
                    </div>
                `;
                return;
            }
            
            listEl.innerHTML = comments.map(createCommentCard).join('');
            
        } catch (error) {
            console.error('加载评论失败:', error);
            listEl.innerHTML = `
                <div class="comment-empty">
                    <div class="comment-empty-text">该功能目前只能本地访问呢，以后再来看吧<br><small>${error.message}</small></div>
                </div>
            `;
        }
    }

    /**
     * 提交评论
     */
    async function submitComment(event) {
        event.preventDefault();
        
        const form = event.target;
        const submitBtn = form.querySelector('.submit-btn');
        const nicknameInput = form.querySelector('input[name="nickname"]');
        const contentInput = form.querySelector('textarea[name="content"]');
        
        const nickname = nicknameInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!content) {
            alert('请输入评论内容');
            contentInput.focus();
            return;
        }
        
        if (content.length > 1000) {
            alert('评论内容不能超过 1000 字');
            return;
        }
        
        // 禁用提交按钮
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';
        
        try {
            const response = await fetch(`${API_BASE}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nickname: nickname || '神秘路人',
                    content: content
                })
            });
            
            if (!response.ok) throw new Error('提交失败');
            
            // 清空表单
            contentInput.value = '';
            updateCharCount(contentInput);
            
            // 重新加载评论
            await loadComments();
            
            // 滚动到新评论位置
            const listEl = document.getElementById('comment-list');
            if (listEl && listEl.firstElementChild) {
                listEl.firstElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
        } catch (error) {
            console.error('提交评论失败:', error);
            alert('提交失败，请稍后重试');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '发表评论';
        }
    }

    /**
     * 删除评论
     */
    async function deleteComment(id) {
        if (!confirm('确定要删除这条评论吗？')) return;
        
        try {
            const response = await fetch(`${API_BASE}/comments/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('删除失败');
            
            // 重新加载评论
            await loadComments();
            
        } catch (error) {
            console.error('删除评论失败:', error);
            alert('删除失败，请稍后重试');
        }
    }

    /**
     * 更新字数统计
     */
    function updateCharCount(textarea) {
        const countEl = document.getElementById('char-count');
        if (!countEl) return;
        
        const length = textarea.value.length;
        const maxLength = 1000;
        
        countEl.textContent = `${length} / ${maxLength}`;
        countEl.classList.toggle('warning', length > maxLength);
    }

    /**
     * 初始化表情选择器
     */
    function initEmojiPicker() {
        const pickerEl = document.getElementById('emoji-picker');
        const textarea = document.querySelector('textarea[name="content"]');
        
        if (!pickerEl || !textarea) return;
        
        pickerEl.innerHTML = EMOJI_LIST.map(emoji => 
            `<button type="button" class="emoji-btn" data-emoji="${emoji}">${emoji}</button>`
        ).join('');
        
        pickerEl.addEventListener('click', (e) => {
            const btn = e.target.closest('.emoji-btn');
            if (!btn) return;
            
            const emoji = btn.dataset.emoji;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            
            textarea.value = text.substring(0, start) + emoji + text.substring(end);
            textarea.focus();
            textarea.setSelectionRange(start + emoji.length, start + emoji.length);
            
            updateCharCount(textarea);
        });
    }

    /**
     * 初始化
     */
    function init() {
        // 加载评论
        loadComments();
        
        // 绑定表单提交
        const form = document.getElementById('comment-form');
        if (form) {
            form.addEventListener('submit', submitComment);
        }
        
        // 绑定字数统计
        const textarea = document.querySelector('textarea[name="content"]');
        if (textarea) {
            textarea.addEventListener('input', () => updateCharCount(textarea));
            updateCharCount(textarea);
        }
        
        // 初始化表情选择器
        initEmojiPicker();
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出模块方法
    window.CommentModule = {
        loadComments,
        deleteComment
    };

})();

