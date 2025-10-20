
window.pikachuInitialized = false;
window.pikachuAnimationId = null;

let currentTheme = 'midnight-blue';

function changeTheme(themeName) {
    console.log(`Changing theme to: ${themeName}`);
    document.body.classList.remove('theme-crt-green', 'theme-vaporwave-pink', 'theme-midnight-blue');
    document.body.classList.add(`theme-${themeName}`);
    currentTheme = themeName;
    localStorage.setItem('spectraos-theme', themeName);
    document.body.style.animation = 'none';
    setTimeout(() => { document.body.style.animation = ''; }, 10);
    console.log(`Theme successfully changed to: ${themeName}`);
}

function updateActiveThemeOption(themeName) {
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.getAttribute('data-theme') === themeName) option.classList.add('active');
        else option.classList.remove('active');
    });
}

function openWindow(windowId) {
    console.log(`Opening window: ${windowId}`);
    const win = document.getElementById(windowId);
    if (!win) { console.error(`Window not found: ${windowId}`); return; }
    win.style.display = 'block';
    document.querySelectorAll('.window').forEach(w => { w.style.zIndex = '10'; });
    win.style.zIndex = '20';
    if (windowId === 'themes-window') {
        console.log('Themes window opened, initializing theme selection');
        setTimeout(initThemeSelection, 50);
    }
    setTimeout(addMobileWindowControls, 10);
}

function initThemeSelection() {
    console.log('Initializing theme selection...');
    const themeOptions = document.querySelectorAll('.theme-option');
    console.log(`Found ${themeOptions.length} theme options`);

    themeOptions.forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
    });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme option clicked:', this.getAttribute('data-theme'));
            const theme = this.getAttribute('data-theme');
            if (theme) {
                changeTheme(theme);
                updateActiveThemeOption(theme);
            }
        });
    });

    updateActiveThemeOption(currentTheme);
}

function addMobileWindowControls() {
    document.querySelectorAll('.window-control').forEach(control => {
        control.removeEventListener('touchstart', handleTouchControl);
        control.addEventListener('touchstart', handleTouchControl, { passive: false });
    });
}

function handleTouchControl(e) {
    e.preventDefault();
    e.stopPropagation();
    const control = e.currentTarget;
    const win = control.closest('.window');
    if (!win) return;
    if (control.classList.contains('minimize-btn') || control.classList.contains('close-btn')) {
        win.style.display = 'none';
    } else if (control.classList.contains('maximize-btn')) {
        control.click();
    }
}

function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.addEventListener('mousedown', dragMouseDown);
    handle.addEventListener('touchstart', dragTouchDown, { passive: false });

    function dragMouseDown(e) {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('mouseup', closeDragElement);
    }

    function dragTouchDown(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
        document.addEventListener('touchmove', elementTouchDrag, { passive: false });
        document.addEventListener('touchend', closeDragElement);
    }

    function startDrag(clientX, clientY) {
        pos3 = clientX; pos4 = clientY;
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = '10');
        element.style.zIndex = '20';
    }

    function elementDrag(e) {
        e.preventDefault();
        updatePosition(e.clientX, e.clientY);
    }

    function elementTouchDrag(e) {
        e.preventDefault();
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
    }

    function updatePosition(clientX, clientY) {
        pos1 = pos3 - clientX; pos2 = pos4 - clientY;
        pos3 = clientX; pos4 = clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('touchmove', elementTouchDrag);
        document.removeEventListener('touchend', closeDragElement);
    }
}

