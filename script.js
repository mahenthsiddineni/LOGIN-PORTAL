/* =======================================================
   KL University — My-KLU Portal
   Vanilla JS: home/login/register/dashboard routing, OTP register flow, roster login
   ======================================================= */

/* ---------- hand-drawn icon set (no external icon library) ---------- */
const ICONS = {
  'house': '<path d="M3 11 12 4 21 11"/><path d="M5 10v9h5v-6h4v6h5v-9"/>',
  'calendar-check': '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 3.5v3M16 3.5v3"/><path d="M8 14l2.3 2.3L16 11"/>',
  'route': '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h6c2 0 2-3.5 0-3.5h-4c-2 0-2-3.5 0-3.5h6"/>',
  'comments': '<path d="M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z"/>',
  'comment-dots': '<path d="M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z"/><circle cx="9" cy="10.5" r=".9" fill="currentColor" stroke="none"/><circle cx="12" cy="10.5" r=".9" fill="currentColor" stroke="none"/><circle cx="15" cy="10.5" r=".9" fill="currentColor" stroke="none"/>',
  'id-card': '<rect x="3" y="5.5" width="18" height="13" rx="2"/><circle cx="8.3" cy="11" r="2"/><path d="M5 16c0-1.8 1.5-2.6 3.3-2.6s3.3.8 3.3 2.6"/><path d="M14 9.5h4M14 13h4"/>',
  'building-columns': '<path d="M3 21h18"/><path d="M4 21V10l8-5 8 5v11"/><path d="M9 21v-8M12 21v-8M15 21v-8"/>',
  'book-open-reader': '<path d="M12 6c-2-1.3-5.3-1.3-8-.4v12.5c2.7-.9 6-.9 8 .4 2-1.3 5.3-1.3 8-.4V5.6c-2.7-.9-6-.9-8 .4z"/><path d="M12 6v12.5"/>',
  'chart-line': '<path d="M4 19h16"/><path d="M4 19V5"/><path d="M6.5 15l3.5-4.5 3 3 5-6"/>',
  'circle-check': '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.3l2.6 2.7L16.2 9"/>',
  'user': '<circle cx="12" cy="8.3" r="3.6"/><path d="M4.7 19.5c.6-3.6 3.8-5.7 7.3-5.7s6.7 2.1 7.3 5.7"/>',
  'brain': '<path d="M9 18h6M9.5 21h5"/><path d="M12 3.5c-3.3 0-5.5 2.4-5.5 5.3 0 2 1.1 3.2 2 4.1.6.6 1 1.1 1 2.1h5c0-1 .4-1.5 1-2.1.9-.9 2-2.1 2-4.1 0-2.9-2.2-5.3-5.5-5.3z"/>',
  'circle-question': '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.3c.2-1.6 1.4-2.5 2.6-2.5 1.4 0 2.6 1 2.6 2.3 0 1.7-2.6 1.9-2.6 4"/><circle cx="12" cy="16.3" r=".9" fill="currentColor" stroke="none"/>',
  'landmark': '<path d="M3 21h18"/><path d="M4 21v-9.5L12 6l8 5.5V21"/><path d="M9 21v-7M12 21v-7M15 21v-7"/><path d="M12 2v4"/>',
  'bus': '<rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18"/><circle cx="7.2" cy="19" r="1.5"/><circle cx="16.8" cy="19" r="1.5"/><path d="M6 9h4M14 9h4"/>',
  'headset': '<path d="M4.5 13v-2c0-4.1 3.3-7.5 7.5-7.5s7.5 3.4 7.5 7.5v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19.5 19.5c0 1.7-1.5 2-3.5 2"/>',
  'table-list': '<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><path d="M3 9.5h18M9 9.5v10"/>',
  'graduation-cap': '<path d="M12 4 22 9 12 14 2 9z"/><path d="M6.5 11v4.3c0 1.5 2.5 3.2 5.5 3.2s5.5-1.7 5.5-3.2V11"/><path d="M22 9v5.5"/>',
  'user-graduate': '<path d="M12 4 22 9 12 14 2 9z"/><path d="M6.5 11v4.3c0 1.5 2.5 3.2 5.5 3.2s5.5-1.7 5.5-3.2V11"/><path d="M22 9v5.5"/>',
  'book-open': '<path d="M12 6.3c-1.8-1.2-5-1.2-7.5-.3v12.4c2.5-.9 5.7-.9 7.5.3 1.8-1.2 5-1.2 7.5-.3V6c-2.5-.9-5.7-.9-7.5.3z"/><path d="M12 6.3v12.4"/>',
  'briefcase': '<rect x="3" y="8" width="18" height="11.5" rx="2"/><path d="M8.5 8V6c0-1 .8-1.8 1.8-1.8h3.4c1 0 1.8.8 1.8 1.8v2"/><path d="M3 13.5h18"/>',
  'people-group': '<circle cx="8.3" cy="9" r="3"/><circle cx="17" cy="10.3" r="2.6"/><path d="M2.3 20c0-3.8 2.8-6 6-6s6 2.2 6 6"/><path d="M14 20c0-2.7 1.8-4.8 4-4.8s4.2 2.1 4.2 4.8"/>',
  'file-signature': '<rect x="5.5" y="3" width="13" height="18" rx="1.5"/><path d="M8.5 8h7M8.5 11.5h5"/><path d="M7.5 17.5l1.8-1.8 1.8 1.8"/>',
  'sack-dollar': '<path d="M9.3 4h5.4l2 4.3c1.8 2 1.8 5.7 0 7.7-1.8 2-8.6 2-10.4 0-1.8-2-1.8-5.7 0-7.7z"/><path d="M12 8.5v7M10.3 10.2h3.4M10.3 13.3h3.4"/>',
  'building-user': '<rect x="4" y="9.5" width="16" height="11" rx="1.5"/><path d="M8 5.5h8v4H8z"/><circle cx="12" cy="15" r="1.6"/><path d="M9 20v-1.5c0-1.4 1.3-2.3 3-2.3s3 .9 3 2.3V20"/>',
  'pen-to-square': '<path d="M14.5 4.5l5 5-9 9H5.5v-5z"/><path d="M4 20h6"/>',
  'arrow-trend-up': '<path d="M3.5 17 9 11.3l3.5 3.5 7-7.5"/><path d="M16 6.8h3.5v3.5"/>',
  'rotate-left': '<path d="M5 8.5A8 8 0 1112 20"/><path d="M5 4v4.5H9.5"/>',
  'hand': '<path d="M8 12V5.5a1.5 1.5 0 013 0V11M11 11V4.3a1.5 1.5 0 013 0V11M14 11V5.7a1.5 1.5 0 013 0V13"/><path d="M8 12l-1.6-1.6a1.5 1.5 0 00-2.3 1.9L7 17c1.3 2 3 3 5.5 3 3.3 0 5.5-2.2 5.5-5.5V13"/>',
  'certificate': '<circle cx="12" cy="9" r="5.5"/><path d="M9.5 14 8 21l4-2 4 2-1.5-7"/>',
  'file-pen': '<rect x="5.5" y="3" width="10" height="18" rx="1.5"/><path d="M15 15l4-4 2 2-4 4h-2z"/><path d="M8 8h5M8 11h4"/>',
  'file-lines': '<rect x="5.5" y="3" width="13" height="18" rx="1.5"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  'folder-open': '<path d="M3 8.5h5l2 2h9v8a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 18.5z"/><path d="M3 8.5V6a1.5 1.5 0 011.5-1.5H8l2 2"/>',
  'clipboard-check': '<rect x="6" y="4.5" width="12" height="16" rx="1.5"/><rect x="9" y="3" width="6" height="3" rx="1"/><path d="M9 12.5l2 2 4-4.5"/>',
  'star-half-stroke': '<path d="M12 4l2.4 5 5.4.6-4 3.8 1 5.4L12 16l-4.8 2.8 1-5.4-4.2-3.8 5.4-.6z"/>',
  'chalkboard-user': '<rect x="3" y="4" width="18" height="11" rx="1.5"/><path d="M9 20l1.5-5M15 20l-1.5-5"/><circle cx="12" cy="9" r="2"/>',
  'user-plus': '<circle cx="9" cy="8.3" r="3.3"/><path d="M3.3 19c.5-3.3 3.1-5.2 5.7-5.2s5.2 1.9 5.7 5.2"/><path d="M18 8v5M15.5 10.5h5"/>',
  'champagne-glasses': '<path d="M12 3l1 3.5L16.5 8 13 9l-1 3.5L11 9 7.5 8 11 6.5z"/><path d="M18 15l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6z"/>',
  'medal': '<circle cx="12" cy="15" r="4.5"/><path d="M9.5 11 7 4h3l2 6M14.5 11 17 4h-3l-2 6"/>',
  'diagram-project': '<rect x="9" y="3" width="6" height="4.5" rx="1"/><rect x="3" y="16.5" width="6" height="4.5" rx="1"/><rect x="15" y="16.5" width="6" height="4.5" rx="1"/><path d="M12 7.5v4M12 11.5H6v5M12 11.5h6v5"/>',
  'handshake': '<path d="M3 10l4-3 3.5 3-2 2c-.7.7-1.9.7-2.6 0L3.5 9.6"/><path d="M21 10l-4-3-3.5 3 2 2c.7.7 1.9.7 2.6 0l2.4-2.4"/><path d="M10.5 10h3"/>',
  'list-check': '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  'award': '<circle cx="12" cy="9" r="5.5"/><path d="M9.5 14 8 21l4-2 4 2-1.5-7"/>',
  'chair': '<path d="M6 4v9a2 2 0 002 2h8a2 2 0 002-2V4"/><path d="M7 20v-5M17 20v-5"/><path d="M6 9h12"/>',
  'file-invoice': '<rect x="5.5" y="3" width="13" height="18" rx="1.5"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  'pen-nib': '<path d="M20 4 12.5 11.5"/><path d="M14 10l-6 6-3.5 1 1-3.5z"/><path d="M17 7l2 2"/>',
  'receipt': '<path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  'file-invoice-dollar': '<path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4"/>',
  'magnifying-glass-dollar': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3 21 21"/><path d="M10.5 7.3v6.4M8.7 8.7h2.6M8.7 12.3h2.6"/>',
  'server': '<rect x="3.5" y="4.5" width="17" height="6" rx="1.5"/><rect x="3.5" y="13.5" width="17" height="6" rx="1.5"/><circle cx="7" cy="7.5" r=".8" fill="currentColor" stroke="none"/><circle cx="7" cy="16.5" r=".8" fill="currentColor" stroke="none"/>',
  'screwdriver-wrench': '<path d="M17 3a4 4 0 00-5.4 4.6L4 15.2a1.8 1.8 0 002.5 2.5l7.6-7.6A4 4 0 0021 6l-3 3-2-2z"/>',
  'laptop-code': '<rect x="4" y="4.5" width="16" height="10" rx="1.5"/><path d="M9 8l-2 2.5L9 13M15 8l2 2.5L15 13"/><path d="M2.5 18h19"/>',
  'scale-balanced': '<path d="M12 3v16M8 21h8"/><path d="M5 7l3.5-1.5L12 7M19 7l-3.5-1.5L12 7"/><path d="M3 7l2 5a2.2 2.2 0 004 0l2-5M15 7l2 5a2.2 2.2 0 004 0l2-5"/>',
  'money-check': '<rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="M7 15c1-.7 1.8-.7 2.8 0s1.8.7 2.8 0 1.8-.7 2.8 0 1.8.7 2.6 0"/>',
  'ellipsis': '<circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  'door-open': '<path d="M13 3.5 5 5v16h8"/><path d="M13 3.5 19 5v16h-6"/><circle cx="10.3" cy="13" r=".9" fill="currentColor" stroke="none"/>',
  'bed': '<path d="M3 18v-8a2 2 0 012-2h5v5"/><path d="M3 15h18v3"/><path d="M10 13h8a2 2 0 012 2v3"/><circle cx="6.5" cy="10.5" r="1.3"/>',
  'circle-info': '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".9" fill="currentColor" stroke="none"/>',
  'magnifying-glass': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3 21 21"/>',
  'gear': '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5M18.4 18.4l-1.5-1.5M7.1 7.1 5.6 5.6"/>',
  'chevron-down': '<path d="M6 9l6 6 6-6"/>',
  'right-from-bracket': '<path d="M9 4H5.5A1.5 1.5 0 004 5.5v13A1.5 1.5 0 005.5 20H9"/><path d="M14 8l4 4-4 4"/><path d="M18 12H10"/>',
  'star': '<path d="M12 3.5l2.5 5.2 5.7.6-4.2 4 1 5.7L12 16l-5 3 1-5.7-4.2-4 5.7-.6z"/>',
};
function iconSvg(key, extraClass){
  const name = (key || '').replace(/^fa-/, '');
  const body = ICONS[name] || ICONS['circle-info'];
  return `<svg class="icon${extraClass ? ' ' + extraClass : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* =======================================================
   SCREEN ELEMENTS  (declared ONCE — this was the bug)
   ======================================================= */
const homeScreen = document.getElementById('home');
const loginScreen = document.getElementById('login');
const registerScreen = document.getElementById('register');
const dashScreen = document.getElementById('dashboard');

function showScreen(screen) {
  [homeScreen, loginScreen, registerScreen, dashScreen].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* ---------- arches ---------- */
const ARCH_HEIGHTS = [18, 30, 44, 60, 78, 98, 120, 145];
function renderArches(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = ARCH_HEIGHTS
    .map((h, i) => `<div class="arch" style="height:${h}px;width:${12 + i * 2}px"></div>`)
    .join('');
}
renderArches('archHome');
renderArches('archLogin');

/* ---------- Home -> Login ---------- */
document.getElementById('enterBtn').addEventListener('click', () => showScreen(loginScreen));

/* ---------- Login -> Home ---------- */
document.getElementById('backBtn').addEventListener('click', () => {
  clearError();
  document.getElementById('loginForm').reset();
  showScreen(homeScreen);
});

/* ---------- Login <-> Register ---------- */
document.getElementById('registerBtn').addEventListener('click', () => showScreen(registerScreen));
document.getElementById('backToLogin').addEventListener('click', () => {
  document.getElementById('registerForm').reset();
  showScreen(loginScreen);
});

/* =======================================================
   DEMO ROSTER LOGIN  (2300040001 ... 2300040030)
   password = last 5 digits of the ID
   ======================================================= */
function buildRoster() {
  const roster = {};
  for (let i = 1; i <= 30; i++) {
    const id = String(2300040000 + i);
    roster[id] = id.slice(-5);
  }
  return roster;
}
const ROSTER = buildRoster();

/* ---------- registered users (mobile number = username) ----------
   Stored in localStorage so accounts survive a page refresh. */
function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem('kluRegisteredUsers') || '{}');
  } catch {
    return {};
  }
}
function saveRegisteredUser(mobile, password) {
  const users = getRegisteredUsers();
  users[mobile] = password;
  localStorage.setItem('kluRegisteredUsers', JSON.stringify(users));
}

/* checks both the demo roster AND anyone who registered with their mobile number */
function checkCredentials(username, password) {
  if (ROSTER[username] && ROSTER[username] === password) return true;
  const users = getRegisteredUsers();
  if (users[username] && users[username] === password) return true;
  return false;
}
function usernameExists(username) {
  return Boolean(ROSTER[username]) || Boolean(getRegisteredUsers()[username]);
}

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}
function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const userId = document.getElementById('uid').value.trim();
  const password = document.getElementById('pwd').value.trim();

  if (!userId || !password) {
    showError('Enter both your User ID / Mobile Number and password to continue.');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in…';

  setTimeout(() => {
    if (checkCredentials(userId, password)) {
      loginForm.reset();
      enterDashboard(userId);
    } else if (!usernameExists(userId)) {
      showError('We don\u2019t recognize that User ID / Mobile Number.');
    } else {
      showError('That password doesn\u2019t match this account.');
    }
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
  }, 350);
});

/* =======================================================
   REGISTER + OTP FLOW
   Requires the companion server.js running on localhost:5000
   ======================================================= */
const sendOtpBtn = document.getElementById('sendOtpBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const registerForm = document.getElementById('registerForm');
let emailVerified = false;

sendOtpBtn.addEventListener('click', async () => {
  const email = document.getElementById('regEmail').value.trim();
  if (!email) { alert('Please enter your email.'); return; }

  sendOtpBtn.disabled = true;
  sendOtpBtn.textContent = 'Sending…';

  try {
    const response = await fetch('https://YOUR-BACKEND-URL.onrender.com/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const result = await response.json();
    if (result.success) {
      alert('OTP has been sent to your email.');
    } else {
      alert(result.message || 'Unable to send OTP.');
    }
  } catch (err) {
    alert('Unable to connect to the server. Please try again.');
  }

  sendOtpBtn.disabled = false;
  sendOtpBtn.textContent = 'Send OTP';
});

verifyOtpBtn.addEventListener('click', async () => {
  const email = document.getElementById('regEmail').value.trim();
  const otp = document.getElementById('otp').value.trim();
  if (!otp) { alert('Enter the OTP.'); return; }

  verifyOtpBtn.disabled = true;
  verifyOtpBtn.textContent = 'Verifying…';

  try {
    const response = await fetch('https://YOUR-BACKEND-URL.onrender.com/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const result = await response.json();
    if (result.success) {
      emailVerified = true;
      alert('✅ Email Verified');
      document.getElementById('regPassword').disabled = false;
      document.getElementById('regConfirmPassword').disabled = false;
    } else {
      alert(result.message || 'Incorrect OTP');
    }
  } catch (err) {
    alert('Unable to connect to the server. Please try again.');
  }

  verifyOtpBtn.disabled = false;
  verifyOtpBtn.textContent = 'Verify OTP';
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const mobile = document.getElementById('regMobile').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;

  if (!name || !email || !mobile) { alert('Please fill in your name, email and mobile number.'); return; }
  if (!/^\d{10}$/.test(mobile)) { alert('Enter a valid 10-digit mobile number — this will be your username.'); return; }
  if (!emailVerified) { alert('Please verify your email with the OTP first.'); return; }
  if (!password || password.length < 6) { alert('Password must be at least 6 characters.'); return; }
  if (password !== confirm) { alert('Passwords do not match.'); return; }
  if (usernameExists(mobile)) { alert('An account with this mobile number already exists. Please sign in instead.'); return; }

  saveRegisteredUser(mobile, password);

  alert(`Account created for ${name}!\n\nYour username is your mobile number:\n${mobile}\n\nUse it with the password you just set to sign in.`);
  registerForm.reset();
  emailVerified = false;
  document.getElementById('regPassword').disabled = true;
  document.getElementById('regConfirmPassword').disabled = true;
  showScreen(loginScreen);
});


/* =======================================================
   DASHBOARD DATA
   ======================================================= */
const QUICK = [
  {t:'Home', i:'fa-house'},
  {t:'Attendance Register', i:'fa-calendar-check'},
  {t:'Career Choice', i:'fa-route'},
  {t:'Counselling Diary', i:'fa-comments'},
  {t:'Feedback', i:'fa-comment-dots'},
  {t:'Hallticket', i:'fa-id-card'},
  {t:'Infrastructure Related', i:'fa-building-columns'},
  {t:'Library', i:'fa-book-open-reader'},
  {t:'My CGPA', i:'fa-chart-line'},
  {t:'Nodue', i:'fa-circle-check'},
  {t:'Profile', i:'fa-user'},
  {t:'Psychometric Tests', i:'fa-brain'},
  {t:'Quizes', i:'fa-circle-question'},
  {t:'Registrar Office', i:'fa-landmark'},
  {t:'My Transportation', i:'fa-bus'},
  {t:'Ticketing Support', i:'fa-headset'},
  {t:'Time Tables', i:'fa-table-list'},
  {t:'PhD Exit Survey Feedback', i:'fa-graduation-cap'},
];

const MEGA = [
  {t:'Academic Registration', i:'fa-user-graduate', items:[
    {l:'Regular Course Registration', i:'fa-pen-to-square'},
    {l:'Betterment Course Registration', i:'fa-arrow-trend-up'},
    {l:'Fail/ReCourse Registration', i:'fa-rotate-left'},
    {l:'Detain Course Registration', i:'fa-hand'},
    {l:'Certificate Course Registration', i:'fa-certificate', ribbon:'Popular'},
  ]},
  {t:'Courses', i:'fa-book-open', items:[
    {l:'Assignments', i:'fa-file-pen'},
    {l:'Handouts', i:'fa-file-lines'},
    {l:'Material', i:'fa-folder-open'},
    {l:'Internals', i:'fa-clipboard-check'},
    {l:'Session Feedback', i:'fa-star-half-stroke'},
  ]},
  {t:'CRT', i:'fa-briefcase', items:[
    {l:'CRT Courses', i:'fa-chalkboard-user'},
    {l:'Attendance', i:'fa-calendar-check'},
    {l:'Timetable', i:'fa-table-list'},
  ]},
  {t:'Clubs / Activities', i:'fa-people-group', items:[
    {l:'Register to Club', i:'fa-user-plus'},
    {l:'Club Events', i:'fa-champagne-glasses'},
    {l:'My SIL Points', i:'fa-medal', ribbon:'Track'},
    {l:'Projects / Consultations', i:'fa-diagram-project'},
    {l:'Fellowships / Internships', i:'fa-handshake'},
    {l:'Trainings List', i:'fa-list-check'},
  ]},
  {t:'Exam Section', i:'fa-file-signature', items:[
    {l:'End Sem Exam Result', i:'fa-award'},
    {l:'Exam Seating Room', i:'fa-chair'},
    {l:'In Sem Answer Scripts', i:'fa-file-invoice'},
    {l:'Take an Exam', i:'fa-pen-nib', ribbon:'Live'},
  ]},
  {t:'Fee Payments', i:'fa-sack-dollar', items:[
    {l:'My Payments', i:'fa-receipt'},
    {l:'My SEM Fee Structure', i:'fa-file-invoice-dollar'},
    {l:'Verify Fee Status Online', i:'fa-magnifying-glass-dollar'},
    {l:'Tuition Fee', i:'fa-graduation-cap'},
    {l:'End SEM Exam Fee', i:'fa-file-signature'},
    {l:'Hostel & Placement Fees', i:'fa-building-user'},
    {l:'ERP / SAP Fee', i:'fa-server'},
    {l:'Skill Development Fee', i:'fa-screwdriver-wrench'},
    {l:'Coursera Fee', i:'fa-laptop-code'},
    {l:'Dues & Re-Registration', i:'fa-scale-balanced'},
    {l:'Cheque Payments', i:'fa-money-check'},
    {l:'Other Fees', i:'fa-ellipsis'},
  ]},
  {t:'Hostel Management', i:'fa-building-user', items:[
    {l:'Request Hostel Enrollment', i:'fa-door-open'},
    {l:'Room Registration', i:'fa-bed'},
    {l:'My Hostel Room Info', i:'fa-circle-info'},
  ]},
];

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }

let dashboardBuilt = false;
function buildDashboard() {
  if (dashboardBuilt) return;
  dashboardBuilt = true;

  const quickGrid = document.getElementById('quickGrid');
  QUICK.forEach(q=>{
    const tile = el('div','quick-tile');
    tile.innerHTML = `<div class="qi">${iconSvg(q.i)}</div><span>${q.t}</span>`;
    quickGrid.appendChild(tile);
  });

  const VISIBLE = 6;
  const megaGrid = document.getElementById('megaGrid');
  MEGA.forEach(cat=>{
    const card = el('div','mega-card');
    card.innerHTML = `
      <div class="crown">
        <span class="eyebrow">${iconSvg('star')} Section</span>
        <div class="badge">${iconSvg(cat.i)}</div>
      </div>
      <h3>${cat.t}</h3>
      <div class="tile-grid"></div>
      <div class="arch-hint">
        <div style="height:10px"></div><div style="height:16px"></div><div style="height:22px"></div><div style="height:28px"></div>
      </div>
    `;
    const grid = card.querySelector('.tile-grid');

    function renderTiles(showAll){
      grid.innerHTML = '';
      const items = cat.items;
      const needsMore = !showAll && items.length > VISIBLE - 1;
      const list = needsMore ? items.slice(0, VISIBLE - 1) : items;

      list.forEach(it=>{
        const t = el('div','tile');
        t.innerHTML = `
          <div class="medallion-wrap">
            ${it.ribbon ? `<span class="ribbon">${it.ribbon}</span>` : ''}
            <div class="medallion">${iconSvg(it.i)}</div>
          </div>
          <div class="pedestal"></div>
          <span class="label">${it.l}</span>`;
        grid.appendChild(t);
      });
      if(needsMore){
        const rest = items.length - list.length;
        const more = el('div','tile more');
        more.innerHTML = `
          <div class="medallion-wrap"><div class="medallion">+${rest}</div></div>
          <div class="pedestal"></div>
          <span class="label">Show all</span>`;
        more.addEventListener('click', ()=> renderTiles(true));
        grid.appendChild(more);
      }
    }
    renderTiles(false);
    megaGrid.appendChild(card);
  });
}

/* ---------- enter dashboard after successful login ---------- */
function enterDashboard(userId) {
  buildDashboard();
  document.getElementById('avatarFullId').textContent = userId;
  document.getElementById('avatarInit').textContent = userId.slice(0, 2);
  document.getElementById('dashHeading').textContent = `Welcome back, ${userId}`;
  showScreen(dashScreen);
}

/* ---------- avatar dropdown + logout ---------- */
const avatarBtn = document.getElementById('avatarBtn');
const avatarDropdown = document.getElementById('avatarDropdown');
avatarBtn.addEventListener('click', () => avatarDropdown.classList.toggle('hidden'));
document.addEventListener('click', (e) => {
  if (!avatarBtn.contains(e.target) && !avatarDropdown.contains(e.target)) {
    avatarDropdown.classList.add('hidden');
  }
});
document.getElementById('logoutBtn2').addEventListener('click', () => {
  avatarDropdown.classList.add('hidden');
  showScreen(homeScreen);
});
