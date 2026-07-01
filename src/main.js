// فایل‌های موجود با اطلاعات تب
const filesMeta = {
  home:       { label: 'home.jsx',       icon: '<span class="text-blue-400 font-bold text-xs">⚛</span>' },
  about:      { label: 'about.html',     icon: '<span class="text-orange-400 font-bold text-xs">&lt;/&gt;</span>' },
  projects:   { label: 'projects.js',    icon: '<span class="text-yellow-400 font-bold text-xs">JS</span>' },
  skills:     { label: 'skills.json',    icon: '<span class="text-yellow-300 font-bold text-xs">{ }</span>' },
  experience: { label: 'experience.ts',  icon: '<span class="text-blue-500 font-bold text-xs">TS</span>' },
  contact:    { label: 'contact.css',    icon: '<span class="text-sky-400 font-bold text-xs">#</span>' },
  readme:     { label: 'README.md',      icon: '<span class="text-gray-400 font-bold text-xs">M↓</span>' },
};

const fileLang = {
  home:       'JSX',
  about:      'HTML',
  projects:   'JavaScript',
  skills:     'JSON',
  experience: 'TypeScript',
  contact:    'CSS',
  readme:     'Markdown',
};

let openTabs = ['home'];
let activeFile = 'home';

const tabsBar    = document.querySelector('[data-tab="home"]').parentElement;
const editorArea = document.querySelector('.flex-1.overflow-y-auto.p-4');

// ── نمایش محتوا ──────────────────────────────────────────
function showFile(fileName) {
  Object.keys(filesMeta).forEach(file => {
    const el = document.getElementById(`${file}-content`);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById(`${fileName}-content`);
  if (target) {
    target.style.display = 'block';
    target.style.opacity = '0';
    target.style.transition = 'opacity 0.15s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.style.opacity = '1';
      });
    });
  }

  activeFile = fileName;
  renderTabs();
  highlightSidebar(fileName);
  document.getElementById('status-language').textContent = fileLang[fileName] || '';
  document.getElementById('breadcrumb-file').textContent = filesMeta[fileName].label;
}

// ── رندر تب‌ها ───────────────────────────────────────────
function renderTabs() {
  tabsBar.innerHTML = '';
  openTabs.forEach(file => {
    const meta    = filesMeta[file];
    const isActive = file === activeFile;
    const tab     = document.createElement('div');
    tab.className = `relative flex items-center gap-2 px-4 h-full border-r border-[#1e1e1e] cursor-pointer text-xs shrink-0 transition-colors duration-150 ${
      isActive
        ? 'bg-[#1e1e1e] text-white'
        : 'bg-[#2d2d2d] text-gray-500 hover:bg-[#2a2d2e] hover:text-gray-300'
    }`;

    // خط آبی بالای تب فعال
    if (isActive) {
      const topLine = document.createElement('div');
      topLine.className = 'absolute top-0 left-0 right-0 h-[2px] bg-[#007acc]';
      tab.appendChild(topLine);
    }

    tab.innerHTML += `${meta.icon}<span>${meta.label}</span><button class="close-btn ml-2 text-gray-600 hover:text-white text-xs leading-none">✕</button>`;

    tab.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-btn')) {
        closeTab(file);
      } else {
        showFile(file);
      }
    });

    tabsBar.appendChild(tab);
  });
}

// ── بستن تب ──────────────────────────────────────────────
function closeTab(file) {
  openTabs = openTabs.filter(f => f !== file);
  if (openTabs.length === 0) {
    Object.keys(filesMeta).forEach(f => {
      const el = document.getElementById(`${f}-content`);
      if (el) el.style.display = 'none';
    });
    tabsBar.innerHTML = '';
    activeFile = null;
    highlightSidebar(null);
    return;
  }
  if (activeFile === file) {
    showFile(openTabs[openTabs.length - 1]);
  } else {
    renderTabs();
  }
}

// ── هایلایت سایدبار ──────────────────────────────────────
function highlightSidebar(fileName) {
  document.querySelectorAll('[data-file]').forEach(el => {
    el.classList.toggle('bg-[#37373d]', el.getAttribute('data-file') === fileName);
  });
}

