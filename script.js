// Close banner
  document.getElementById('preque-close-btn').addEventListener('click', function () {
    document.getElementById('preque-offer-banner').style.display = 'none';
  });

  // Copy to clipboard
  document.getElementById('copy-icon').addEventListener('click', function () {
    const code = document.getElementById('coupon-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
      const icon = document.getElementById('copy-icon');
      icon.textContent = '✅';
      setTimeout(() => {
        icon.textContent = '📋';
      }, 1500);
    });
  });

  let current = 0;
const slides = document.querySelectorAll('.slide');
const pagination = document.querySelector('.pagination');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.display = 'none';
    if (i === index) {
      slide.classList.add('active');
      slide.style.display = 'block';
    }
  });
  pagination.textContent = `${index + 1}/${slides.length}`;
}

document.querySelector('.next').onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};

document.querySelector('.prev').onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};

// Auto-slide every 6 seconds
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 6000);

showSlide(current);

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
function openSideMenu() {
  document.getElementById('sideMenu').style.left = '0';
  document.getElementById('overlay').style.display = 'block';
}

function closeSideMenu() {
  document.getElementById('sideMenu').style.left = '-250px';
  document.getElementById('overlay').style.display = 'none';
}
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  const isVisible = menu.classList.contains('show');

  if (isVisible) {
    menu.classList.remove('show');
    overlay.classList.remove('show');
  } else {
    menu.classList.add('show');
    overlay.classList.add('show');
  }
}
// Close side menu when clicking outside
document.getElementById('overlay').addEventListener('click', function () {
  closeSideMenu();
});

// Smooth explosion effect on the "devWord" element
  const devWord = document.getElementById("devWord");
  const overlay = document.getElementById("fullBlastOverlay");

  const svgIcons = [
    `<svg viewBox="0 0 24 24" fill="#00fff2"><text x="0" y="18" font-size="18" font-family="monospace">&lt;/&gt;</text></svg>`,
    `<svg viewBox="0 0 24 24" fill="#ff80ff"><text x="0" y="18" font-size="18" font-family="monospace">{ }</text></svg>`,
    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="#ffcc00"/></svg>`,
    `<svg viewBox="0 0 24 24"><text x="0" y="18" font-size="16" font-family="monospace" fill="#00ff99">💻</text></svg>`,
    `<svg viewBox="0 0 24 24"><polygon points="12,2 15,10 22,12 15,14 12,22 9,14 2,12 9,10" fill="#ff66cc"/></svg>`,
    `<svg viewBox="0 0 24 24"><text x="0" y="18" font-size="18" font-family="monospace" fill="#ffffff">✨</text></svg>`
  ];

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        smoothExplode();
        observer.unobserve(devWord);
      }
    });
  }, { threshold: 0.7 });

  observer.observe(devWord);

  function smoothExplode() {
    overlay.style.display = 'block';
    const rect = devWord.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const particlesCount = 25;
    const masterTimeline = gsap.timeline({
      onComplete: () => {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
      }
    });

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("blast-particle");
      particle.innerHTML = svgIcons[Math.floor(Math.random() * svgIcons.length)];
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      overlay.appendChild(particle);

      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight;
      const driftX = (Math.random() - 0.5) * 20;
      const driftY = (Math.random() - 0.5) * 20;

      const tl = gsap.timeline();
      tl.to(particle, {
        x: endX - startX,
        y: endY - startY,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: "power3.out"
      }).to(particle, {
        x: `+=${driftX}`,
        y: `+=${driftY}`,
        opacity: 0,
        scale: 0.7,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1
      });

      masterTimeline.add(tl, 0);
    }
  }