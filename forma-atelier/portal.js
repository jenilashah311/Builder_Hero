/**
 * Ajay Shah & Associates - Builder & Contractor Portal Management Module
 * Er. Ajay H. Shah (B.E. Civil) | +91 98246 66003 | ahshah05@gmail.com
 * Vadodara &middot; Manjalpur &middot; Makarpura &middot; Akota
 */

const PORTAL_PASSWORD = "Sweta@123";

// Initial Residential Quotation Sample
const defaultQuotations = [
  {
    id: "QUO-2026-001",
    refNo: "ASA/QUO/2026/0919",
    date: "19 / 09 / 2026",
    clientName: "Shri Rajeshbhai Patel",
    companyName: "The Grand Villa Residence",
    location: "Manjalpur, Vadodara",
    subject: "Quotation for Turnkey Residential Bungalow Civil Construction Work.",
    opening: "With reference to all the architectural drawings given by you and as per our site discussion, we are pleased to submit our quotation for the residential bungalow civil construction at Manjalpur, Vadodara.",
    status: "Sent",
    gstRate: 18,
    paymentTerms: "15% mobilization advance against agreement, running account bills on 15-day cycle based on site measurement.",
    items: [
      {
        description: "Ground + 2 Storey Luxury Bungalow civil construction up to plaster finish.",
        qty: 4850,
        rate: 1750,
        unit: "S. FT",
        amount: 8487500
      }
    ],
    notes: [
      "Depth of foundation is considered as 2.1 M for footing as per structural soil test report.",
      "Ground level is considered as 0 from road level with anti-termite treatment.",
      "Interior woodwork, decorative electrical fittings, and aluminium sliding windows will be quoted as per client selections."
    ],
    scope: [
      "The rate is given for civil works up to plaster only for residential structure.",
      "The rate excludes interior furniture, decorative lighting, and external landscaping.",
      "Approximate estimate for turnkey finishes including vitrified flooring, electrical wiring, and sanitary plumbing will be worked out in detail based on material choices."
    ]
  }
];

const defaultVendors = [
  { id: "V-1", name: "Kailash RMC & Concrete", category: "Cement & RMC", contact: "Dineshbhai Patel", phone: "+91 98250 11442", city: "Makarpura GIDC / Manjalpur", dues: 245000, notes: "M25 / M30 Grade RMC supplier for bungalows" },
  { id: "V-2", name: "Mahalaxmi Steel Traders (TMT 550D)", category: "TMT Steel", contact: "Kalpesh Shah", phone: "+91 98240 77319", city: "Makarpura GIDC", dues: 580000, notes: "Primary steel supplier, Tata Tiscon / Jindal" },
  { id: "V-3", name: "Vishwakarma Fabrication & Railings", category: "Fabrication", contact: "Pravinbhai Mistry", phone: "+91 94263 88102", city: "Manjalpur / Makarpura", dues: 310000, notes: "Terrace pergolas, main entrance gates & SS railings" },
  { id: "V-4", name: "Maruti Shuttering & Scaffolding", category: "Shuttering", contact: "Rambhai", phone: "+91 97129 44321", city: "Akota / Vadodara", dues: 95000, notes: "Plywood shuttering & steel props staging" },
  { id: "V-5", name: "Narmada Coarse Sand & Kapchi", category: "Sand & Aggregate", contact: "Mukeshbhai", phone: "+91 99092 55180", city: "Vadodara", dues: 120000, notes: "River sand & 20mm/10mm black trap metal" },
  { id: "V-6", name: "Shreeji High-Tension Electricals & Plumbing", category: "Electrical & Plumbing", contact: "Bhavesh Parmar", phone: "+91 98255 66201", city: "Manjalpur / Akota", dues: 45000, notes: "Concealed Polycab wiring & Astral CPVC plumbing" }
];

const defaultTeam = [
  { id: "T-1", name: "Er. Dhaval Patel (B.E. Civil)", role: "Site Civil Engineer", phone: "+91 98791 22345", site: "Manjalpur Luxury Villa", status: "Active", notes: "Lead site engineer, leveling & RCC column checks" },
  { id: "T-2", name: "Er. Pratik Mehta (Dip. Civil)", role: "Junior Project Engineer", phone: "+91 98254 33812", site: "Akota Commercial Arcade", status: "Active", notes: "Measurement taking & BOQ quantity verification" },
  { id: "T-3", name: "Rameshbhai Prajapati", role: "Head Site Supervisor", phone: "+91 94270 55123", site: "Manjalpur Luxury Villa", status: "Active", notes: "Daily labour deployment, materials inward inspection" },
  { id: "T-4", name: "Irfan Mansuri", role: "RCC & Shuttering Mukadam", phone: "+91 99241 88910", site: "Makarpura Road Bungalow", status: "Active", notes: "Gang of 22 experienced shuttering & casting artisans" },
  { id: "T-5", name: "Mukesh Baria", role: "Storekeeper & Inward", phone: "+91 97230 44512", site: "Vadodara Central Yard", status: "Active", notes: "Cement stock registers, TMT steel cutting scrap control" }
];

const defaultProjects = [
  { id: "P-1", title: "The Grand Villa Residence", type: "Luxury Residential Bungalow", location: "Manjalpur, Vadodara", client: "Rajeshbhai Patel", value: 8500000, received: 6800000, progress: 80, engineer: "Er. Dhaval Patel" },
  { id: "P-2", title: "Apex Commercial Arcade & Showrooms", type: "Commercial Complex & Retails", location: "Akota & Makarpura Road", client: "Jitubhai Patel", value: 14500000, received: 11000000, progress: 75, engineer: "Er. Pratik Mehta" },
  { id: "P-3", title: "Akota Modern Heritage Villa", type: "Bespoke Duplex Home", location: "Akota, Vadodara", client: "Sunil Shah", value: 12000000, received: 3500000, progress: 30, engineer: "Er. Ajay H. Shah" }
];

let quotations = JSON.parse(localStorage.getItem('asa_quotations')) || defaultQuotations;
let vendors = JSON.parse(localStorage.getItem('asa_vendors')) || defaultVendors;
let team = JSON.parse(localStorage.getItem('asa_team')) || defaultTeam;
let projects = JSON.parse(localStorage.getItem('asa_projects')) || defaultProjects;

let currentVendorFilter = 'All';

function savePortalData() {
  localStorage.setItem('asa_quotations', JSON.stringify(quotations));
  localStorage.setItem('asa_vendors', JSON.stringify(vendors));
  localStorage.setItem('asa_team', JSON.stringify(team));
  localStorage.setItem('asa_projects', JSON.stringify(projects));
}

