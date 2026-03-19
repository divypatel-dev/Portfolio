/* ============================================
   DIVY PATEL — PORTFOLIO INTERACTIONS
   Typing Effect · Scroll Reveal · Nav Logic
   ============================================ */

// --- Preloader (Advanced Boot Logic) ---
const preloader = document.getElementById("preloader");
const preloaderFill = document.getElementById("preloaderFill");
const preloaderPercent = document.getElementById("preloaderPercent");
const preloaderStatus = document.getElementById("preloaderStatus");
const preloaderTask = document.getElementById("preloaderTask");

if (preloader) {
  let count = 0;
  let isLoaded = false;

  const statusMessages = [
    "INITIALIZING_KERNEL",
    "CHECKING_MODULAR_COMPONENTS",
    "SYNCHRONIZING_UI_STREAMS",
    "DECODING_TECH_STACK",
    "BOOTING_CREATIVE_ENGINE",
    "ESTABLISHING_VIRTUAL_DOM",
    "SYSTEM_STABLE_READY"
  ];

  const tasks = [
    "Loading React components...",
    "Injecting CSS variables...",
    "Parsing portfolio data...",
    "Optimizing image assets...",
    "Checking dependencies...",
    "Preparing animations...",
    "Finalizing deployment..."
  ];

  window.addEventListener("load", () => {
    isLoaded = true;
  });

  const loaderInterval = setInterval(() => {
    // Target ~2.5 seconds (50 steps x 50ms)
    // We use a slight random variance for an organic tech feel
    const baseIncrement = 1.8; 
    const variance = Math.random() * 1.2;
    const increment = baseIncrement + variance;
    
    count += increment;

    if (count >= 100) {
      count = 100;
      clearInterval(loaderInterval);

      // Add success state visuals
      if (preloaderStatus) preloaderStatus.innerText = "ACCESS_GRANTED";
      if (preloaderTask) preloaderTask.innerText = "SYSTEM_GO";
      preloader.classList.add("preloader--finished");

      // Give 500ms for user to see the 'ACCESS_GRANTED' before starting fade-out
      setTimeout(() => {
        preloader.classList.add("preloader--hidden");
        // Remove from DOM after transition
        setTimeout(() => preloader.remove(), 1000);
      }, 700);
    }

    // Update Percentage & Bar
    if (preloaderFill) preloaderFill.style.width = `${count}%`;
    if (preloaderPercent) preloaderPercent.innerText = `${Math.floor(count)}%`;

    // Update Status & Task based on progress
    const index = Math.min(Math.floor((count / 100) * statusMessages.length), statusMessages.length - 1);

    if (preloaderStatus && preloaderStatus.innerText !== statusMessages[index]) {
      preloaderStatus.innerText = statusMessages[index];
    }

    if (preloaderTask && preloaderTask.innerText !== tasks[index]) {
      preloaderTask.innerText = tasks[index];
    }

  }, 50);
}

// --- Typing Effect ---
const roles = [
  "Full-Stack Web Developer",
  "MERN Stack Developer",
  "Database Engineer",
  "Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    if (typingEl) typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800); // pause before deleting
      return;
    }
    setTimeout(typeEffect, 70);
  } else {
    if (typingEl) typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 40);
  }
}

setTimeout(typeEffect, 1200);

// --- Scroll Reveal (Intersection Observer) ---
const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-pro");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));

// --- Education Timeline Drawing Line Logic ---
const eduLine = document.getElementById("eduLogicProgress");
const eduContainer = document.querySelector(".edu__pro-container");

window.addEventListener("scroll", () => {
  if (!eduLine || !eduContainer) return;

  const containerRect = eduContainer.getBoundingClientRect();
  const containerHeight = containerRect.height;
  const containerTop = containerRect.top;
  const windowHeight = window.innerHeight;

  // Calculation for professional drawing line
  let progress = 0;
  const startOffset = windowHeight * 0.75; // Starts drawing when 75% down the screen

  if (containerTop < startOffset) {
    const scrollIn = startOffset - containerTop;
    progress = (scrollIn / (containerHeight + 100)) * 100;
  }

  eduLine.style.height = Math.min(Math.max(progress, 0), 100) + "%";
});

// --- Skill Bar Animation ---
const skillCards = document.querySelectorAll(".skill-card__fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      } else {
        entry.target.classList.remove("animated");
      }
    });
  },
  { threshold: 0.3 }
);

skillCards.forEach((bar) => skillObserver.observe(bar));

// --- Sticky Nav Scroll Effect ---
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("nav--scrolled");
  } else {
    nav.classList.remove("nav--scrolled");
  }
});

// --- Mouse Flare Effect for Project Cards ---
document.querySelectorAll(".project-card").forEach((card) => {
  card.onmousemove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
});

