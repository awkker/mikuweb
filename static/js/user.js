// --- 控制自定义弹窗 ---
const LoginModal = {
    modal: null,
    input: null,

    // 初始化
    init() {
        this.modal = document.getElementById('login-modal');
        this.input = document.getElementById('login-password');
        
        // 绑定回车键提交
        if(this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.submit();
            });
        }
        
        // 点击蒙层关闭
        if(this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hide();
            });
        }
    },

    // 显示弹窗
    show() {
        if (!this.modal) this.init(); // 如果还没初始化，先初始化
        this.modal.style.display = 'flex';
        // 稍微延时一点点加 active 类，为了触发淡入动画
        setTimeout(() => {
            this.modal.classList.add('active');
            if(this.input) {
                this.input.value = ''; // 清空旧密码
                this.input.focus();    // 自动聚焦
            }
        }, 10);
    },

    // 隐藏弹窗
    hide() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300); // 等动画播完再隐藏
    },

    // 提交登录
    async submit() {
        const password = this.input.value;
        if (!password) {
            this.shake(); // 没填密码就抖动一下
            return;
        }

        const btn = document.querySelector('.login-submit-btn');
        const originalText = btn.innerText;
        btn.innerText = "验证中...";
        btn.disabled = true;

        try {
            // 发送请求给后端
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password })
            });

            const data = await response.json();

            if (response.ok) {
                // --- 登录成功 ---
                localStorage.setItem('auth_token', data.token);
                localStorage.setItem('user_nickname', data.nickname);
                localStorage.setItem('user_avatar', data.avatar);
                
                this.hide();
                alert(`欢迎回来，${data.nickname}！`);
                location.reload(); // 刷新页面
            } else {
                // --- 登录失败 ---
                this.shake();
                this.input.value = '';
                this.input.placeholder = "密码错误喵...";
            }
        } catch (e) {
            alert("服务器炸了喵！(>_<)");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    },

    // 错误时抖动窗口
    shake() {
        const box = document.querySelector('.login-box');
        box.classList.add('shake');
        setTimeout(() => box.classList.remove('shake'), 500);
    }
};


// --- UserModule ---
const UserModule = (function() {
    
    const API_BASE = 'http://localhost:8080';
    
    // 检查本地是否有 Token
    function isLoggedIn() {
        return localStorage.getItem('auth_token') !== null;
    }

    // 初始化
    function init() {
         const token = localStorage.getItem('auth_token');
         const nickname = localStorage.getItem('user_nickname');
         
         const avatarImg = document.getElementById('user-avatar');
         const nameEl = document.getElementById('menu-username');
 
         // 头像路径
         const AVATAR_ADMIN = '../images/picture/author/xunyi.png';
         const AVATAR_GUEST = '../images/picture/logo/user.png';
 
         if (isLoggedIn()) {
            // 已登录
             if (avatarImg) avatarImg.src = AVATAR_ADMIN;
             if (nameEl) nameEl.textContent = nickname || 'awkker';
         } else {
            // 未登录
             if (avatarImg) avatarImg.src = AVATAR_GUEST;
         }
    }

    // 点击头像的逻辑
    function handleUserClick() {
        if (isLoggedIn()) {
            // 已登录：显示菜单
            const menu = document.getElementById('user-menu');
            menu.classList.toggle('show');
        } else {
            // 未登录
            LoginModal.show(); 
        }
    }

    // 退出登录
    function logout() {
        
        if(confirm("确定要离开Miku画廊吗？(T_T)")) {
            localStorage.clear(); 
            location.reload();    
        }
    }
    
    // 点击其他地方关闭菜单
    window.addEventListener('click', (e) => {
        const container = document.querySelector('.user-dropdown-container');
        const menu = document.getElementById('user-menu');
        if (container && !container.contains(e.target)) {
            if(menu) menu.classList.remove('show');
        }
    });

    return {
        init,
        handleUserClick,
        logout
    };
})();

document.addEventListener('DOMContentLoaded', UserModule.init);