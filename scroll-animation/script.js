const video = document.getElementById('v0');

let isVideoLoaded = false;
let targetTime = 0;
let currentTime = 0;

// Ensure video loads and works on mobile
video.pause();

function checkVideoLoaded() {
    if (video.readyState >= 1 && video.duration > 0) {
        isVideoLoaded = true;
    }
}

video.addEventListener('loadedmetadata', checkVideoLoaded);
video.addEventListener('canplay', checkVideoLoaded);
video.addEventListener('loadeddata', checkVideoLoaded);

// Force load for iOS Safari
video.load();
checkVideoLoaded();

// Calculate scroll progress and update target time
// Calculate scroll progress based on the hero-scroll-track
const scrollTrack = document.getElementById('hero-scroll-track');
const pinnedContainer = document.getElementById('hero-pinned-container');
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    // Header transparent/solid logic
    // Calculate trigger point based on when the hero section animation ends
    const heroSection = document.getElementById('hero-section');
    const triggerPoint = heroSection ? (heroSection.offsetHeight - 100) : 50;

    if (window.scrollY > triggerPoint) {
        mainHeader.classList.remove('bg-transparent', 'text-white', 'border-transparent');
        mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'text-slate-900', 'border-slate-200/80', 'shadow-sm');
    } else {
        mainHeader.classList.add('bg-transparent', 'text-white', 'border-transparent');
        mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'text-slate-900', 'border-slate-200/80', 'shadow-sm');
    }

    if (!isVideoLoaded || !scrollTrack) return;
    
    // The hero section is pinned until we scroll past hero-scroll-track
    // Total scrollable distance for the hero is the height of the track
    const trackHeight = scrollTrack.offsetHeight;
    
    // Current scroll position within the hero section
    // Since hero is at the top, scrollY is roughly the progress
    let scrollPosition = window.scrollY;
    
    // Clamp the value between 0 and trackHeight
    scrollPosition = Math.max(0, Math.min(scrollPosition, trackHeight));
    
    const scrollFraction = scrollPosition / trackHeight;
    
    const videoDuration = video.duration || 0;
    targetTime = videoDuration * scrollFraction;
});

// Use requestAnimationFrame for smooth scrubbing
let lastSetTime = -1;
function renderLoop() {
    if (isVideoLoaded && !isNaN(targetTime)) {
        // Much faster easing to reach target quicker and stop updating
        currentTime += (targetTime - currentTime) * 0.5;
        
        // Only update if there is a significant difference (prevents micro-stutter and decoder overload)
        if (Math.abs(currentTime - lastSetTime) > 0.04) {
            video.currentTime = currentTime;
            lastSetTime = currentTime;
        }
    }
    requestAnimationFrame(renderLoop);
}

// Start render loop
requestAnimationFrame(renderLoop);
