/* =======================================================
   KL University — My-KLU Portal (React version)
   Drop into a Vite/Create-React-App project as src/App.jsx
   Import the same style.css alongside it: import './style.css'
   ======================================================= */
import { useState, useEffect, useRef } from 'react';
import './style.css';

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

function Icon({ name, className = '' }) {
  const key = (name || '').replace(/^fa-/, '');
  const body = ICONS[key] || ICONS['circle-info'];
  return (
    <svg
      className={`icon${className ? ' ' + className : ''}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

/* ---------- demo roster ---------- */
function buildRoster() {
  const roster = {};
  for (let i = 1; i <= 30; i++) {
    const id = String(2300040000 + i);   // 2300040001 ... 2300040030
    const password = id.slice(-5);       // 40001 ... 40030
    roster[id] = password;
  }
  return roster;
}
const ROSTER = buildRoster();
const ARCH_HEIGHTS = [18, 30, 44, 60, 78, 98, 120, 145];

/* ---------- dashboard data ---------- */
const QUICK = [
  { t: 'Home', i: 'house' },
  { t: 'Attendance Register', i: 'calendar-check' },
  { t: 'Career Choice', i: 'route' },
  { t: 'Counselling Diary', i: 'comments' },
  { t: 'Feedback', i: 'comment-dots' },
  { t: 'Hallticket', i: 'id-card' },
  { t: 'Infrastructure Related', i: 'building-columns' },
  { t: 'Library', i: 'book-open-reader' },
  { t: 'My CGPA', i: 'chart-line' },
  { t: 'Nodue', i: 'circle-check' },
  { t: 'Profile', i: 'user' },
  { t: 'Psychometric Tests', i: 'brain' },
  { t: 'Quizes', i: 'circle-question' },
  { t: 'Registrar Office', i: 'landmark' },
  { t: 'My Transportation', i: 'bus' },
  { t: 'Ticketing Support', i: 'headset' },
  { t: 'Time Tables', i: 'table-list' },
  { t: 'PhD Exit Survey Feedback', i: 'graduation-cap' },
];

const MEGA = [
  { t: 'Academic Registration', i: 'user-graduate', items: [
    { l: 'Regular Course Registration', i: 'pen-to-square' },
    { l: 'Betterment Course Registration', i: 'arrow-trend-up' },
    { l: 'Fail/ReCourse Registration', i: 'rotate-left' },
    { l: 'Detain Course Registration', i: 'hand' },
    { l: 'Certificate Course Registration', i: 'certificate', ribbon: 'Popular' },
  ]},
  { t: 'Courses', i: 'book-open', items: [
    { l: 'Assignments', i: 'file-pen' },
    { l: 'Handouts', i: 'file-lines' },
    { l: 'Material', i: 'folder-open' },
    { l: 'Internals', i: 'clipboard-check' },
    { l: 'Session Feedback', i: 'star-half-stroke' },
  ]},
  { t: 'CRT', i: 'briefcase', items: [
    { l: 'CRT Courses', i: 'chalkboard-user' },
    { l: 'Attendance', i: 'calendar-check' },
    { l: 'Timetable', i: 'table-list' },
  ]},
  { t: 'Clubs / Activities', i: 'people-group', items: [
    { l: 'Register to Club', i: 'user-plus' },
    { l: 'Club Events', i: 'champagne-glasses' },
    { l: 'My SIL Points', i: 'medal', ribbon: 'Track' },
    { l: 'Projects / Consultations', i: 'diagram-project' },
    { l: 'Fellowships / Internships', i: 'handshake' },
    { l: 'Trainings List', i: 'list-check' },
  ]},
  { t: 'Exam Section', i: 'file-signature', items: [
    { l: 'End Sem Exam Result', i: 'award' },
    { l: 'Exam Seating Room', i: 'chair' },
    { l: 'In Sem Answer Scripts', i: 'file-invoice' },
    { l: 'Take an Exam', i: 'pen-nib', ribbon: 'Live' },
  ]},
  { t: 'Fee Payments', i: 'sack-dollar', items: [
    { l: 'My Payments', i: 'receipt' },
    { l: 'My SEM Fee Structure', i: 'file-invoice-dollar' },
    { l: 'Verify Fee Status Online', i: 'magnifying-glass-dollar' },
    { l: 'Tuition Fee', i: 'graduation-cap' },
    { l: 'End SEM Exam Fee', i: 'file-signature' },
    { l: 'Hostel & Placement Fees', i: 'building-user' },
    { l: 'ERP / SAP Fee', i: 'server' },
    { l: 'Skill Development Fee', i: 'screwdriver-wrench' },
    { l: 'Coursera Fee', i: 'laptop-code' },
    { l: 'Dues & Re-Registration', i: 'scale-balanced' },
    { l: 'Cheque Payments', i: 'money-check' },
    { l: 'Other Fees', i: 'ellipsis' },
  ]},
  { t: 'Hostel Management', i: 'building-user', items: [
    { l: 'Request Hostel Enrollment', i: 'door-open' },
    { l: 'Room Registration', i: 'bed' },
    { l: 'My Hostel Room Info', i: 'circle-info' },
  ]},
];

function ArchRow() {
  return (
    <div className="arch-row">
      {ARCH_HEIGHTS.map((h, i) => (
        <div key={i} className="arch" style={{ height: h, width: 12 + i * 2 }}></div>
      ))}
    </div>
  );
}

function CrestMark({ size = 44, fontSize = 18 }) {
  return (
    <div className="mark" style={{ width: size, height: size }}>
      <span style={{ fontSize }}>K</span>
    </div>
  );
}

function StudentIllustration() {
  return (
    <svg className="illustration" width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#E4C878" strokeWidth="1.6" opacity="0.85">
        <circle cx="70" cy="34" r="16" />
        <path d="M70 50 L70 100 M70 60 L48 88 M70 60 L92 88 M70 100 L58 140 M70 100 L82 140" />
        <rect x="52" y="70" width="12" height="18" rx="2" />
        <circle cx="150" cy="30" r="15" />
        <path d="M150 45 L150 96 M150 56 L130 82 M150 56 L170 82 M150 96 L138 140 M150 96 L162 140" />
        <path d="M138 60 Q150 68 162 60" />
      </g>
    </svg>
  );
}

function CampusIllustration() {
  return (
    <svg className="dash-illustration" width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C89B3C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
        <path d="M20 100H160" />
        <path d="M28 100V60L90 24L152 60V100" />
        <path d="M46 100V68M64 100V68M116 100V68M134 100V68" />
        <rect x="80" y="80" width="20" height="20" />
        <path d="M90 8V24" />
        <path d="M78 8H102L90 16Z" />
      </g>
    </svg>
  );
}

/* ---------- Home ---------- */
function Home({ onEnter }) {
  return (
    <div className="home">
      <div className="home-crest"><span>K</span></div>
      <h1 className="wordmark">KL University</h1>
      <div className="sub">My&nbsp;·&nbsp;KLU&nbsp;Student&nbsp;Portal</div>
      <button className="enter-btn" onClick={onEnter}>
        Enter My-KLU
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="#34090F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ArchRow />
    </div>
  );
}

/* ---------- Login ---------- */
function LoginScreen({ onBack, onSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const id = userId.trim();
    const pass = password.trim();

    if (!id || !pass) {
      setError('Enter both your User ID and password to continue.');
      return;
    }
    setBusy(true);
    setError('');
    setTimeout(() => {
      if (ROSTER[id] && ROSTER[id] === pass) {
        onSuccess(id);
      } else if (!ROSTER[id]) {
        setError('We don\u2019t recognize that User ID.');
      } else {
        setError('That password doesn\u2019t match this User ID.');
      }
      setBusy(false);
    }, 350);
  }

  return (
    <div className="login-screen">
      <div className="login-left">
        <div className="brand">
          <CrestMark />
          <div className="name">KL University
            <small>DEEMED TO BE UNIVERSITY</small>
          </div>
        </div>
        <div className="headline">
          <h2>Welcome back to campus, digitally.</h2>
          <p>Sign in with your University ID to reach attendance, grades, timetables and fee records — all in one place.</p>
        </div>
        <StudentIllustration />
        <ArchRow />
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="card-crest"><span>K</span></div>
          <h3 className="wordmark">Sign in</h3>
          <div className="eyebrow">KL University</div>

          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label htmlFor="uid">User ID</label>
            <input
              id="uid"
              type="text"
              inputMode="numeric"
              placeholder="2300040001"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="password"
              placeholder="•••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="login-submit" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Login'}
          </button>

          <button type="button" className="back-link" onClick={onBack}>← Back to home</button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Quick Access tile ---------- */
function QuickTile({ t, i }) {
  return (
    <div className="quick-tile">
      <div className="qi"><Icon name={i} /></div>
      <span>{t}</span>
    </div>
  );
}

/* ---------- one Mega category card ---------- */
const VISIBLE = 6;
function MegaCard({ cat }) {
  const [showAll, setShowAll] = useState(false);
  const items = cat.items;
  const needsMore = !showAll && items.length > VISIBLE - 1;
  const list = needsMore ? items.slice(0, VISIBLE - 1) : items;
  const rest = items.length - list.length;

  return (
    <div className="mega-card">
      <div className="crown">
        <span className="eyebrow"><Icon name="star" /> Section</span>
        <div className="badge"><Icon name={cat.i} /></div>
      </div>
      <h3>{cat.t}</h3>
      <div className="tile-grid">
        {list.map((it, idx) => (
          <div className="tile" key={idx}>
            <div className="medallion-wrap">
              {it.ribbon && <span className="ribbon">{it.ribbon}</span>}
              <div className="medallion"><Icon name={it.i} /></div>
            </div>
            <div className="pedestal"></div>
            <span className="label">{it.l}</span>
          </div>
        ))}
        {needsMore && (
          <div className="tile more" onClick={() => setShowAll(true)}>
            <div className="medallion-wrap"><div className="medallion">+{rest}</div></div>
            <div className="pedestal"></div>
            <span className="label">Show all</span>
          </div>
        )}
      </div>
      <div className="arch-hint">
        <div style={{ height: 10 }}></div><div style={{ height: 16 }}></div>
        <div style={{ height: 22 }}></div><div style={{ height: 28 }}></div>
      </div>
    </div>
  );
}

/* ---------- Dashboard (post-login) ---------- */
function Dashboard({ userId, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="dash-screen">
      <div className="topbar">
        <div className="brand"><div className="mark">K</div><div className="name">My-KLU</div></div>
        <div className="search"><Icon name="magnifying-glass" /><span>Search sections… <em style={{ opacity: .6 }}>(Beta)</em></span></div>
        <div className="spacer"></div>
        <div className="icon-btn"><Icon name="gear" /></div>
        <div className="avatar-menu" ref={menuRef}>
          <div className="avatar" onClick={() => setMenuOpen(v => !v)}>
            <div className="circ">{userId.slice(0, 2)}</div>
            <span className="id">{userId}</span>
            <Icon name="chevron-down" className="chev" />
          </div>
          {menuOpen && (
            <div className="avatar-dropdown">
              <button type="button"><Icon name="user" /> Profile</button>
              <button type="button" className="danger" onClick={onLogout}><Icon name="right-from-bracket" /> Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard">
        <div className="dash-head">
          <div>
            <span className="eyebrow">Student Workspace</span>
            <h1>Welcome back, {userId}</h1>
            <p>Everything from registration to results, organized the way your campus actually works.</p>
          </div>
          <CampusIllustration />
        </div>

        <div className="section-label"><h2>Quick Access</h2><div className="rule"></div></div>
        <div className="quick-grid">
          {QUICK.map((q, idx) => <QuickTile key={idx} {...q} />)}
        </div>

        <div className="section-label"><h2>Academics &amp; Services</h2><div className="rule"></div></div>
        <div className="mega-grid">
          {MEGA.map((cat, idx) => <MegaCard key={idx} cat={cat} />)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'login' | 'dashboard'
  const [activeId, setActiveId] = useState('');

  if (screen === 'login') {
    return (
      <LoginScreen
        onBack={() => setScreen('home')}
        onSuccess={(id) => { setActiveId(id); setScreen('dashboard'); }}
      />
    );
  }
  if (screen === 'dashboard') {
    return <Dashboard userId={activeId} onLogout={() => { setActiveId(''); setScreen('home'); }} />;
  }
  return <Home onEnter={() => setScreen('login')} />;
}