// --- Active Nav Link Highlight ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// --- Mobile Menu Toggle ---
const burger = document.getElementById("navBurger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

if (burger && mobileMenu) {
  const toggleMenu = () => {
    mobileMenu.classList.toggle("open");
    mobileOverlay.classList.toggle("open");
    burger.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  };

  burger.addEventListener("click", toggleMenu);
  mobileOverlay.addEventListener("click", toggleMenu);

  // Close on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
}

// --- Contact Form Validation ---
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");

  nameError.innerText = "";
  emailError.innerText = "";
  messageError.innerText = "";

  let isValid = true;

  // Name validation (Just check if it's not empty)
  if (name === "") {
    nameError.innerText = "Please enter your name";
    isValid = false;
  }

  // Email validation
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.innerText = "Enter a valid email address";
    isValid = false;
  }

  // Message validation (Just check if it's not empty)
  if (message === "") {
    messageError.innerText = "Please enter your message";
    isValid = false;
  }

  // If form is valid — Send background email via Web3Forms
  if (isValid) {
    const btn = document.getElementById("submitBtn");
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);

    // UI Feedback: Start Loading
    btn.classList.add("loading");
    btn.disabled = true;
    btn.innerHTML = '<span>Processing...</span>';

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(async (response) => {
        let res = await response.json();
        if (response.status === 200) {
          // SUCCESS - Automatic fetch avoids all redirects
          btn.innerHTML = '<span>✓ Thank you for contacting me!</span>';
          btn.style.background = '#22c55e';
          btn.classList.remove("loading");
          form.reset();

          setTimeout(() => {
            btn.innerHTML = '<span>Send Message</span><span class="btn__arrow">→</span>';
            btn.style.background = '';
            btn.disabled = false;
          }, 5000); // Give them time to read the thank you message
        } else {
          // ERROR HANDLING
          console.error(res);
          btn.innerHTML = '<span>Error! Try again.</span>';
          btn.style.background = '#f87171';
          btn.classList.remove("loading");
          setTimeout(() => {
            btn.innerHTML = '<span>Send Message</span><span class="btn__arrow">→</span>';
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
        btn.innerHTML = '<span>Network Error.</span>';
        btn.style.background = '#f87171';
        btn.classList.remove("loading");
        btn.disabled = false;
      });
  }
});

// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// --- Theme Toggle ---
const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// Check saved theme
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

function handleThemeToggle() {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "light" ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", handleThemeToggle);
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("click", handleThemeToggle);
}

