let fixVerticalRhytm = function() {
    /* TEMP fix for Fx bug  */
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      [...document.querySelectorAll('.post__header')].map(el => { el.style.width = '0'; el.style.width = el.parentNode.clientWidth + 'px' });
    }

    let step = parseInt(getComputedStyle(document.body).lineHeight);
    let imgs = document.querySelectorAll('.post__content img, .post__content pre');
    [...imgs].map(el => {
        el.style.paddingBottom = 0;
        let h = el.getBoundingClientRect().height;
        let reminder = h % step;
        if (reminder > Number.EPSILON) {
            el.style.paddingBottom = step - reminder + 'px';
        }
    });
    let iframes = document.querySelectorAll('.post__content iframe');
    [...iframes].map(el => {
        let h = el.getBoundingClientRect().height;
        el.style.height = Math.ceil(h / step) * step + 'px';
    });
    if (!document.body.classList.contains('ready')) document.body.classList.add('ready');
}

onresize = onload = function() {
    clearTimeout(fixVerticalRhytm.timer);
    fixVerticalRhytm.timer = setTimeout(fixVerticalRhytm, 50);
};

/* ugly workaround for Edge objecting to implement display:contents */
if (CSS && CSS.supports('display','grid') && !CSS.supports('display','contents')) {
    let main = document.querySelector('.home > main');
    main.outerHTML = main.innerHTML;
}