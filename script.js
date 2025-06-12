// Optimized constellation animation with proper cleanup
class ConstellationCanvas {
  constructor() {
    this.canvas = document.getElementById('starCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.animationId = null;
    this.isRevealed = false;
    
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.resizeCanvas();
    this.createStars();
    this.animate();
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
    
    // Recreate stars with new dimensions
    this.createStars();
  }

  createStars() {
    const rect = this.canvas.getBoundingClientRect();
    this.stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
    }));
  }

  drawStars() {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    
    for (let star of this.stars) {
      // Twinkling effect
      star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
      star.alpha = Math.max(0.1, Math.min(1, star.alpha));
      
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      this.ctx.fill();

      // Gentle movement
      star.x += star.dx;
      star.y += star.dy;

      // Boundary bounce
      if (star.x < 0 || star.x > rect.width) star.dx *= -1;
      if (star.y < 0 || star.y > rect.height) star.dy *= -1;
    }
  }

  revealMessage() {
    if (this.isRevealed) return;
    
    this.isRevealed = true;
    const rect = this.canvas.getBoundingClientRect();
    
    // Create heart effect
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw sparkles first
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 3 + 1;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, 2 * Math.PI);
      this.ctx.fillStyle = `rgba(255, 107, 157, ${Math.random() * 0.8 + 0.2})`;
      this.ctx.fill();
    }
    
    // Draw main message
    this.ctx.fillStyle = "#ff6b9d";
    this.ctx.font = "bold 36px 'EB Garamond', serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.shadowColor = "rgba(255, 107, 157, 0.5)";
    this.ctx.shadowBlur = 20;
    
    const message = "Ishita ❤️";
    this.ctx.fillText(message, rect.width / 2, rect.height / 2 - 20);
    
    // Subtitle
    this.ctx.font = "italic 18px 'EB Garamond', serif";
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    this.ctx.shadowBlur = 10;
    this.ctx.fillText("You mean everything to me", rect.width / 2, rect.height / 2 + 30);

    // Hide prompt text
    const textPrompt = document.getElementById('constellationText');
    if (textPrompt) {
      textPrompt.classList.add('hidden');
    }
  }

  animate() {
    if (!this.isRevealed) {
      this.drawStars();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  setupEventListeners() {
    this.canvas.addEventListener('click', () => this.revealMessage());
    
    // Optimized resize handler with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!this.isRevealed) {
          this.resizeCanvas();
        }
      }, 250);
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Enhanced emotion response system
function respondEmotion() {
  const input = document.getElementById('userEmotion').value.trim();
  const response = document.getElementById('emotionResponse');
  
  if (input.length === 0) {
    showResponse("Please share what's in your heart...", response);
    return;
  }

  const replies = [
    "I still care deeply. Even in silence, my heart speaks your name.",
    "More than words will ever say. I'm just afraid of hurting you again.",
    "You're still the most important person in my heart, always.",
    "You matter more than you know. Even if I mess up, you matter.",
    "Everything I write comes from the most sincere part of me.",
    "I hope someday you'll forgive me and we can rebuild what we had.",
    "Your happiness means everything to me, even if I'm not part of it.",
    "I promise to be better, to be the friend you deserve."
  ];
  
  // Clear input
  document.getElementById('userEmotion').value = '';
  
  // Select appropriate response
  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  showResponse(randomReply, response);
}

function showResponse(text, element) {
  element.textContent = text;
  element.classList.remove('show');
  
  // Force reflow
  element.offsetHeight;
  
  setTimeout(() => {
    element.classList.add('show');
  }, 100);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const constellation = new ConstellationCanvas();
  
  // Allow Enter key to submit emotion
  document.getElementById('userEmotion').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      respondEmotion();
    }
  });
});

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
  if (window.constellation) {
    window.constellation.destroy();
  }
});