// --- Animated Galaxy Background ---
const canvas = document.getElementById("particleCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  let shootingStars = [];
  let nebulae = [];
  const STAR_COUNT = 400;
  const NEBULA_COUNT = 3;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initGalaxy();
  });

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      // Parallax layers (0: far, 1: mid, 2: close)
      this.layer = Math.floor(Math.random() * 3);
      this.size = (Math.random() * 1.2 + 0.2) * (this.layer + 1) * 0.4;
      this.twinkleSpeed = Math.random() * 0.05 + 0.015;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.baseOpacity = Math.random() * 0.3 + 0.3;

      // Different speeds for parallax
      const speedFactor = (this.layer + 1) * 0.06;
      this.driftX = (Math.random() - 0.5) * speedFactor;
      this.driftY = (Math.random() - 0.5) * speedFactor;

      const colorRand = Math.random();
      if (colorRand < 0.25) this.color = { r: 45, g: 212, b: 191 }; // Teal
      else if (colorRand < 0.5) this.color = { r: 168, g: 85, b: 247 }; // Purple
      else if (colorRand < 0.75) this.color = { r: 255, g: 255, b: 255 }; // White
      else this.color = { r: 236, g: 72, b: 153 }; // Pink
    }

    update() {
      this.twinklePhase += this.twinkleSpeed;
      this.x += this.driftX;
      this.y += this.driftY;

      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = canvas.height + 10;
      if (this.y > canvas.height + 10) this.y = -10;
    }

    draw(isDark) {
      const twinkle = (Math.sin(this.twinklePhase) + 1) / 2;
      const opacity = this.baseOpacity * (0.3 + twinkle * 0.7);

      let { r, g, b } = this.color;
      let finalOpacity;

      if (isDark) {
        finalOpacity = opacity;
      } else {
        // High-Visibility Light Mode Palette
        finalOpacity = opacity * 1.2; // Slightly more opaque
        // If star was white, make it deep slate
        if (r === 255 && g === 255 && b === 255) {
          r = 100; g = 116; b = 139; // slate-500
        } else {
          // Darken other colors slightly for better contrast
          r = Math.max(0, r - 40);
          g = Math.max(0, g - 40);
          b = Math.max(0, b - 40);
        }
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
      ctx.fill();

      // Bloom effect
      if (this.size > 1.2 && twinkle > 0.8) {
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${finalOpacity * 0.6})`;
      } else {
        ctx.shadowBlur = 0;
      }
    }
  }

  class Nebula {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 300 + 200;
      this.vx = (Math.random() - 0.5) * 0.1;
      this.vy = (Math.random() - 0.5) * 0.1;
      this.opacity = Math.random() * 0.05 + 0.02; // Added opacity for nebulae
      this.color = Math.random() > 0.5
        ? "rgba(45, 212, 191, 0.03)" // Teal
        : "rgba(168, 85, 247, 0.03)"; // Purple
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -this.radius) this.x = canvas.width + this.radius;
      if (this.x > canvas.width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = canvas.height + this.radius;
      if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }

    draw(isDark) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      // High-Visibility Nebulae for Light Mode
      let nebulaColor = this.color;
      if (!isDark) {
        // Shift colors to be darker/muted for light mode
        nebulaColor = this.color.includes('45, 212, 191')
          ? "rgba(13, 148, 136, 0.12)" // Darker Teal (Teal-600)
          : "rgba(124, 58, 237, 0.12)"; // Darker Purple (Violet-600)
      }
      gradient.addColorStop(0, nebulaColor);
      gradient.addColorStop(1, 'rgba(145, 94, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 0.5;
      this.length = Math.random() * 100 + 50;
      this.speed = Math.random() * 10 + 5;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
      this.opacity = 0.8;
      this.active = true;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.active = false;
    }

    draw(isDark) {
      if (!this.active) return;
      // High-Visibility Shooting Stars for Light Mode
      const alpha = isDark ? this.opacity : this.opacity * 0.9;
      const color = isDark ? "45, 212, 191" : "13, 148, 136"; // Deep Teal in light
      const grad = ctx.createLinearGradient(
        this.x, this.y,
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      grad.addColorStop(0, `rgba(${color}, ${alpha})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = isDark ? 2 : 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
      ctx.stroke();
    }
  }


  function initGalaxy() {
    stars = [];
    nebulae = [];
    for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
    for (let i = 0; i < NEBULA_COUNT; i++) nebulae.push(new Nebula());
  }

  initGalaxy();

  let lastShootingTime = 0;

  function animate(timestamp) {
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Nebulae (now enabled for both themes)
    nebulae.forEach(n => {
      n.update();
      n.draw(isDark);
    });

    // Draw Stars & Constellations
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    stars.forEach(s => {
      s.update();
      s.draw(isDark);
    });

    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          ctx.beginPath();
          // High-Visibility Constellation Lines for Light Mode
          const alpha = (1 - dist / 80) * (isDark ? 0.15 : 0.45);
          const color = isDark ? "45, 212, 191" : "51, 65, 85"; // Slate Blue in light
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }

    // Shooting Stars
    if (timestamp - lastShootingTime > 4000 + Math.random() * 6000) {
      shootingStars.push(new ShootingStar());
      lastShootingTime = timestamp;
    }

    shootingStars = shootingStars.filter(s => s.active);
    shootingStars.forEach(s => {
      s.update();
      s.draw(isDark);
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// --- Hero Code Window Typing Animation ---
const codeBody = document.getElementById("codeBody");
if (codeBody) {
  const codeContent = codeBody.innerHTML;
  codeBody.innerHTML = "";
  let isTyped = false;

  function typeCodeEffect() {
    let charIndex = 0;
    const typingSpeed = 80;

    // Split content into tags and text nodes to preserve highlighting
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = codeContent;
    const nodes = Array.from(tempDiv.childNodes);

    let nodeIndex = 0;

    function typeNextNode() {
      if (nodeIndex >= nodes.length) return;

      const node = nodes[nodeIndex];

      if (node.nodeType === Node.TEXT_NODE) {
        let nodeCharIndex = 0;
        const text = node.textContent;

        function typeText() {
          if (nodeCharIndex < text.length) {
            codeBody.append(text[nodeCharIndex]);
            nodeCharIndex++;
            setTimeout(typeText, typingSpeed);
          } else {
            nodeIndex++;
            typeNextNode();
          }
        }
        typeText();
      } else {
        // It's an element node (the spans with colors)
        const element = node.cloneNode(false); // Clone without children
        codeBody.appendChild(element);

        let nodeCharIndex = 0;
        const text = node.textContent;

        function typeElementText() {
          if (nodeCharIndex < text.length) {
            element.append(text[nodeCharIndex]);
            nodeCharIndex++;
            setTimeout(typeElementText, typingSpeed);
          } else {
            nodeIndex++;
            typeNextNode();
          }
        }
        typeElementText();
      }
    }

    typeNextNode();
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isTyped) {
      isTyped = true;
      setTimeout(typeCodeEffect, 800);
    }
  }, { threshold: 0.5 });

  observer.observe(codeBody);
}

