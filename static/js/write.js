const API_URL = "http://localhost:8080/admin/posts";
        const editor = document.getElementById('content');
        const preview = document.getElementById('preview');
        const container = document.getElementById('mainContainer');
        const eyeBtn = document.getElementById('eyeBtn');
        const eyeIcon = eyeBtn.querySelector('i');

        // --- 切换预览逻辑 ---
        let isPreviewOn = true;

        function togglePreview() {
            isPreviewOn = !isPreviewOn;
            
            if (isPreviewOn) {
                container.classList.remove('preview-hidden');
                eyeIcon.className = 'fa-solid fa-eye';
                eyeBtn.classList.remove('active');
                // 刷新渲染
                const val = editor.value.trim();
                preview.innerHTML = val ? marked.parse(val) : getDefaultPreview();
            } else {
                container.classList.add('preview-hidden');
                eyeIcon.className = 'fa-solid fa-eye-slash'; 
                eyeBtn.classList.add('active'); 
            }
        }

        function getDefaultPreview() {
            return `<div style="color:#aaa; text-align:center; margin-top:40px; opacity: 0.6;">
                <p>实时预览区域</p>
            </div>`;
        }

        // --- 实时渲染 ---
        editor.addEventListener('input', () => {
            if (isPreviewOn) {
                const val = editor.value.trim();
                preview.innerHTML = val ? marked.parse(val) : getDefaultPreview();
            }
        });

        // --- 插入 Markdown ---
        function insertMD(prefix, suffix) {
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            const text = editor.value;
            const selection = text.substring(start, end);
            const newText = text.substring(0, start) + prefix + selection + suffix + text.substring(end);
            
            editor.value = newText;
            editor.focus();
            editor.setSelectionRange(start + prefix.length, end + prefix.length);
            editor.dispatchEvent(new Event('input'));
        }

        // --- 发布 ---
        async function publish() {
            const btn = document.getElementById('publishBtn');
            const token = localStorage.getItem('auth_token');
            
            const data = {
                title: document.getElementById('title').value,
                summary: document.getElementById('summary').value,
                cover: document.getElementById('cover')?.value || '',
                content: editor.value
            };

            if(!data.title || !data.content) {
                alert('别忘了写标题和正文哦！');
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 发送中...';

            try {
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': token },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    const result = await res.json();
                    alert('发布成功喵！文章已保存到博客页面~');
                    // 清空表单
                    document.getElementById('title').value = '';
                    document.getElementById('summary').value = '';
                    if (document.getElementById('cover')) {
                        document.getElementById('cover').value = '';
                    }
                    editor.value = '';
                    preview.innerHTML = getDefaultPreview();
                } else if (res.status === 401) {
                    alert('登录失效喵~(T_T)');
                    logout();
                } else {
                    alert('发布失败喵~(T_T)');
                }
            } catch (err) {
                alert('网络错误喵~(T_T)');
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 发布文章';
            }
        }

        function logout() {
            if(confirm('确定要退出吗？(T_T)')) {
                localStorage.clear();
                window.location.href = '../main.html'; 
            }
        }