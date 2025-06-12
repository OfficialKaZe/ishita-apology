
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 400;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = Array.from({ length: 80 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.2,
  alpha: Math.random(),
  dx: (Math.random() - 0.5) * 0.4,
  dy: (Math.random() - 0.5) * 0.4,
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  }
  requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

canvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "32px 'EB Garamond', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Ishita ❤️", canvas.width / 2, canvas.height / 2);

  // Hide prompt text after click
  const textPrompt = document.getElementById('constellationText');
  if (textPrompt) {
    textPrompt.style.display = 'none';
  }
});

function respondEmotion() {
  const input = document.getElementById('userEmotion').value.trim();
  const response = document.getElementById('emotionResponse');
  const replies = [
    "I still care deeply. Even in silence.",
    "More than words will ever say. I'm just afraid of hurting you again.",
    "You're still the most important person in my heart.",
    "You matter. Even if I mess up, you matter.",
    "Everything I write is from the most sincere part of me."
  ];
  if (input.length === 0) {
    response.innerText = "Say something from the heart...";
  } else {
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    response.innerText = randomReply;
  }
}
