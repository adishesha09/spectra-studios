// Boot sequence
document.addEventListener('DOMContentLoaded', function () {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');
    const enterPrompt = document.getElementById('enter-prompt');
    const thankYouPage = document.getElementById('thank-you-page');
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-btn');

    // Check if we're coming from a form submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        // Show thank you page directly
        bootScreen.style.display = 'none';
        desktop.style.display = 'none';
        thankYouPage.style.display = 'flex';
    } else {
        // Normal boot sequence
        // Show enter prompt after boot text animation
        setTimeout(() => {
            enterPrompt.style.display = 'block';
        }, 2500);

        // Function to proceed to desktop
        function proceedToDesktop() {
            bootScreen.style.display = 'none';
            desktop.style.display = 'block';
            updateClock();
            setInterval(updateClock, 1000);
        }

        // Handle Enter key to proceed to desktop
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                proceedToDesktop();
            }
        });

        // Also allow clicking on boot screen to proceed
        bootScreen.addEventListener('click', function () {
            proceedToDesktop();
        });
    }

    // Start menu functionality
    startBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close start menu when clicking elsewhere
    document.addEventListener('click', function () {
        startMenu.style.display = 'none';
    });

    // Prevent start menu from closing when clicking inside it
    startMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Start menu items functionality
    document.querySelectorAll('.start-menu-item[data-window]').forEach(item => {
        item.addEventListener('click', function () {
            const windowId = this.getAttribute('data-window');
            openWindow(windowId);
            startMenu.style.display = 'none';
        });
    });

    // Shutdown button functionality
    document.getElementById('shutdown-btn').addEventListener('click', function () {
        if (confirm('Are you sure you want to shutdown SpectraOS?')) {
            bootScreen.style.display = 'flex';
            desktop.style.display = 'none';
            startMenu.style.display = 'none';
            document.getElementById('boot-text').textContent = 'Shutting down...';
            document.getElementById('enter-prompt').style.display = 'none';

            setTimeout(() => {
                document.getElementById('boot-text').textContent = 'SpectraOS has been shut down.';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                }, 2000);
            }, 1500);
        }
    });

    // Return to desktop from thank you page
    document.getElementById('return-to-desktop').addEventListener('click', function () {
        thankYouPage.style.display = 'none';
        desktop.style.display = 'block';
    });
});

// Update clock in taskbar
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('clock').textContent = timeString;
}

