# SpectraOS

## Overview
SpectraOS is an interactive retro desktop environment that functions as a game development portfolio, built with **HTML5**, **CSS3**, and **vanilla JavaScript**.

## Core Features

### Desktop Environment
- **Boot Sequence:** Animated loading screen with terminal-style typing animation  
- **Window Management:** Fully draggable, resizable windows with minimize/maximize/close controls  
- **Taskbar:** System tray with Start button and live clock display  
- **Desktop Icons:** Interactive folder icons for application launching  

### Theme System
Three Visual Themes:
- **Midnight Blue:** Classic Windows 98 aesthetic  
- **CRT Green:** Retro monochrome terminal experience  
- **Vaporwave Pink:** Synthwave aesthetic with vibrant gradients  

**Persistent Storage:** Theme preferences saved in localStorage  
**Real-time Switching:** Instant theme changes without page reload  

### Interactive Elements
- **Pikachu Companion:** Animated sprite that follows cursor movement with physics-based behavior  
- **CRT Effects:** Authentic scanlines overlay for retro monitor appearance  
- **Form Handling:** Contact form with FormSubmit.co integration and success states  

## Applications
- **About Window:** Professional portfolio with biography, education, and mission statement  
- **Projects Window:** Embedded game jam submissions and project showcases  
- **Contact Window:** Functional contact form with resume download and social links  
- **Themes Window:** Visual theme selector with previews and descriptions  

## Technical Implementation

### Frontend Architecture
- **Pure JavaScript:** Custom window management system without frameworks  
- **CSS Custom Properties:** Dynamic theming through CSS variables  
- **Responsive Design:** Mobile-optimized interface maintaining retro aesthetic  
- **Z-index Layering:** Proper element hierarchy for desktop simulation  

### Performance Features
- **Animation Optimization:** requestAnimationFrame for smooth Pikachu movement  
- **Touch Support:** Comprehensive mobile touch event handling  
- **Asset Management:** Optimized images and fonts with fallbacks  

### Integration Features
- **Analytics:** Google Analytics tracking  
- **SEO Optimization:** Comprehensive meta tags, Open Graph, and structured data  
- **Form Processing:** FormSubmit.co backend integration  

## Browser Compatibility
- Modern browsers with CSS Custom Properties support  
- Mobile Safari and Chrome  
- Touch and mouse input support  
- Responsive breakpoints for tablet and mobile  

## File Structure
```
├── css/
│   └── styles.css (Theme system and UI styles)
├── imgs/ (Assets and icons)
├── resources/ (Downloads and documents)
├── CNAME
├── README.md
├── index.html (Main application)
├── script.js (Desktop functionality)
├── robots.txt
└── sitemap.xml
```

## Theme Specifications

### Midnight Blue
- **Primary:** #000080 (Navy blue)  
- **Background:** Linear gradient (dark blue to black)  
- **Interface:** Classic gray windows with 3D borders  

### CRT Green
- **Primary:** #00ff00 (Bright green)  
- **Background:** #001100 (Dark green)  
- **Text:** Monochrome green with scanline overlay  

### Vaporwave Pink
- **Primary:** #ff71ce (Hot pink)  
- **Background:** Multi-color gradient  
- **Accent:** #01cdfe (Cyan)  

## Interactive Components

### Window Controls
- Drag handles on window headers  
- Eight-direction resize handles  
- Minimize/maximize/close functionality  
- Mobile-optimized touch controls  

### Pikachu Companion
- 64x64 pixel animated GIF  
- Physics-based chasing algorithm  
- Acceleration and momentum simulation  
- Z-index management for window layering  

### Form System
- Client-side validation  
- Success state with animated confirmation  
- File download functionality  
- Social media integration  

## Mobile Optimization
- Touch-friendly controls (32px minimum target size)  
- Responsive window positioning  
- Mobile-specific layout adjustments  
- Gesture support for window manipulation  

## Future Development Roadmap
- Terminal mode with command-line interface  
- Expanded theme system with user customization  
- Additional interactive companions  
- Enhanced sound effects and audio feedback  
- Advanced window management features  

---

**Live Demo:** [https://spectrastudios.co.za](https://spectrastudios.co.za)  
**Current Version:** v2.1  
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript  
**Browser Support:** Chrome, Firefox, Safari, Edge (modern versions)