function numberToIndianWords(num) {
  if (!num || isNaN(num) || num === 0) return "Rupees Zero Only.";
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? '-' + a[digit] : ' ');
  }

  num = Math.floor(Math.abs(num));
  let words = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = Math.floor(num / 100);
  const remaining = num % 100;

  if (crore > 0) words += inWords(crore) + 'Crore ';
  if (lakh > 0) words += inWords(lakh) + 'Lakh ';
  if (thousand > 0) words += inWords(thousand) + 'Thousand ';
  if (hundred > 0) words += inWords(hundred) + 'Hundred ';
  if (remaining > 0) words += inWords(remaining);

  return 'Rupees ' + words.trim() + ' Only.';
}

function formatINR(val) {
  return Number(val || 0).toLocaleString('en-IN');
}

// Resilient DOM helpers to prevent any null reference errors
function safeSetVal(id, val) {
  const el = document.getElementById(id);
  if (el) {
    el.value = (val !== undefined && val !== null) ? val : '';
  }
}

function safeGetVal(id, fallback = '') {
  const el = document.getElementById(id);
  return el ? el.value : fallback;
}

function safeSetText(id, txt) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = (txt !== undefined && txt !== null) ? txt : '';
  }
}

function safeSetHtml(id, html) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = (html !== undefined && html !== null) ? html : '';
  }
}

// Authentication Check
function isPortalAuthenticated() {
  return sessionStorage.getItem('asa_portal_auth') === 'true';
}

function isAdminActive() {
  return localStorage.getItem('asa_admin_mode') === 'true';
}

function openPortal() {
  if (isPortalAuthenticated()) {
    showPortalDashboard();
  } else {
    showAuthModal();
  }
}

function showAuthModal() {
  const modal = document.getElementById('portal-auth-modal');
  if (modal) modal.classList.remove('hidden');
  const input = document.getElementById('portal-pin-input');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }
  const err = document.getElementById('auth-error-msg');
  if (err) err.classList.add('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeAuthModal() {
  const modal = document.getElementById('portal-auth-modal');
  if (modal) modal.classList.add('hidden');
}

function togglePasswordVisibility() {
  const input = document.getElementById('portal-pin-input');
  const icon = document.getElementById('toggle-pwd-icon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    if (icon) icon.setAttribute('data-lucide', 'eye');
  }
  if (window.lucide) window.lucide.createIcons();
}

function verifyPortalPin(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('portal-pin-input');
  if (!input) return;
  const raw = input.value;
  const trimmed = raw.trim();

  // Accept exact password "Sweta@123", trimmed, or case-insensitive match
  const isValid = (raw === PORTAL_PASSWORD) || 
                  (trimmed === PORTAL_PASSWORD) || 
                  (trimmed.toLowerCase() === PORTAL_PASSWORD.toLowerCase());

  if (isValid) {
    sessionStorage.setItem('asa_portal_auth', 'true');
    localStorage.setItem('asa_admin_mode', 'true');
    closeAuthModal();
    if (typeof updateAdminModeUI === 'function') {
      updateAdminModeUI();
    }
    showPortalDashboard();
  } else {
    const err = document.getElementById('auth-error-msg');
    if (err) err.classList.remove('hidden');
    input.focus();
    input.select();
  }
}

function logoutAdmin() {
  localStorage.removeItem('asa_admin_mode');
  sessionStorage.removeItem('asa_portal_auth');
  closePortalDashboard();
  if (typeof updateAdminModeUI === 'function') {
    updateAdminModeUI();
  }
}

function showPortalDashboard() {
  document.getElementById('portal-dashboard-modal').classList.remove('hidden');
  switchPortalTab('quotations');
  renderQuotationsList();
  renderVendorsList(currentVendorFilter);
  renderTeamList();
  renderProjectsList();
  if (window.lucide) window.lucide.createIcons();
}

function closePortalDashboard() {
  document.getElementById('portal-dashboard-modal').classList.add('hidden');
}

function logoutPortal() {
  sessionStorage.removeItem('asa_portal_auth');
  localStorage.removeItem('asa_admin_mode');
  closePortalDashboard();
  if (typeof updateAdminModeUI === 'function') {
    updateAdminModeUI();
  }
}

function switchPortalTab(tabName) {
  document.querySelectorAll('.portal-tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.portal-nav-btn').forEach(btn => {
    btn.classList.remove('border-blue-600', 'text-blue-700', 'font-bold');
    btn.classList.add('border-transparent', 'text-slate-600');
  });
  document.querySelectorAll('.mob-portal-nav-btn').forEach(btn => {
    btn.classList.remove('bg-blue-600', 'text-white', 'font-bold');
    btn.classList.add('bg-slate-100', 'text-slate-700', 'font-medium');
  });

  const target = document.getElementById(`portal-${tabName}-tab`);
  const activeBtn = document.getElementById(`btn-tab-${tabName}`);
  const activeMobBtn = document.getElementById(`mob-btn-tab-${tabName}`);

  if (target) target.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('border-blue-600', 'text-blue-700', 'font-bold');
    activeBtn.classList.remove('border-transparent', 'text-slate-600');
  }
  if (activeMobBtn) {
    activeMobBtn.classList.add('bg-blue-600', 'text-white', 'font-bold');
    activeMobBtn.classList.remove('bg-slate-100', 'text-slate-700', 'font-medium');
  }

  // Refresh tab specific content if needed
  if (tabName === 'quotations') renderQuotationsList();
  if (tabName === 'vendors') renderVendorsList(currentVendorFilter);
  if (tabName === 'team') renderTeamList();
  if (tabName === 'projects') renderProjectsList();

  if (window.lucide) window.lucide.createIcons();
}

// =========================================================================
// QUOTATIONS MANAGEMENT
// =========================================================================

