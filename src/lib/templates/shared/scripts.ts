/**
 * Shared JavaScript utilities for premium templates.
 * Each function returns a string of JS code to embed in <script> tags.
 */

/** Section navigation — show/hide sections, update active nav link */
export function sectionNavScript(): string {
  return `
function showSection(id) {
  document.querySelectorAll('.demo-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  var sec = document.getElementById('sec-' + id);
  if (sec) {
    sec.classList.add('active');
    animateCounters(sec);
    animateBars(sec);
    activateSteps(sec);
  }
  var link = document.querySelector('[data-section="' + id + '"]');
  if (link) link.classList.add('active');
  window.scrollTo(0, 0);
  playSound('click');
}
`
}

/** Animated number counters — tween from 0 to data-target */
export function animatedCountersScript(): string {
  return `
function animateCounters(container) {
  const counters = (container || document).querySelectorAll('.counter:not(.counted)');
  counters.forEach(c => {
    c.classList.add('counted');
    const target = parseFloat(c.dataset.target) || 0;
    const prefix = c.dataset.prefix || '';
    const suffix = c.dataset.suffix || '';
    const decimals = parseInt(c.dataset.decimals) || 0;
    const duration = 1200;
    const steps = 45;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // Ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = target * progress;
      if (step >= steps) {
        current = target;
        clearInterval(timer);
      }
      c.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString()) + suffix;
    }, duration / steps);
  });
}
`
}

/** Animate progress bars to their data-width values */
export function animateBarsScript(): string {
  return `
function animateBars(container) {
  const bars = (container || document).querySelectorAll('.bar-fill[data-width]');
  bars.forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width; }, 100);
  });
}
`
}

/** Activate step-process items sequentially */
export function activateStepsScript(): string {
  return `
function activateSteps(container) {
  const steps = (container || document).querySelectorAll('.step:not(.activated)');
  steps.forEach((s, i) => {
    setTimeout(() => {
      s.classList.add('active', 'activated');
    }, 200 + i * 300);
  });
}
`
}

/** WhatsApp chat simulation — reveal messages sequentially */
export function whatsappSimScript(): string {
  return `
function startWADemo(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  const messages = box.querySelectorAll('.wa-m');
  messages.forEach((m, i) => {
    setTimeout(() => {
      m.classList.add('show');
      if (i === messages.length - 1) {
        playSound('notification');
        showNotif('💬', 'WhatsApp', 'Conversación completada');
      }
    }, 600 + i * 900);
  });
}
`
}

/** Notification system — slide-in alerts */
export function notificationScript(): string {
  return `
var _notifTimeout;
function showNotif(icon, title, body) {
  var n = document.getElementById('notif');
  if (!n) return;
  n.querySelector('.notif-icon').textContent = icon;
  n.querySelector('.notif-title').textContent = title;
  n.querySelector('.notif-body').textContent = body;
  n.classList.add('show');
  playSound('notification');
  clearTimeout(_notifTimeout);
  _notifTimeout = setTimeout(function() { n.classList.remove('show'); }, 4000);
}
`
}

/** Web Audio API sound effects */
export function audioScript(): string {
  return `
var _audioCtx;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}
function playSound(type) {
  try {
    var ctx = getAudioCtx();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    if (type === 'click') {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    } else if (type === 'notification') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
    }
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}
`
}

/** Email preview switcher */
export function emailSwitcherScript(): string {
  return `
function showEmail(type) {
  var emails = window._emailData || {};
  var data = emails[type];
  if (!data) return;
  var subj = document.getElementById('email-subject');
  var body = document.getElementById('email-body');
  if (subj) subj.textContent = data.subject;
  if (body) body.innerHTML = data.body;
  document.querySelectorAll('.email-opt').forEach(function(o) {
    o.classList.remove('active');
    if (o.dataset.type === type) o.classList.add('active');
  });
  playSound('click');
}
`
}

/** Combine all scripts into one <script> block */
export function allScripts(): string {
  return [
    sectionNavScript(),
    animatedCountersScript(),
    animateBarsScript(),
    activateStepsScript(),
    whatsappSimScript(),
    notificationScript(),
    audioScript(),
    emailSwitcherScript(),
    // Auto-init on load
    `
document.addEventListener('DOMContentLoaded', function() {
  var first = document.querySelector('.demo-section.active');
  if (first) {
    animateCounters(first);
    animateBars(first);
  }
});
`,
  ].join('\n')
}