function makeResizable(element) {
    const handles = element.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
        handle.addEventListener('mousedown', initResize);
        handle.addEventListener('touchstart', initTouchResize, { passive: false });
    });

    function initResize(e) {
        e.preventDefault();
        startResize(e.clientX, e.clientY, e.target);
    }

    function initTouchResize(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startResize(touch.clientX, touch.clientY, e.target);
    }

    function startResize(startX, startY, handle) {
        const direction = handle.className.split(' ')[1].split('-')[1];
        const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
        const startLeft = element.offsetLeft;
        const startTop = element.offsetTop;

        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchmove', doTouchResize, { passive: false });
        document.addEventListener('touchend', stopResize);

        function doResize(e) { resizeElement(e.clientX, e.clientY); }
        function doTouchResize(e) {
            e.preventDefault();
            const touch = e.touches[0];
            resizeElement(touch.clientX, touch.clientY);
        }

        function resizeElement(clientX, clientY) {
            if (direction === 'e') element.style.width = (startWidth + clientX - startX) + 'px';
            else if (direction === 'w') {
                element.style.width = (startWidth - clientX + startX) + 'px';
                element.style.left = (startLeft + clientX - startX) + 'px';
            } else if (direction === 's') element.style.height = (startHeight + clientY - startY) + 'px';
            else if (direction === 'n') {
                element.style.height = (startHeight - clientY + startY) + 'px';
                element.style.top = (startTop + clientY - startY) + 'px';
            } else if (direction === 'se') {
                element.style.width = (startWidth + clientX - startX) + 'px';
                element.style.height = (startHeight + clientY - startY) + 'px';
            } else if (direction === 'sw') {
                element.style.width = (startWidth - clientX + startX) + 'px';
                element.style.height = (startHeight + clientY - startY) + 'px';
                element.style.left = (startLeft + clientX - startX) + 'px';
            } else if (direction === 'ne') {
                element.style.width = (startWidth + clientX - startX) + 'px';
                element.style.height = (startHeight - clientY + startY) + 'px';
                element.style.top = (startTop + clientY - startY) + 'px';
            } else if (direction === 'nw') {
                element.style.width = (startWidth - clientX + startX) + 'px';
                element.style.height = (startHeight - clientY + startY) + 'px';
                element.style.left = (startLeft + clientX - startX) + 'px';
                element.style.top = (startTop + clientY - startY) + 'px';
            }
        }

        function stopResize() {
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('touchmove', doTouchResize);
            document.removeEventListener('touchend', stopResize);
        }
    }
}

function initPikachuFollower() {
    if (window.pikachuInitialized && window.pikachuAnimationId) {
        const pikachu = document.getElementById('pikachu');
        if (pikachu) { pikachu.style.display = 'block'; bringPikachuToFront(); }
        return;
    }

    if (window.pikachuAnimationId) {
        cancelAnimationFrame(window.pikachuAnimationId);
        window.pikachuAnimationId = null;
    }

    const pikachu = document.getElementById('pikachu');
    let mouseX = 0, mouseY = 0, pikachuX = 0, pikachuY = 0, velocityX = 0, velocityY = 0, isFollowing = false;

    function bringPikachuToFront() {
        if (pikachu) pikachu.style.zIndex = '1999';
    }

    function resetPikachu() {
        pikachuX = Math.random() * (window.innerWidth - 64);
        pikachuY = Math.random() * (window.innerHeight - 64);
        velocityX = 0; velocityY = 0; isFollowing = false;
        if (pikachu) {
            pikachu.style.left = `${pikachuX}px`;
            pikachu.style.top = `${pikachuY}px`;
            pikachu.style.display = 'block';
            bringPikachuToFront();
        }
    }

    function handleMouseMove(e) {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!isFollowing) isFollowing = true;
    }

    function animatePikachu() {
        if (isFollowing && pikachu && pikachu.style.display !== 'none') {
            const dx = mouseX - pikachuX, dy = mouseY - pikachuY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 60) {
                const acceleration = 0.1;
                const forceX = (dx / distance) * acceleration;
                const forceY = (dy / distance) * acceleration;
                velocityX += forceX; velocityY += forceY;
                velocityX *= 0.95; velocityY *= 0.95;
                const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
                const maxSpeed = 5;
                if (speed > maxSpeed) { velocityX = (velocityX / speed) * maxSpeed; velocityY = (velocityY / speed) * maxSpeed; }
                pikachuX += velocityX; pikachuY += velocityY;
                pikachuX = Math.max(0, Math.min(window.innerWidth - 64, pikachuX));
                pikachuY = Math.max(0, Math.min(window.innerHeight - 64, pikachuY));
                pikachu.style.left = `${pikachuX}px`; pikachu.style.top = `${pikachuY}px`;
                if (velocityX > 0.1) pikachu.style.transform = 'scaleX(1)';
                else if (velocityX < -0.1) pikachu.style.transform = 'scaleX(-1)';
                const bob = Math.sin(Date.now() / 100) * 3;
                pikachu.style.transform += ` translateY(${bob}px)`;
                bringPikachuToFront();
            } else { velocityX *= 0.8; velocityY *= 0.8; }
        }
        window.pikachuAnimationId = requestAnimationFrame(animatePikachu);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () => { if (pikachu) pikachu.style.display = 'none'; });
    document.addEventListener('mouseenter', () => { if (pikachu && isFollowing) { pikachu.style.display = 'block'; bringPikachuToFront(); } });
    document.addEventListener('click', bringPikachuToFront);
    document.addEventListener('mousedown', bringPikachuToFront);

    const taskbar = document.getElementById('taskbar');
    const startBtn = document.getElementById('start-btn');
    if (taskbar) taskbar.addEventListener('click', bringPikachuToFront);
    if (startBtn) startBtn.addEventListener('click', bringPikachuToFront);

    resetPikachu();
    window.pikachuAnimationId = requestAnimationFrame(animatePikachu);
    window.pikachuInitialized = true;
}