function renderQuotationsList(filterQuery = '', statusFilter = 'All') {
  const tbody = document.getElementById('portal-quotes-tbody');
  const mobileList = document.getElementById('portal-quotes-mobile-list');
  if (tbody) tbody.innerHTML = '';
  if (mobileList) mobileList.innerHTML = '';

  const query = (filterQuery || '').toLowerCase().trim();

  let filtered = quotations.filter(q => {
    const matchesQuery = !query || 
      (q.clientName || '').toLowerCase().includes(query) ||
      (q.companyName || '').toLowerCase().includes(query) ||
      (q.location || '').toLowerCase().includes(query) ||
      (q.refNo || '').toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  // Update statistics banner
  let totalVal = 0;
  let sentVal = 0;
  quotations.forEach(q => {
    const sub = (q.items || []).reduce((s, it) => s + (Number(it.amount) || (it.qty * it.rate)), 0);
    const tot = sub + Math.round(sub * (q.gstRate || 0) / 100);
    totalVal += tot;
    if (q.status === 'Sent' || q.status === 'Approved') {
      sentVal += tot;
    }
  });

  const countEl = document.getElementById('stat-quotes-count');
  const valEl = document.getElementById('stat-quotes-value');
  const sentEl = document.getElementById('stat-quotes-sent');
  if (countEl) countEl.innerText = quotations.length;
  if (valEl) valEl.innerText = '₹ ' + (totalVal >= 10000000 ? (totalVal / 10000000).toFixed(2) + ' Cr' : formatINR(totalVal));
  if (sentEl) sentEl.innerText = '₹ ' + (sentVal >= 10000000 ? (sentVal / 10000000).toFixed(2) + ' Cr' : formatINR(sentVal));

  if (filtered.length === 0) {
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-slate-400 text-xs">
            No quotations found matching your search. Click <strong>+ Create New Quotation</strong> to add one.
          </td>
        </tr>
      `;
    }
    if (mobileList) {
      mobileList.innerHTML = `
        <div class="py-8 text-center text-slate-400 text-xs">
          No quotations found matching your search. Click <strong>+ Create New Quotation</strong> to add one.
        </div>
      `;
    }
    return;
  }

  filtered.forEach(q => {
    const items = q.items || [];
    const subtotal = items.reduce((s, it) => s + (Number(it.amount) || (it.qty * it.rate)), 0);
    const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
    const total = subtotal + gst;

    const itemsSummary = items.length === 1
      ? `<div>${Number(items[0].qty).toLocaleString()} ${items[0].unit} @ ₹${items[0].rate}</div><div class="text-[10px] text-slate-400 truncate max-w-[200px]">${items[0].description}</div>`
      : `<div class="font-bold text-slate-700">${items.length} Scope Items</div><div class="text-[10px] text-slate-400 truncate max-w-[200px]">${items.map(it => it.description).join(', ')}</div>`;

    const statusBadgeColors = {
      'Sent': 'bg-blue-50 text-blue-700 border-blue-200',
      'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Draft': 'bg-slate-100 text-slate-700 border-slate-300',
      'Negotiation': 'bg-amber-50 text-amber-700 border-amber-200',
      'Completed': 'bg-purple-50 text-purple-700 border-purple-200'
    };

    const badgeCls = statusBadgeColors[q.status] || 'bg-slate-100 text-slate-700 border-slate-200';

    // Desktop table row
    if (tbody) {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-slate-50 transition-colors border-b border-slate-100";
      tr.innerHTML = `
        <td class="py-3 px-3 font-mono font-semibold text-slate-800 text-xs">
          <div class="text-blue-900">${q.refNo || q.id}</div>
          <div class="text-[10px] text-slate-400 font-normal">${q.date}</div>
        </td>
        <td class="py-3 px-3 text-xs">
          <div class="font-bold text-slate-900">${q.clientName}</div>
          <div class="text-slate-500 text-[11px]">${q.companyName} &middot; <span class="text-slate-700">${q.location}</span></div>
        </td>
        <td class="py-3 px-3 text-xs text-right font-mono">
          ${itemsSummary}
        </td>
        <td class="py-3 px-3 text-xs text-right font-mono">
          <div class="font-bold text-blue-950 text-sm">₹ ${formatINR(total)}</div>
          <div class="text-[10px] text-slate-400">GST (${q.gstRate || 0}%): ₹${formatINR(gst)}</div>
        </td>
        <td class="py-3 px-3 text-center">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeCls}">
            ${q.status || 'Sent'}
          </span>
        </td>
        <td class="py-3 px-3 text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="viewQuotationLetterhead('${q.id}')" title="Print Official Letterhead PDF" class="p-1.5 text-blue-700 hover:bg-blue-50 rounded cursor-pointer">
              <i data-lucide="printer" class="w-4 h-4"></i>
            </button>
            <button onclick="shareWhatsAppQuote('${q.id}')" title="Send Quotation via WhatsApp" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer">
              <i data-lucide="message-circle" class="w-4 h-4"></i>
            </button>
            <button onclick="editQuotationData('${q.id}')" title="Edit Quotation Content & Scope" class="p-1.5 text-slate-700 hover:bg-slate-200 rounded cursor-pointer">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="duplicateQuotationData('${q.id}')" title="Duplicate Quotation" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">
              <i data-lucide="copy" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteQuotationData('${q.id}')" title="Delete Quotation" class="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    }

    // Mobile card view (clean touch-friendly actions)
    if (mobileList) {
      const card = document.createElement('div');
      card.className = "p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2.5";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-blue-900">${q.refNo || q.id}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeCls}">
            ${q.status || 'Sent'}
          </span>
        </div>
        <div>
          <div class="font-bold text-slate-900 text-sm">${q.clientName}</div>
          <div class="text-xs text-slate-500">${q.companyName} &middot; <span class="text-slate-700">${q.location}</span></div>
          <div class="text-[11px] text-slate-400 font-mono mt-0.5">${q.date} &middot; ${items.length} Scope Item(s)</div>
        </div>
        <div class="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
          <span class="text-xs text-slate-500 font-medium">Total (Incl. GST):</span>
          <span class="text-sm font-bold font-mono text-blue-950">₹ ${formatINR(total)}</span>
        </div>
        <div class="flex items-center gap-1.5 pt-1 border-t border-slate-100">
          <button onclick="viewQuotationLetterhead('${q.id}')" class="flex-1 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span>Letterhead</span>
          </button>
          <button onclick="shareWhatsAppQuote('${q.id}')" class="flex-1 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            <span>WhatsApp</span>
          </button>
          <button onclick="editQuotationData('${q.id}')" class="p-1.5 text-slate-600 bg-slate-100 rounded-lg cursor-pointer" title="Edit">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="duplicateQuotationData('${q.id}')" class="p-1.5 text-slate-600 bg-slate-100 rounded-lg cursor-pointer" title="Duplicate">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
          <button onclick="deleteQuotationData('${q.id}')" class="p-1.5 text-red-600 bg-red-50 rounded-lg cursor-pointer" title="Delete">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
      mobileList.appendChild(card);
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

function filterQuotations() {
  const query = document.getElementById('quote-search-input')?.value || '';
  const status = document.getElementById('quote-status-filter')?.value || 'All';
  renderQuotationsList(query, status);
}

function addQuotationItemRow(desc = '', qty = 1000, rate = 1750, unit = 'S. FT') {
  const container = document.getElementById('qedit-items-container');
  if (!container) return;

  const rowId = 'qitem-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  const row = document.createElement('div');
  row.className = "qitem-row p-3 bg-white border border-slate-200 rounded-xl space-y-2 relative shadow-2xs";
  row.id = rowId;
  row.innerHTML = `
    <div class="flex items-center justify-between gap-2">
      <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Item Scope</span>
      <button type="button" onclick="removeQuotationItemRow('${rowId}')" class="text-slate-400 hover:text-red-600 p-1 rounded cursor-pointer" title="Remove this item">
        <i data-lucide="trash" class="w-3.5 h-3.5"></i>
      </button>
    </div>
    <div>
      <input type="text" class="qitem-desc w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none" required placeholder="e.g. Ground + 2 Storey Luxury Bungalow civil construction up to plaster finish" value="${escapeHtml(desc)}" />
    </div>
    <div class="grid grid-cols-4 gap-2 items-center">
      <div>
        <label class="block text-[10px] text-slate-500 font-mono">Qty</label>
        <input type="number" step="any" oninput="recalcEditorTotal()" class="qitem-qty w-full px-2 py-1 border border-slate-300 rounded-lg font-mono text-xs bg-slate-50 focus:bg-white" value="${qty}" />
      </div>
      <div>
        <label class="block text-[10px] text-slate-500 font-mono">Rate (₹)</label>
        <input type="number" step="any" oninput="recalcEditorTotal()" class="qitem-rate w-full px-2 py-1 border border-slate-300 rounded-lg font-mono text-xs bg-slate-50 focus:bg-white" value="${rate}" />
      </div>
      <div>
        <label class="block text-[10px] text-slate-500 font-mono">Unit</label>
        <select class="qitem-unit w-full px-1.5 py-1 border border-slate-300 rounded-lg font-mono text-xs bg-slate-50">
          <option ${unit === 'S. FT' ? 'selected' : ''}>S. FT</option>
          <option ${unit === 'R. FT' ? 'selected' : ''}>R. FT</option>
          <option ${unit === 'CU. M' ? 'selected' : ''}>CU. M</option>
          <option ${unit === 'SQ. M' ? 'selected' : ''}>SQ. M</option>
          <option ${unit === 'NOS' ? 'selected' : ''}>NOS</option>
          <option ${unit === 'BRASS' ? 'selected' : ''}>BRASS</option>
          <option ${unit === 'MT' ? 'selected' : ''}>MT</option>
          <option ${unit === 'L.S.' ? 'selected' : ''}>L.S.</option>
        </select>
      </div>
      <div class="text-right">
        <label class="block text-[10px] text-slate-500 font-mono">Item Total</label>
        <span class="qitem-total font-mono font-bold text-xs text-blue-900">₹ ${formatINR(qty * rate)}</span>
      </div>
    </div>
  `;
  container.appendChild(row);
  if (window.lucide) window.lucide.createIcons();
  recalcEditorTotal();
}

function removeQuotationItemRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
  }
  const remaining = document.querySelectorAll('.qitem-row');
  if (remaining.length === 0) {
    addQuotationItemRow("Residential bungalow civil construction", 1, 0, "S. FT");
  }
  recalcEditorTotal();
}

function recalcEditorTotal() {
  let subtotal = 0;
  document.querySelectorAll('.qitem-row').forEach(row => {
    const qty = parseFloat(row.querySelector('.qitem-qty')?.value) || 0;
    const rate = parseFloat(row.querySelector('.qitem-rate')?.value) || 0;
    const rowAmt = qty * rate;
    const totalEl = row.querySelector('.qitem-total');
    if (totalEl) totalEl.innerText = '₹ ' + formatINR(rowAmt);
    subtotal += rowAmt;
  });

  const gstRate = parseFloat(safeGetVal('qedit-gst', '18')) || 0;
  const gst = Math.round(subtotal * gstRate / 100);
  const total = subtotal + gst;

  safeSetText('qedit-subtotal-disp', '₹ ' + formatINR(subtotal));
  safeSetText('qedit-gst-disp', '₹ ' + formatINR(gst));
  safeSetText('qedit-total-disp', '₹ ' + formatINR(total));
  safeSetText('qedit-words-disp', numberToIndianWords(total));
}

function openCreateQuotationModal() {
  safeSetText('modal-editor-title', "Create New Quotation");
  safeSetVal('qedit-id', "");
  safeSetVal('qedit-client', "");
  safeSetVal('qedit-company', "");
  safeSetVal('qedit-location', "Manjalpur, Vadodara");
  safeSetVal('qedit-ref', `ASA/QUO/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`);
  
  const d = new Date();
  safeSetVal('qedit-date', `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`);
  safeSetVal('qedit-subject', "Quotation for Turnkey Residential Bungalow Civil Construction Work.");
  safeSetVal('qedit-status', "Sent");
  safeSetVal('qedit-opening', "With reference to all the architectural drawings given by you and as per our site discussion, we are pleased to submit our quotation for the residential bungalow civil construction at Manjalpur, Vadodara.");

  const container = document.getElementById('qedit-items-container');
  if (container) container.innerHTML = '';
  addQuotationItemRow("Ground + 2 Storey Luxury Bungalow civil construction up to plaster finish.", 4850, 1750, "S. FT");

  safeSetVal('qedit-gst', 18);
  safeSetVal('qedit-notes', [
    "Depth of foundation is considered as 2.1 M for footing as per structural soil test report.",
    "Ground level is considered as 0 from road level with anti-termite treatment.",
    "Interior woodwork, decorative electrical fittings, and aluminium sliding windows will be quoted as per client selections."
  ].join('\n'));

  safeSetVal('qedit-scope', [
    "The rate is given for civil works up to plaster only for residential structure.",
    "The rate excludes interior furniture, decorative lighting, and external landscaping.",
    "Approximate estimate for turnkey finishes including vitrified flooring, electrical wiring, and sanitary plumbing will be worked out in detail based on material choices."
  ].join('\n'));

  safeSetVal('qedit-payment', "15% mobilization advance against agreement, running account bills on 15-day cycle based on site measurement.");

  recalcEditorTotal();
  const modal = document.getElementById('quotation-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function editQuotationData(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;

  safeSetText('modal-editor-title', "Edit Quotation (" + (q.refNo || q.id) + ")");
  safeSetVal('qedit-id', q.id);
  safeSetVal('qedit-client', q.clientName || "");
  safeSetVal('qedit-company', q.companyName || "");
  safeSetVal('qedit-location', q.location || "");
  safeSetVal('qedit-ref', q.refNo || "");
  safeSetVal('qedit-date', q.date || "");
  safeSetVal('qedit-subject', q.subject || "");
  safeSetVal('qedit-status', q.status || "Sent");
  safeSetVal('qedit-opening', q.opening || "With reference to all the architectural drawings given by you and as per our site discussion, we are pleased to submit our quotation.");

  const container = document.getElementById('qedit-items-container');
  if (container) {
    container.innerHTML = '';
    (q.items || []).forEach(it => {
      addQuotationItemRow(it.description, it.qty, it.rate, it.unit);
    });
    if ((q.items || []).length === 0) {
      addQuotationItemRow("Residential civil construction", 1, 0, "S. FT");
    }
  }

  safeSetVal('qedit-gst', q.gstRate !== undefined ? q.gstRate : 18);
  safeSetVal('qedit-notes', (q.notes || []).join('\n'));
  safeSetVal('qedit-scope', (q.scope || []).join('\n'));
  safeSetVal('qedit-payment', q.paymentTerms || "");

  recalcEditorTotal();
  const modal = document.getElementById('quotation-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeQuotationEditorModal() {
  document.getElementById('quotation-editor-modal').classList.add('hidden');
}

function saveQuotationEditor(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const qId = safeGetVal('qedit-id');

  // Extract items
  const items = [];
  document.querySelectorAll('.qitem-row').forEach(row => {
    const desc = row.querySelector('.qitem-desc')?.value.trim();
    const qty = parseFloat(row.querySelector('.qitem-qty')?.value) || 0;
    const rate = parseFloat(row.querySelector('.qitem-rate')?.value) || 0;
    const unit = row.querySelector('.qitem-unit')?.value || 'S. FT';
    if (desc) {
      items.push({
        description: desc,
        qty: qty,
        rate: rate,
        unit: unit,
        amount: qty * rate
      });
    }
  });

  if (items.length === 0) {
    items.push({
      description: "Residential civil construction work",
      qty: 1,
      rate: 1750,
      unit: "S. FT",
      amount: 1750
    });
  }

  const rawNotes = safeGetVal('qedit-notes');
  const notes = rawNotes ? rawNotes.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const rawScope = safeGetVal('qedit-scope');
  const scope = rawScope ? rawScope.split('\n').map(s => s.trim()).filter(Boolean) : [];

  const quoteObj = {
    id: qId || ("QUO-" + Date.now()),
    refNo: safeGetVal('qedit-ref').trim() || `ASA/QUO/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: safeGetVal('qedit-client').trim() || "Client",
    companyName: safeGetVal('qedit-company').trim() || "Company",
    location: safeGetVal('qedit-location').trim() || "Vadodara",
    subject: safeGetVal('qedit-subject').trim() || "Quotation of civil work",
    date: safeGetVal('qedit-date').trim() || new Date().toLocaleDateString('en-GB'),
    status: safeGetVal('qedit-status', 'Sent'),
    opening: safeGetVal('qedit-opening').trim(),
    gstRate: parseFloat(safeGetVal('qedit-gst', '18')) || 18,
    paymentTerms: safeGetVal('qedit-payment').trim(),
    items: items,
    notes: notes,
    scope: scope
  };

  if (qId) {
    const idx = quotations.findIndex(x => x.id === qId);
    if (idx !== -1) {
      quotations[idx] = quoteObj;
    }
  } else {
    quotations.unshift(quoteObj);
  }

  savePortalData();
  renderQuotationsList();
  closeQuotationEditorModal();
  viewQuotationLetterhead(quoteObj.id);
}

function deleteQuotationData(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;
  if (confirm(`Are you sure you want to delete quotation ${q.refNo || q.id} for ${q.clientName}?`)) {
    quotations = quotations.filter(x => x.id !== quoteId);
    savePortalData();
    renderQuotationsList();
  }
}

function duplicateQuotationData(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;
  const copy = JSON.parse(JSON.stringify(q));
  copy.id = "QUO-" + Date.now();
  copy.refNo = `ASA/QUO/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
  copy.clientName += " (Copy)";
  copy.status = "Draft";
  quotations.unshift(copy);
  savePortalData();
  renderQuotationsList();
}

function viewQuotationLetterhead(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;

  safeSetText('letterhead-client', (q.clientName ? q.clientName + ',' : ''));
  safeSetText('letterhead-company', (q.companyName ? q.companyName + ',' : ''));
  safeSetText('letterhead-location', (q.location ? q.location + '.' : ''));
  safeSetText('letterhead-date', q.date || '');
  safeSetText('letterhead-subject', 'Subject: ' + (q.subject || ''));
  safeSetText('letterhead-opening', q.opening || "With reference to all the architectural drawings given by you and as per our site discussion, we are pleased to submit our quotation.");

  const itemsBody = document.getElementById('letterhead-items-tbody');
  if (itemsBody) itemsBody.innerHTML = '';
  let subtotal = 0;

  (q.items || []).forEach((it, idx) => {
    const amt = it.amount || (it.qty * it.rate);
    subtotal += amt;
    if (itemsBody) {
      itemsBody.innerHTML += `
        <tr class="divide-x divide-slate-600">
          <td class="py-2 px-3 text-center font-mono">${idx + 1}</td>
          <td class="py-2 px-3 font-medium">${it.description}</td>
          <td class="py-2 px-3 text-right font-mono">${Number(it.qty).toLocaleString()}</td>
          <td class="py-2 px-3 text-right font-mono">${Number(it.rate).toLocaleString()}</td>
          <td class="py-2 px-3 text-center font-mono">${it.unit}</td>
          <td class="py-2 px-3 text-right font-mono font-bold">₹ ${formatINR(amt)}</td>
        </tr>
      `;
    }
  });

  const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
  const total = subtotal + gst;

  safeSetText('letterhead-subtotal', '₹ ' + formatINR(subtotal));
  safeSetText('letterhead-gst-rate', `GST @ ${q.gstRate}%:`);
  safeSetText('letterhead-gst-amount', '₹ ' + formatINR(gst));
  safeSetText('letterhead-grand-total', '₹ ' + formatINR(total));
  safeSetText('letterhead-words', numberToIndianWords(total));

  const notesEl = document.getElementById('letterhead-notes-list');
  if (notesEl) {
    notesEl.innerHTML = '';
    (q.notes || []).forEach((n, i) => notesEl.innerHTML += `<div>${i + 1}. ${n}</div>`);
  }

  const scopeEl = document.getElementById('letterhead-scope-list');
  if (scopeEl) {
    scopeEl.innerHTML = '';
    (q.scope || []).forEach(s => scopeEl.innerHTML += `<div>&gt; ${s}</div>`);
  }

  const modal = document.getElementById('letterhead-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeLetterheadModal() {
  document.getElementById('letterhead-modal').classList.add('hidden');
}

function shareWhatsAppQuote(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;
  const subtotal = (q.items || []).reduce((s, it) => s + (it.amount || (it.qty * it.rate)), 0);
  const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
  const total = subtotal + gst;

  const itemsText = (q.items || []).map((it, i) => `${i + 1}. ${it.description} - ${it.qty} ${it.unit} @ Rs. ${it.rate} = Rs. ${formatINR(it.amount || (it.qty * it.rate))}`).join('\n');

  const msg = `*AJAY SHAH & ASSOCIATES (Civil Engineers & Home Builders)*\n*Er. Ajay H. Shah (B.E. Civil)* | +91 98246 66003\n\n*Quotation Ref:* ${q.refNo || q.id}\n*Date:* ${q.date}\n*To:* ${q.clientName}, ${q.companyName}\n*Location:* ${q.location}\n*Subject:* ${q.subject}\n\n*Civil Scope & BOQ:*\n${itemsText}\n\n*Subtotal:* Rs. ${formatINR(subtotal)}\n*GST (${q.gstRate}%):* Rs. ${formatINR(gst)}\n*TOTAL:* Rs. ${formatINR(total)}\n\n_In Words: ${numberToIndianWords(total)}_\n\n*Key Notes:*\n${(q.notes || []).map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\n_Ajay Shah & Associates &middot; 30 Years Home Building & Civil Engineering Legacy &middot; Vadodara_`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

// =========================================================================
// VENDORS MANAGEMENT
// =========================================================================

function renderVendorsList(category = 'All') {
  currentVendorFilter = category;
  const container = document.getElementById('portal-vendors-grid');
  if (!container) return;
  container.innerHTML = '';

  // Update filter pill UI
  document.querySelectorAll('.vendor-filter-pill').forEach(pill => {
    if (pill.getAttribute('data-category') === category) {
      pill.className = "vendor-filter-pill px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold whitespace-nowrap cursor-pointer";
    } else {
      pill.className = "vendor-filter-pill px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-medium whitespace-nowrap cursor-pointer";
    }
  });

  const filtered = category === 'All' 
    ? vendors 
    : vendors.filter(v => v.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
        No vendors found in '${category}'. Click <strong>+ Add Vendor</strong> to register one.
      </div>
    `;
    return;
  }

  filtered.forEach(v => {
    container.innerHTML += `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase font-semibold">
              ${v.category}
            </span>
            <div class="flex items-center gap-1">
              <button onclick="editVendorData('${v.id}')" title="Edit Vendor" class="p-1 text-slate-400 hover:text-blue-700 rounded cursor-pointer">
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="deleteVendor('${v.id}')" title="Delete Vendor" class="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer">
                <i data-lucide="trash" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <h4 class="font-bold text-slate-900 text-sm mt-2">${v.name}</h4>
          <div class="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
            <i data-lucide="user" class="w-3 h-3 text-slate-400"></i>
            <span>${v.contact || 'Direct Supply'}</span>
          </div>
          <div class="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
            <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
            <span>${v.city || 'Vadodara'}</span>
          </div>
          ${v.notes ? `<div class="text-[10px] text-slate-500 mt-1 italic">${v.notes}</div>` : ''}

          <div class="mt-3 p-2 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-xs">
            <div>
              <span class="text-slate-500 font-mono text-[10px] uppercase block">Dues</span>
              <span class="font-bold font-mono ${v.dues > 0 ? 'text-amber-700' : 'text-emerald-700'}">₹ ${formatINR(v.dues)}</span>
            </div>
            <button onclick="openUpdateDuesModal('${v.id}')" class="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-semibold cursor-pointer">
              Update Dues
            </button>
          </div>
        </div>

        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2">
          <a href="tel:${(v.phone || '').replace(/[^0-9+]/g, '')}" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded text-center flex items-center justify-center gap-1">
            <i data-lucide="phone" class="w-3 h-3"></i>
            <span>Call</span>
          </a>
          <a href="https://wa.me/${(v.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + (v.contact || v.name) + ', from Er. Ajay Shah (Ajay Shah & Associates).')}" target="_blank" class="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded text-center flex items-center justify-center gap-1">
            <i data-lucide="message-circle" class="w-3 h-3"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `;
  });

  if (window.lucide) window.lucide.createIcons();
}

function filterVendorsByCategory(cat) {
  renderVendorsList(cat);
}

function openAddVendorModal() {
  safeSetText('modal-vendor-title', "Add Material Vendor");
  safeSetVal('vedit-id', "");
  safeSetVal('vedit-name', "");
  safeSetVal('vedit-category', "Cement & RMC");
  safeSetVal('vedit-contact', "");
  safeSetVal('vedit-phone', "+91 ");
  safeSetVal('vedit-city', "Manjalpur / Makarpura, Vadodara");
  safeSetVal('vedit-dues', "0");
  safeSetVal('vedit-notes', "");
  const modal = document.getElementById('vendor-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function editVendorData(vendorId) {
  const v = vendors.find(x => x.id === vendorId);
  if (!v) return;

  safeSetText('modal-vendor-title', "Edit Vendor (" + v.name + ")");
  safeSetVal('vedit-id', v.id);
  safeSetVal('vedit-name', v.name || "");
  safeSetVal('vedit-category', v.category || "Cement & RMC");
  safeSetVal('vedit-contact', v.contact || "");
  safeSetVal('vedit-phone', v.phone || "+91 ");
  safeSetVal('vedit-city', v.city || "");
  safeSetVal('vedit-dues', v.dues || 0);
  safeSetVal('vedit-notes', v.notes || "");
  const modal = document.getElementById('vendor-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeVendorModal() {
  const modal = document.getElementById('vendor-editor-modal');
  if (modal) modal.classList.add('hidden');
}

function saveVendorModal(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const vId = safeGetVal('vedit-id');
  const vendorObj = {
    id: vId || ("V-" + Date.now()),
    name: safeGetVal('vedit-name').trim() || "Vendor",
    category: safeGetVal('vedit-category', 'Cement & RMC'),
    contact: safeGetVal('vedit-contact').trim() || "Contact Person",
    phone: safeGetVal('vedit-phone').trim() || "+91 98246 66003",
    city: safeGetVal('vedit-city').trim() || "Vadodara",
    dues: parseFloat(safeGetVal('vedit-dues', '0')) || 0,
    notes: safeGetVal('vedit-notes').trim()
  };

  if (vId) {
    const idx = vendors.findIndex(x => x.id === vId);
    if (idx !== -1) vendors[idx] = vendorObj;
    else vendors.unshift(vendorObj);
  } else {
    vendors.unshift(vendorObj);
  }

  savePortalData();
  renderVendorsList(currentVendorFilter);
  closeVendorModal();
}

function deleteVendor(vendorId) {
  const v = vendors.find(x => x.id === vendorId);
  if (!v) return;
  if (confirm(`Are you sure you want to remove vendor '${v.name}'?`)) {
    vendors = vendors.filter(x => x.id !== vendorId);
    savePortalData();
    renderVendorsList(currentVendorFilter);
  }
}

function openUpdateDuesModal(vendorId) {
  const v = vendors.find(x => x.id === vendorId);
  if (!v) return;
  safeSetVal('quick-dues-vendor-id', v.id);
  safeSetText('quick-dues-vendor-name', v.name);
  safeSetVal('quick-dues-amount', v.dues || 0);
  const modal = document.getElementById('dues-quick-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeQuickDuesModal() {
  const modal = document.getElementById('dues-quick-modal');
  if (modal) modal.classList.add('hidden');
}

function saveQuickDues(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const vId = safeGetVal('quick-dues-vendor-id');
  const newAmt = parseFloat(safeGetVal('quick-dues-amount', '0')) || 0;
  const v = vendors.find(x => x.id === vId);
  if (v) {
    v.dues = newAmt;
    savePortalData();
    renderVendorsList(currentVendorFilter);
  }
  closeQuickDuesModal();
}

// =========================================================================
// SITE TEAM & SITE ENGINEERS MANAGEMENT
// =========================================================================

function renderTeamList() {
  const container = document.getElementById('portal-team-grid');
  if (!container) return;
  container.innerHTML = '';

  team.forEach(t => {
    const initials = (t.name || 'AS').replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'AS';
    const statusColor = t.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-slate-600 bg-slate-50 border-slate-200';

    container.innerHTML += `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-colors">
        <div>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs shrink-0 font-serif">
                ${initials}
              </div>
              <div>
                <h4 class="font-bold text-slate-900 text-xs sm:text-sm leading-tight">${t.name}</h4>
                <div class="text-[11px] text-blue-800 font-semibold">${t.role}</div>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="editTeamData('${t.id}')" title="Edit Staff" class="p-1 text-slate-400 hover:text-blue-700 rounded cursor-pointer">
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="deleteTeam('${t.id}')" title="Delete Staff" class="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer">
                <i data-lucide="trash" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <div class="mt-3.5 text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div class="flex items-center gap-1.5">
              <i data-lucide="building" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span class="font-medium text-slate-800 truncate">${t.site}</span>
            </div>
            <div class="flex items-center gap-1.5 font-mono text-[11px]">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span>${t.phone}</span>
            </div>
            ${t.notes ? `<div class="text-[10px] text-slate-500 pt-1 border-t border-slate-200 italic">${t.notes}</div>` : ''}
          </div>
        </div>

        <div class="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-xs">
          <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusColor}">
            &bull; ${t.status || 'Active'}
          </span>
          <div class="flex items-center gap-2">
            <a href="tel:${(t.phone || '').replace(/[^0-9+]/g, '')}" class="text-blue-700 hover:underline font-semibold text-[11px] flex items-center gap-0.5">
              <i data-lucide="phone-call" class="w-3 h-3"></i>
              <span>Call</span>
            </a>
            <a href="https://wa.me/${(t.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + t.name + ', from Er. Ajay Shah.')}" target="_blank" class="text-emerald-700 hover:underline font-semibold text-[11px] flex items-center gap-0.5">
              <i data-lucide="message-circle" class="w-3 h-3"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    `;
  });

  if (window.lucide) window.lucide.createIcons();
}

function openAddTeamModal() {
  safeSetText('modal-team-title', "Add Site Staff / Engineer");
  safeSetVal('tedit-id', "");
  safeSetVal('tedit-name', "");
  safeSetVal('tedit-role', "Site Civil Engineer");
  safeSetVal('tedit-phone', "+91 ");
  safeSetVal('tedit-site', "Manjalpur Luxury Villa");
  safeSetVal('tedit-status', "Active");
  safeSetVal('tedit-notes', "");
  const modal = document.getElementById('team-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function editTeamData(staffId) {
  const t = team.find(x => x.id === staffId);
  if (!t) return;
  safeSetText('modal-team-title', "Edit Staff (" + t.name + ")");
  safeSetVal('tedit-id', t.id);
  safeSetVal('tedit-name', t.name || "");
  safeSetVal('tedit-role', t.role || "Site Civil Engineer");
  safeSetVal('tedit-phone', t.phone || "+91 ");
  safeSetVal('tedit-site', t.site || "");
  safeSetVal('tedit-status', t.status || "Active");
  safeSetVal('tedit-notes', t.notes || "");
  const modal = document.getElementById('team-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTeamModal() {
  const modal = document.getElementById('team-editor-modal');
  if (modal) modal.classList.add('hidden');
}

function saveTeamModal(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const tId = safeGetVal('tedit-id');
  const staffObj = {
    id: tId || ("T-" + Date.now()),
    name: safeGetVal('tedit-name').trim() || "Staff Member",
    role: safeGetVal('tedit-role', 'Site Civil Engineer'),
    phone: safeGetVal('tedit-phone').trim() || "+91 98246 66003",
    site: safeGetVal('tedit-site').trim() || "Manjalpur, Vadodara",
    status: safeGetVal('tedit-status', 'Active'),
    notes: safeGetVal('tedit-notes').trim()
  };

  if (tId) {
    const idx = team.findIndex(x => x.id === tId);
    if (idx !== -1) team[idx] = staffObj;
    else team.unshift(staffObj);
  } else {
    team.unshift(staffObj);
  }

  savePortalData();
  renderTeamList();
  closeTeamModal();
}

function deleteTeam(staffId) {
  const t = team.find(x => x.id === staffId);
  if (!t) return;
  if (confirm(`Are you sure you want to remove staff member '${t.name}'?`)) {
    team = team.filter(x => x.id !== staffId);
    savePortalData();
    renderTeamList();
  }
}

// =========================================================================
// PROJECTS & BUDGETS MANAGEMENT
// =========================================================================

function renderProjectsList() {
  const container = document.getElementById('portal-projects-grid');
  if (!container) return;
  container.innerHTML = '';

  projects.forEach(p => {
    const pending = (p.value || 0) - (p.received || 0);

    container.innerHTML += `
      <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-blue-300 transition-colors flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2">
            <div>
              <h4 class="font-bold text-slate-900 text-sm">${p.title}</h4>
              <div class="text-xs text-slate-500 mt-0.5">${p.type} &middot; <span class="text-slate-700 font-semibold">${p.location}</span></div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button onclick="editProjectData('${p.id}')" title="Edit Project" class="p-1 text-slate-400 hover:text-blue-700 rounded cursor-pointer">
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="deleteProject('${p.id}')" title="Delete Project" class="p-1 text-slate-400 hover:text-red-600 rounded cursor-pointer">
                <i data-lucide="trash" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-500">Progress:</span>
            <span class="font-bold text-blue-900">${p.progress}% Completed</span>
          </div>
          <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${p.progress}%"></div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-3 mt-3 border-t border-slate-100">
            <div>
              <div class="text-[10px] text-slate-400 uppercase">Contract Value</div>
              <div class="font-bold text-slate-900 text-sm">₹ ${formatINR(p.value)}</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase">Received R.A. Bills</div>
              <div class="font-bold text-emerald-700 text-sm">₹ ${formatINR(p.received)}</div>
            </div>
          </div>

          <div class="mt-2 p-2 bg-slate-50 rounded text-[11px] flex justify-between font-mono text-slate-600">
            <span>Pending Balance:</span>
            <span class="font-bold text-amber-800">₹ ${formatINR(pending)}</span>
          </div>
        </div>

        <div class="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Client: <strong class="text-slate-700">${p.client || 'Direct'}</strong></span>
          ${p.engineer ? `<span class="text-blue-700 font-medium">Engr: ${p.engineer}</span>` : ''}
        </div>
      </div>
    `;
  });

  if (window.lucide) window.lucide.createIcons();
}

function openAddProjectModal() {
  safeSetText('modal-project-title', "Add Construction Project");
  safeSetVal('pedit-id', "");
  safeSetVal('pedit-title', "");
  safeSetVal('pedit-type', "Residential Bungalow Construction");
  safeSetVal('pedit-client', "");
  safeSetVal('pedit-location', "Manjalpur, Vadodara");
  safeSetVal('pedit-progress', 0);
  safeSetVal('pedit-value', "");
  safeSetVal('pedit-received', 0);
  const modal = document.getElementById('project-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function editProjectData(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  safeSetText('modal-project-title', "Edit Project (" + p.title + ")");
  safeSetVal('pedit-id', p.id);
  safeSetVal('pedit-title', p.title || "");
  safeSetVal('pedit-type', p.type || "");
  safeSetVal('pedit-client', p.client || "");
  safeSetVal('pedit-location', p.location || "");
  safeSetVal('pedit-progress', p.progress || 0);
  safeSetVal('pedit-value', p.value || 0);
  safeSetVal('pedit-received', p.received || 0);
  const modal = document.getElementById('project-editor-modal');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-editor-modal');
  if (modal) modal.classList.add('hidden');
}

function saveProjectModal(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const pId = safeGetVal('pedit-id');
  const projectObj = {
    id: pId || ("P-" + Date.now()),
    title: safeGetVal('pedit-title').trim() || "Civil Project",
    type: safeGetVal('pedit-type', 'Residential Construction').trim(),
    client: safeGetVal('pedit-client').trim() || "Client",
    location: safeGetVal('pedit-location').trim() || "Manjalpur, Vadodara",
    progress: parseInt(safeGetVal('pedit-progress', '0')) || 0,
    value: parseFloat(safeGetVal('pedit-value', '0')) || 0,
    received: parseFloat(safeGetVal('pedit-received', '0')) || 0,
    engineer: "Er. Dhaval Patel"
  };

  if (pId) {
    const idx = projects.findIndex(x => x.id === pId);
    if (idx !== -1) projects[idx] = projectObj;
    else projects.unshift(projectObj);
  } else {
    projects.unshift(projectObj);
  }

  savePortalData();
  renderProjectsList();
  closeProjectModal();
}

function deleteProject(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  if (confirm(`Are you sure you want to remove project '${p.title}'?`)) {
    projects = projects.filter(x => x.id !== projectId);
    savePortalData();
    renderProjectsList();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Window global bindings for inline onclick handlers
window.openPortal = openPortal;
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.verifyPortalPin = verifyPortalPin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.logoutAdmin = logoutAdmin;
window.showPortalDashboard = showPortalDashboard;
window.closePortalDashboard = closePortalDashboard;
window.logoutPortal = logoutPortal;
window.switchPortalTab = switchPortalTab;

// Quotations
window.openCreateQuotationModal = openCreateQuotationModal;
window.closeQuotationEditorModal = closeQuotationEditorModal;
window.saveQuotationEditor = saveQuotationEditor;
window.recalcEditorTotal = recalcEditorTotal;
window.viewQuotationLetterhead = viewQuotationLetterhead;
window.closeLetterheadModal = closeLetterheadModal;
window.shareWhatsAppQuote = shareWhatsAppQuote;
window.duplicateQuotationData = duplicateQuotationData;
window.editQuotationData = editQuotationData;
window.deleteQuotationData = deleteQuotationData;
window.addQuotationItemRow = addQuotationItemRow;
window.removeQuotationItemRow = removeQuotationItemRow;
window.filterQuotations = filterQuotations;

// Vendors
window.openAddVendorModal = openAddVendorModal;
window.editVendorData = editVendorData;
window.closeVendorModal = closeVendorModal;
window.saveVendorModal = saveVendorModal;
window.deleteVendor = deleteVendor;
window.openUpdateDuesModal = openUpdateDuesModal;
window.closeQuickDuesModal = closeQuickDuesModal;
window.saveQuickDues = saveQuickDues;
window.filterVendorsByCategory = filterVendorsByCategory;

// Team
window.openAddTeamModal = openAddTeamModal;
window.editTeamData = editTeamData;
window.closeTeamModal = closeTeamModal;
window.saveTeamModal = saveTeamModal;
window.deleteTeam = deleteTeam;

// Projects
window.openAddProjectModal = openAddProjectModal;
window.editProjectData = editProjectData;
window.closeProjectModal = closeProjectModal;
window.saveProjectModal = saveProjectModal;
window.deleteProject = deleteProject;
