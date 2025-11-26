function createSakura() {
    const petal = document.createElement('div');
    petal.classList.add('sakura');

    const size = Math.random() * 10 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;

    petal.style.left = Math.random() * 100 + 'vw';

    const duration = Math.random() * 3 + 3 + 's';
    petal.style.animationDuration = duration;

    petal.style.animationDelay = Math.random() * 2 + 's';

    const colors = ['#ffdde1', '#ffc1c1', '#ff9a9e'];
    petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 6000); 
}

// 每 300 毫秒生成一片花瓣
setInterval(createSakura, 300);