function showPikachu() {
    const pikachu = document.getElementById('pikachu');
    if (!pikachu) return;
    if (window.pikachuAnimationId) {
        cancelAnimationFrame(window.pikachuAnimationId);
        window.pikachuAnimationId = null;
    }
    const newPikachu = pikachu.cloneNode(true);
    pikachu.parentNode.replaceChild(newPikachu, pikachu);
    setTimeout(initPikachuFollower, 100);
}

function cleanupPikachu() {
    if (window.pikachuAnimationId) {
        cancelAnimationFrame(window.pikachuAnimationId);
        window.pikachuAnimationId = null;
    }
    window.pikachuInitialized = false;
    const pikachu = document.getElementById('pikachu');
    if (pikachu) pikachu.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');
    const enterPrompt = document.getElementById('enter-prompt');
    const thankYouPage = document.getElementById('thank-you-page');
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-btn');

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        if (bootScreen) bootScreen.style.display = 'none';
        if (desktop) desktop.style.display = 'none';
        if (thankYouPage) thankYouPage.style.display = 'flex';
    } else {
        setTimeout(() => { if (enterPrompt) enterPrompt.style.display = 'block'; }, 2500);

        function proceedToDesktop() {
            if (bootScreen) bootScreen.style.display = 'none';
            if (desktop) desktop.style.display = 'block';
            updateClock();
            setInterval(updateClock, 1000);
            initPikachuFollower();
        }

        document.addEventListener('keydown', function (e) { if (e.key === 'Enter') proceedToDesktop(); });
        if (bootScreen) bootScreen.addEventListener('click', proceedToDesktop);
    }

    if (startBtn) {
        startBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    document.addEventListener('click', function () { if (startMenu) startMenu.style.display = 'none'; });
    if (startMenu) startMenu.addEventListener('click', function (e) { e.stopPropagation(); });

    document.querySelectorAll('.start-menu-item[data-window]').forEach(item => {
        item.addEventListener('click', function () {
            const windowId = this.getAttribute('data-window');
            openWindow(windowId);
            if (startMenu) startMenu.style.display = 'none';
            if (windowId === 'themes-window') {
                updateActiveThemeOption(currentTheme);
                setTimeout(initThemeSelection, 100);
            }
        });
    });

    const shutdownBtn = document.getElementById('shutdown-btn');
    if (shutdownBtn) shutdownBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to shutdown SpectraOS?')) {
            cleanupPikachu();
            if (bootScreen) bootScreen.style.display = 'flex';
            if (desktop) desktop.style.display = 'none';
            if (startMenu) startMenu.style.display = 'none';
            const bt = document.getElementById('boot-text');
            if (bt) bt.textContent = 'Shutting down...';
            const ep = document.getElementById('enter-prompt');
            if (ep) ep.style.display = 'none';
            setTimeout(() => {
                if (bt) bt.textContent = 'SpectraOS has been shut down.';
                setTimeout(() => { if (bootScreen) bootScreen.style.display = 'none'; }, 2000);
            }, 1500);
        }
    });

    const returnBtn = document.getElementById('return-to-desktop');
    const thankYouClose = document.getElementById('thank-you-close');
    if (returnBtn) returnBtn.addEventListener('click', function () {
        if (thankYouPage) thankYouPage.style.display = 'none';
        if (desktop) desktop.style.display = 'block';
        cleanupPikachu();
        setTimeout(initPikachuFollower, 200);
    });
    if (thankYouClose) thankYouClose.addEventListener('click', function () {
        if (thankYouPage) thankYouPage.style.display = 'none';
        if (desktop) desktop.style.display = 'block';
        cleanupPikachu();
        setTimeout(initPikachuFollower, 200);
    });

    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', function (e) {
            folders.forEach(f => f.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    const themesFolderEl = document.getElementById('themes-folder');
    if (themesFolderEl) {
        themesFolderEl.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openWindow('themes-window');
            setTimeout(initThemeSelection, 100);
        });
    }

    const aboutFolder = document.getElementById('about-folder');
    if (aboutFolder) aboutFolder.addEventListener('click', () => openWindow('about-window'));
    const projectsFolder = document.getElementById('projects-folder');
    if (projectsFolder) projectsFolder.addEventListener('click', () => openWindow('projects-window'));
    const contactFolder = document.getElementById('contact-folder');
    if (contactFolder) contactFolder.addEventListener('click', () => openWindow('contact-window'));

    const savedTheme = localStorage.getItem('spectraos-theme');
    if (savedTheme) changeTheme(savedTheme);

    if (typeof initThemeSelection === 'function') initThemeSelection();

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function () {
            const theme = this.getAttribute('data-theme');
            if (theme) { changeTheme(theme); updateActiveThemeOption(theme); }
        });
    });

    const desktopEl = document.getElementById('desktop');
    if (desktopEl) {
        desktopEl.addEventListener('click', function (e) {
            if (e.target.id === 'desktop' || e.target.classList.contains('crt-scanlines')) {
                folders.forEach(folder => folder.classList.remove('selected'));
            }
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        if (desktop) desktop.style.display = 'none';
                        if (thankYouPage) thankYouPage.style.display = 'flex';
                        this.reset();
                    } else {
                        alert('There was a problem sending your message. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem sending your message. Please try again.');
                });
        });
    }

    document.querySelectorAll('.window').forEach(win => {
        const header = win.querySelector('.window-header');
        const minimizeBtn = win.querySelector('.minimize-btn');
        const maximizeBtn = win.querySelector('.maximize-btn');
        const closeBtn = win.querySelector('.close-btn');

        if (header) makeDraggable(win, header);
        makeResizable(win);

        if (minimizeBtn) minimizeBtn.addEventListener('click', () => { win.style.display = 'none'; });

        let isMaximized = false;
        let originalSize = {};

        if (maximizeBtn) maximizeBtn.addEventListener('click', function () {
            if (!isMaximized) {
                originalSize = { width: win.style.width, height: win.style.height, top: win.style.top, left: win.style.left };
                win.style.width = '95vw';
                win.style.height = '85vh';
                win.style.top = '2.5vh';
                win.style.left = '2.5vw';
                isMaximized = true;
                win.classList.add('maximized');
                setTimeout(() => { win.style.zIndex = '25'; addMobileWindowControls(); }, 10);
            } else {
                win.style.width = originalSize.width;
                win.style.height = originalSize.height;
                win.style.top = originalSize.top;
                win.style.left = originalSize.left;
                isMaximized = false;
                win.style.zIndex = '20';
                win.classList.remove('maximized');
                setTimeout(addMobileWindowControls, 10);
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', () => { win.style.display = 'none'; });
    });

    const downloadBtn = document.querySelector('.download-button');
    if (downloadBtn) downloadBtn.addEventListener('click', () => { console.log('Resume download initiated'); });

    setTimeout(addMobileWindowControls, 50);
});

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}