const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let isMobile = window.innerWidth <= 768;

// Add noise canvas
let noiseCanvas = document.createElement('canvas');
let noiseCtx = noiseCanvas.getContext('2d');

function setupNoise() {
    // Reduce noise resolution on mobile for better performance
    const scale = isMobile ? 2 : 1;
    noiseCanvas.width = width / scale;
    noiseCanvas.height = height / scale;
    
    // Generate static noise
    const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = isMobile ? 10 : 15;    // reduced alpha on mobile
    }
    
    noiseCtx.putImageData(imageData, 0, 0);
}

class Blob {
    constructor(x, y, color, movementMultiplier) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.radius = isMobile ? width * 0.2 : width * 0.25; // Smaller radius on mobile
        this.color = color;
        this.movementMultiplier = movementMultiplier;
    }

    update() {
        const moveAmount = isMobile ? 250 : 450; // Reduced movement on mobile
        const deltaX = (mouseX - width/2) / (width/2);
        const deltaY = (mouseY - height/2) / (height/2);
        
        const moveX = deltaX * Math.pow(Math.abs(deltaX), 0.8) * moveAmount * this.movementMultiplier;
        const moveY = deltaY * Math.pow(Math.abs(deltaY), 0.8) * moveAmount * this.movementMultiplier;
        
        this.x = this.baseX + moveX;
        this.y = this.baseY + moveY;
    }

    draw() {
        ctx.filter = isMobile ? 'blur(50px)' : 'blur(100px)'; // Reduced blur on mobile
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.filter = 'none';
    }
}

let leftBlob, rightBlob;

function initBlobs() {
    if (isMobile) {
        // Adjust blob positions for mobile
        leftBlob = new Blob(
            width * 0.4,
            height * 0.4,
            'rgba(0, 0, 50, 0.7)',
            1.2
        );
        
        rightBlob = new Blob(
            width * 0.6,
            height * 0.6,
            'rgba(40, 0, 50, 0.7)',
            1.4
        );
    } else {
        leftBlob = new Blob(
            width * 0.35,
            height * 0.5,
            'rgba(0, 0, 50, 0.7)',
            1.2
        );
        
        rightBlob = new Blob(
            width * 0.65,
            height * 0.5,
            'rgba(40, 0, 50, 0.7)',
            1.4
        );
    }
}

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    isMobile = window.innerWidth <= 768;
    setupNoise();
    initBlobs();
}

// Handle both mouse and touch events
function updateMousePosition(e) {
    if (e.type.startsWith('touch')) {
        const touch = e.touches[0];
        targetMouseX = touch.clientX;
        targetMouseY = touch.clientY;
    } else {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    }
}

document.addEventListener('mousemove', updateMousePosition);
document.addEventListener('touchmove', updateMousePosition, { passive: true });
document.addEventListener('touchstart', updateMousePosition, { passive: true });

// If no interaction, create subtle automatic movement
let autoMoveTimer = 0;
function updateAutoMove() {
    if (targetMouseX === mouseX && targetMouseY === mouseY) {
        autoMoveTimer += 0.02;
        targetMouseX = width/2 + Math.sin(autoMoveTimer) * width * 0.1;
        targetMouseY = height/2 + Math.cos(autoMoveTimer) * height * 0.1;
    }
}

function updateMouse() {
    mouseX += (targetMouseX - mouseX) * 0.15;
    mouseY += (targetMouseY - mouseY) * 0.15;
}

function animate() {
    updateMouse();
    updateAutoMove();
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    leftBlob.update();
    rightBlob.update();
    leftBlob.draw();
    rightBlob.draw();

    // Apply the static noise overlay
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(noiseCanvas, 0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);

// Set initial mouse position to center
targetMouseX = window.innerWidth / 2;
targetMouseY = window.innerHeight / 2;
mouseX = targetMouseX;
mouseY = targetMouseY;

resizeCanvas();
animate();