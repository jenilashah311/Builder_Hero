const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');

const frameCount = 240;
const images = [];
let imagesLoaded = 0;
let isFullyLoaded = false;
let currentFrameIndex = 0;

// Set canvas dimensions
canvas.width = 1920;
canvas.height = 1080;

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    const paddedIndex = i.toString().padStart(4, '0');
    // Important: Path must be relative to root or base so Vite serves it from public folder correctly
    img.src = `/frames/frame_${paddedIndex}.jpg`;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) {
            // Draw first frame as soon as it loads
            renderFrame(0);
        }
        if (imagesLoaded === frameCount) {
            isFullyLoaded = true;
        }
    };
    images.push(img);
}

function renderFrame(index) {
    if (images[index] && images[index].complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image covering the canvas (simulate object-fit: cover)
        const img = images[index];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  
        
        context.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
}

// Scroll logic
const scrollTrack = document.getElementById('hero-scroll-track');
const mainHeader = document.getElementById('main-header');
let targetFrame = 0;
let currentInterpolatedFrame = 0;

window.addEventListener('scroll', () => {
    // Header transparent/solid logic
    const heroSection = document.getElementById('hero-section');
    const triggerPoint = heroSection ? (heroSection.offsetHeight - 100) : 50;

    if (window.scrollY > triggerPoint) {
        mainHeader.classList.remove('bg-transparent', 'text-white', 'border-transparent');
        mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'text-slate-900', 'border-slate-200/80', 'shadow-sm');
    } else {
        mainHeader.classList.add('bg-transparent', 'text-white', 'border-transparent');
        mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'text-slate-900', 'border-slate-200/80', 'shadow-sm');
    }

    if (!scrollTrack) return;
    
    const trackHeight = scrollTrack.offsetHeight;
    let scrollPosition = window.scrollY;
    
    // Clamp the value between 0 and trackHeight
    scrollPosition = Math.max(0, Math.min(scrollPosition, trackHeight));
    
    const scrollFraction = scrollPosition / trackHeight;
    
    // Map scroll fraction to frame index
    targetFrame = scrollFraction * (frameCount - 1);
});

// Render loop for smooth frame interpolation
function renderLoop() {
    // Smooth easing
    currentInterpolatedFrame += (targetFrame - currentInterpolatedFrame) * 0.2;
    
    const nextFrameIndex = Math.round(currentInterpolatedFrame);
    
    if (nextFrameIndex !== currentFrameIndex) {
        currentFrameIndex = nextFrameIndex;
        renderFrame(currentFrameIndex);
    }
    
    requestAnimationFrame(renderLoop);
}

// Start render loop
requestAnimationFrame(renderLoop);
