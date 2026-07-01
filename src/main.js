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