// ── کلیک روی سایدبار ─────────────────────────────────────
document.querySelectorAll('[data-file]').forEach(item => {
  item.addEventListener('click', () => {
    const file = item.getAttribute('data-file');
    if (!openTabs.includes(file)) openTabs.push(file);
    showFile(file);
  });
});

// ── ترمینال ───────────────────────────────────────────────
const terminalInput  = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
  help: () => `
    <div class="text-[#4ec9b0] mb-1">Available commands:</div>
    <div class="pl-2 text-gray-400">
      <div><span class="text-yellow-300">about</span>      — Who am I</div>
      <div><span class="text-yellow-300">skills</span>     — My tech stack</div>
      <div><span class="text-yellow-300">projects</span>   — What I've built</div>
      <div><span class="text-yellow-300">contact</span>    — Get in touch</div>
      <div><span class="text-yellow-300">social</span>     — My social links</div>
      <div><span class="text-yellow-300">whoami</span>     — Quick intro</div>
      <div><span class="text-yellow-300">clear</span>      — Clear terminal</div>
    </div>`,

  whoami: () => `<div class="text-gray-300">Hossein Shafiei — Frontend Developer & UI Designer<br><span class="text-gray-500">// ihosuix everywhere on the internet</span></div>`,

  about: () => {
    showFile('about');
    return `<div class="text-gray-300">Opening <span class="text-orange-300">about.html</span>...</div>`;
  },

  skills: () => {
    showFile('skills');
    return `<div class="text-gray-300">Opening <span class="text-yellow-300">skills.json</span>...</div>`;
  },

  projects: () => {
    showFile('projects');
    return `<div class="text-gray-300">Opening <span class="text-yellow-400">projects.js</span>...</div>`;
  },

  contact: () => {
    showFile('contact');
    return `<div class="text-gray-300">Opening <span class="text-sky-300">contact.css</span>...</div>`;
  },

  social: () => `
    <div class="text-gray-300">
      <div>GitHub    → <a href="https://github.com/ihosuix" target="_blank" class="text-[#007acc] hover:underline">github.com/ihosuix</a></div>
      <div>Instagram → <a href="https://instagram.com/ihosuix" target="_blank" class="text-[#007acc] hover:underline">@ihosuix</a></div>
      <div>Telegram  → <a href="https://t.me/ihosuix" target="_blank" class="text-[#007acc] hover:underline">@ihosuix</a></div>
    </div>`,

  clear: () => {
    terminalOutput.innerHTML = '';
    return null;
  },
};

terminalInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const cmd = terminalInput.value.trim().toLowerCase();
  terminalInput.value = '';
  if (!cmd) return;

  const line = document.createElement('div');
  line.className = 'mb-1';
  line.innerHTML = `<span class="text-green-400">➜</span> <span class="text-[#4ec9b0]">portfolio</span> <span class="text-gray-500">$</span> <span class="text-white">${cmd}</span>`;
  terminalOutput.appendChild(line);

  const handler = commands[cmd];
  if (handler) {
    const result = handler();
    if (result) {
      const out = document.createElement('div');
      out.className = 'mb-2 pl-2';
      out.innerHTML = result;
      terminalOutput.appendChild(out);
    }
  } else {
    const out = document.createElement('div');
    out.className = 'mb-2 pl-2 text-red-400';
    out.textContent = `Command not found: ${cmd}. Type 'help' for available commands.`;
    terminalOutput.appendChild(out);
  }

  terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
});

// ── Typing Effect ─────────────────────────────────────────
function typeText(elementId, text, speed = 30) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = '';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML = text.slice(0, i + 1);
      i++;
    } else {
      clearInterval(interval);
      el.innerHTML = 'Welcome to Hossein\'s terminal. Type <span class="text-[#4ec9b0]">help</span> to see available commands.';
    }
  }, speed);
}

// ── init ─────────────────────────────────────────────────
showFile('home');
typeText('terminal-welcome', 'Welcome to Hossein\'s terminal. Type \'help\' to see available commands.');

// ── موبایل Sidebar Toggle ─────────────────────────────────
const sidebar        = document.getElementById('sidebar');
const sidebarToggle  = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
  sidebar.classList.remove('-translate-x-full');
  sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
  sidebar.classList.add('-translate-x-full');
  sidebarOverlay.classList.add('hidden');
}