// Window management
document.addEventListener('DOMContentLoaded', function () {
    // Folder click handlers
    document.getElementById('about-folder').addEventListener('click', function () {
        openWindow('about-window');
    });

    document.getElementById('projects-folder').addEventListener('click', function () {
        openWindow('projects-window');
    });

    document.getElementById('contact-folder').addEventListener('click', function () {
        openWindow('contact-window');
    });

    // Window controls
    document.querySelectorAll('.window').forEach(window => {
        const header = window.querySelector('.window-header');
        const minimizeBtn = window.querySelector('.minimize-btn');
        const maximizeBtn = window.querySelector('.maximize-btn');
        const closeBtn = window.querySelector('.close-btn');

        // Dragging
        makeDraggable(window, header);

        // Resizing
        makeResizable(window);

        // Minimize
        minimizeBtn.addEventListener('click', function () {
            window.style.display = 'none';
        });

        // Maximize/Restore
        let isMaximized = false;
        let originalSize = {};

        maximizeBtn.addEventListener('click', function () {
            if (!isMaximized) {
                originalSize = {
                    width: window.style.width,
                    height: window.style.height,
                    top: window.style.top,
                    left: window.style.left
                };

                window.style.width = '95%';
                window.style.height = '85%';
                window.style.top = '2.5%';
                window.style.left = '2.5%';
                isMaximized = true;
            } else {
                window.style.width = originalSize.width;
                window.style.height = originalSize.height;
                window.style.top = originalSize.top;
                window.style.left = originalSize.left;
                isMaximized = false;
            }
        });

        // Close
        closeBtn.addEventListener('click', function () {
            window.style.display = 'none';
        });
    });

    // Contact form submission
    // Thank you page functionality
    const thankYouPage = document.getElementById('thank-you-page');

    // Return to desktop from thank you page
    document.getElementById('return-to-desktop').addEventListener('click', function () {
        thankYouPage.style.display = 'none';
        desktop.style.display = 'block';
    });

    // Close thank you page with X button
    document.getElementById('thank-you-close').addEventListener('click', function () {
        thankYouPage.style.display = 'none';
        desktop.style.display = 'block';
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);

        // Send to FormSubmit
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Show thank you page on success
                    desktop.style.display = 'none';
                    thankYouPage.style.display = 'flex';

                    // Reset form
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

    // Make thank you page draggable and resizable
    document.addEventListener('DOMContentLoaded', function () {
        const thankYouWindow = document.querySelector('#thank-you-page .window');
        const thankYouHeader = thankYouWindow.querySelector('.window-header');

        // Make draggable
        makeDraggable(thankYouWindow, thankYouHeader);

        // Make resizable
        makeResizable(thankYouWindow);
    });

    // Resume download
    document.getElementById('download-resume').addEventListener('click', function () {
        alert('Resume download would start here');
        // In a real implementation, this would link to the actual PDF
    });
});

// Function to open a window
function openWindow(windowId) {
    const window = document.getElementById(windowId);
    window.style.display = 'block';

    // Bring to front
    document.querySelectorAll('.window').forEach(w => {
        w.style.zIndex = '10';
    });
    window.style.zIndex = '20';
}

// Make element draggable
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        // Get initial cursor position
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Bring to front
        document.querySelectorAll('.window').forEach(w => {
            w.style.zIndex = '10';
        });
        element.style.zIndex = '20';

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Set new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Make element resizable
function makeResizable(element) {
    const handles = element.querySelectorAll('.resize-handle');

    handles.forEach(handle => {
        handle.addEventListener('mousedown', initResize);
    });

    function initResize(e) {
        e.preventDefault();

        const direction = e.target.className.split(' ')[1].split('-')[1];
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
        const startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
        const startLeft = element.offsetLeft;
        const startTop = element.offsetTop;

        document.onmousemove = doResize;
        document.onmouseup = stopResize;

        function doResize(e) {
            if (direction === 'e') {
                element.style.width = (startWidth + e.clientX - startX) + 'px';
            } else if (direction === 'w') {
                element.style.width = (startWidth - e.clientX + startX) + 'px';
                element.style.left = (startLeft + e.clientX - startX) + 'px';
            } else if (direction === 's') {
                element.style.height = (startHeight + e.clientY - startY) + 'px';
            } else if (direction === 'n') {
                element.style.height = (startHeight - e.clientY + startY) + 'px';
                element.style.top = (startTop + e.clientY - startY) + 'px';
            } else if (direction === 'se') {
                element.style.width = (startWidth + e.clientX - startX) + 'px';
                element.style.height = (startHeight + e.clientY - startY) + 'px';
            } else if (direction === 'sw') {
                element.style.width = (startWidth - e.clientX + startX) + 'px';
                element.style.height = (startHeight + e.clientY - startY) + 'px';
                element.style.left = (startLeft + e.clientX - startX) + 'px';
            } else if (direction === 'ne') {
                element.style.width = (startWidth + e.clientX - startX) + 'px';
                element.style.height = (startHeight - e.clientY + startY) + 'px';
                element.style.top = (startTop + e.clientY - startY) + 'px';
            } else if (direction === 'nw') {
                element.style.width = (startWidth - e.clientX + startX) + 'px';
                element.style.height = (startHeight - e.clientY + startY) + 'px';
                element.style.left = (startLeft + e.clientX - startX) + 'px';
                element.style.top = (startTop + e.clientY - startY) + 'px';
            }
        }

        function stopResize() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}