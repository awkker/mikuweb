const trailText = "Miku";
    
// 文字生成的密度
let throttleCounter = 0;

document.addEventListener('mousemove', function(e) {
    throttleCounter++;
    if (throttleCounter < 5) {
        return; 
    }
    throttleCounter = 0; 

    const span = document.createElement('span');
    span.textContent = trailText;
    span.classList.add('text-trail-item');
    span.style.left = e.clientX + 'px';
    span.style.top = e.clientY + 'px';
    const randomRotation = Math.random() * 60 - 30; 
    span.style.setProperty('--r', randomRotation + 'deg');
    document.body.appendChild(span);

    setTimeout(() => {
        span.remove();
    }, 1000);
});