sidebarToggle.addEventListener('click', openSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// بستن Sidebar بعد از انتخاب فایل روی موبایل
document.querySelectorAll('[data-file]').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth < 768) closeSidebar();
  });
});

// cursor ترمینال
const terminalCursor = document.getElementById('terminal-cursor');
const terminalInputEl = document.getElementById('terminal-input');

// یه span مخفی برای اندازه‌گیری عرض متن
const measurer = document.createElement('span');
measurer.style.cssText = `
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-family: 'JetBrains Mono', monospace;
  font-size: ${getComputedStyle(terminalInputEl).fontSize};
`;
document.body.appendChild(measurer);

terminalInputEl.addEventListener('input', () => {
  measurer.textContent = terminalInputEl.value;
  const textWidth = measurer.getBoundingClientRect().width;
  terminalCursor.style.left = `${textWidth}px`;
});

terminalInputEl.addEventListener('focus', () => {
  terminalCursor.style.display = 'inline-block';
});

terminalInputEl.addEventListener('blur', () => {
  terminalCursor.style.display = 'none';
});

// ── Search ───────────────────────────────────────────────
const btnSearch     = document.getElementById('btn-search');
const searchPanel   = document.getElementById('search-panel');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const fileList      = document.querySelector('ul.text-sm');

btnSearch.addEventListener('click', () => {
  const isOpen = !searchPanel.classList.contains('hidden');
  if (isOpen) {
    searchPanel.classList.add('hidden');
    fileList.classList.remove('hidden');
  } else {
    searchPanel.classList.remove('hidden');
    fileList.classList.add('hidden');
    searchInput.focus();
    renderSearchResults('');
  }
});

function renderSearchResults(query) {
  searchResults.innerHTML = '';
  const files = Object.entries(filesMeta);
  const filtered = query
    ? files.filter(([, meta]) => meta.label.toLowerCase().includes(query.toLowerCase()))
    : files;

  if (filtered.length === 0) {
    searchResults.innerHTML = '<p class="text-gray-600 text-xs">No files found</p>';
    return;
  }

  filtered.forEach(([key, meta]) => {
    const item = document.createElement('div');
    item.className = 'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-[#2a2d2e] text-xs text-gray-300';
    item.innerHTML = `${meta.icon}<span>${meta.label}</span>`;
    item.addEventListener('click', () => {
      if (!openTabs.includes(key)) openTabs.push(key);
      showFile(key);
      searchPanel.classList.add('hidden');
      fileList.classList.remove('hidden');
    });
    searchResults.appendChild(item);
  });
}

searchInput.addEventListener('input', () => {
  renderSearchResults(searchInput.value);
});

// ── Code Rain ────────────────────────────────────────────
const canvas = document.getElementById('code-rain');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const chars = '01アイウエオカキクケコabcdefghijklmnop{}[]<>/\\;:';
  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawRain() {
    ctx.fillStyle = 'rgba(30, 30, 30, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#007acc';
    ctx.font = `${fontSize}px JetBrains Mono`;
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(drawRain, 50);
}

// ── Typing Title Effect ───────────────────────────────────
const titles = ['Frontend Developer', 'UI Designer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-title');

function typeTitle() {
  if (!typingEl) return;
  const current = titles[titleIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
  }
  setTimeout(typeTitle, isDeleting ? 50 : 80);
}
typeTitle();

// ── 3D Tilt Effect ────────────────────────────────────────
const heroCard = document.getElementById('hero-card');
if (heroCard) {
  heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

// ── Ripple Effect ─────────────────────────────────────────
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.5s linear;
      pointer-events: none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// ── Glitch Effect روی عکس ────────────────────────────────
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  profileImg.addEventListener('mouseenter', () => {
    profileImg.style.filter = 'hue-rotate(90deg) saturate(2)';
    setTimeout(() => profileImg.style.filter = '', 150);
    setTimeout(() => profileImg.style.filter = 'hue-rotate(-90deg) saturate(2)', 200);
    setTimeout(() => profileImg.style.filter = '', 350);
  });
}