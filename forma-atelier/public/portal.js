/**
 * Ajay Shah & Associates - Builder & Contractor Portal Management Module
 * Er. Ajay H. Shah (B.E. Civil) | +91 98246 66003 | ahshah05@gmail.com
 */

const DEFAULT_PIN = "66003";

// Initial Quotation from Dad's WhatsApp
const defaultQuotations = [
  {
    id: "QUO-2026-001",
    refNo: "ASA/QUO/2026/0919",
    date: "19 / 09 / 2026",
    clientName: "Kaushalbhai",
    companyName: "Jyoti Advance Metal Manufacturing Private Limited",
    location: "Por",
    subject: "Quotation of civil work as per drawings provided.",
    opening: "With reference to all the drawings given by you and as per our discussion, we are pleased to submit our quotation for the civil work of the industrial shed at Por.",
    status: "Sent",
    gstRate: 18,
    items: [
      {
        description: "Industrial shed civil work up to plaster.",
        qty: 12328,
        rate: 900,
        unit: "S. FT",
        amount: 11095200
      }
    ],
    notes: [
      "Depth of foundation is considered as 2.1 M for footing.",
      "Ground level is considered as 0 from road level.",
      "Aluminium, fabrication, electrical, plumbing and shutter work will be extra."
    ],
    scope: [
      "The rate is given for civil works up to plaster only.",
      "The rate excludes fabrication work, aluminium work, electrical work, plumbing work, shutter work, colour work, etc.",
      "Approximate estimate for fabricated shed, aluminium work, electrical work and plumbing work will be Rs. 1,000 per S. FT. (This will be worked out in detail after the final architectural drawings are provided.)"
    ]
  }
];

const defaultVendors = [
  { id: "V-1", name: "Kailash RMC & Concrete", category: "Cement & RMC", contact: "Dineshbhai Patel", phone: "+91 98250 11442", city: "Por GIDC", dues: 245000 },
  { id: "V-2", name: "Mahalaxmi Steel Traders (TMT 550D)", category: "TMT Steel", contact: "Kalpesh Shah", phone: "+91 98240 77319", city: "Makarpura GIDC", dues: 580000 },
  { id: "V-3", name: "Vishwakarma Heavy Fabrication & PEB", category: "Fabrication", contact: "Pravinbhai Mistry", phone: "+91 94263 88102", city: "Por Industrial Area", dues: 310000 },
  { id: "V-4", name: "Maruti Shuttering & Scaffolding", category: "Shuttering", contact: "Rambhai", phone: "+91 97129 44321", city: "Vadodara", dues: 95000 },
  { id: "V-5", name: "Narmada Coarse Sand & Kapchi", category: "Sand & Aggregate", contact: "Mukeshbhai", phone: "+91 99092 55180", city: "Karjan / Por", dues: 120000 },
  { id: "V-6", name: "Shreeji High-Tension Electricals", category: "Electrical & Plumbing", contact: "Bhavesh Parmar", phone: "+91 98255 66201", city: "Ranoli GIDC", dues: 45000 }
];

const defaultTeam = [
  { id: "T-1", name: "Dhaval Patel (B.E. Civil)", role: "Site Civil Engineer", phone: "+91 98791 22345", site: "Jyoti Advance Metal - Por", status: "Active" },
  { id: "T-2", name: "Rameshbhai Prajapati", role: "Head Site Supervisor", phone: "+91 94270 55123", site: "Jyoti Advance Metal - Por", status: "Active" },
  { id: "T-3", name: "Irfan Mansuri", role: "RCC & Shuttering Mukadam (22 Labours)", phone: "+91 99241 88910", site: "Jyoti Advance Metal - Por", status: "Active" },
  { id: "T-4", name: "Mukesh Baria", role: "Storekeeper & Material Inward", phone: "+91 97230 44512", site: "Por Central Yard", status: "Active" }
];

const defaultProjects = [
  { id: "P-1", title: "Jyoti Advance Metal Mfg Pvt Ltd", type: "Industrial Shed Civil Work", location: "Por, Vadodara", client: "Kaushalbhai", value: 13092336, received: 4500000, progress: 35 },
  { id: "P-2", title: "Shreeji Warehousing Logistics", type: "PEB Warehouse & Tremix", location: "Makarpura GIDC", client: "Jitubhai Patel", value: 8500000, received: 6800000, progress: 80 },
  { id: "P-3", title: "Alkapuri Commercial Development", type: "Heavy RCC Structure", location: "Alkapuri, Vadodara", client: "Sunil Shah", value: 21000000, received: 3500000, progress: 15 }
];

let quotations = JSON.parse(localStorage.getItem('asa_quotations')) || defaultQuotations;
let vendors = JSON.parse(localStorage.getItem('asa_vendors')) || defaultVendors;
let team = JSON.parse(localStorage.getItem('asa_team')) || defaultTeam;
let projects = JSON.parse(localStorage.getItem('asa_projects')) || defaultProjects;

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

// Authentication Check
function isPortalAuthenticated() {
  return sessionStorage.getItem('asa_portal_auth') === 'true';
}

function openPortal() {
  if (isPortalAuthenticated()) {
    showPortalDashboard();
  } else {
    showAuthModal();
  }
}

function showAuthModal() {
  document.getElementById('portal-auth-modal').classList.remove('hidden');
  document.getElementById('portal-pin-input').value = '';
  document.getElementById('auth-error-msg').classList.add('hidden');
  setTimeout(() => document.getElementById('portal-pin-input').focus(), 100);
}

function closeAuthModal() {
  document.getElementById('portal-auth-modal').classList.add('hidden');
}

function verifyPortalPin(e) {
  if (e) e.preventDefault();
  const enteredPin = document.getElementById('portal-pin-input').value.trim();
  if (enteredPin === DEFAULT_PIN || enteredPin === "98246" || enteredPin === "admin") {
    sessionStorage.setItem('asa_portal_auth', 'true');
    closeAuthModal();
    showPortalDashboard();
  } else {
    document.getElementById('auth-error-msg').classList.remove('hidden');
  }
}

function showPortalDashboard() {
  document.getElementById('portal-dashboard-modal').classList.remove('hidden');
  switchPortalTab('quotations');
  renderQuotationsList();
  renderVendorsList();
  renderTeamList();
  renderProjectsList();
  if (window.lucide) window.lucide.createIcons();
}

function closePortalDashboard() {
  document.getElementById('portal-dashboard-modal').classList.add('hidden');
}

function logoutPortal() {
  sessionStorage.removeItem('asa_portal_auth');
  closePortalDashboard();
}

function switchPortalTab(tabName) {
  document.querySelectorAll('.portal-tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.portal-nav-btn').forEach(btn => {
    btn.classList.remove('border-blue-600', 'text-blue-700', 'font-bold');
    btn.classList.add('border-transparent', 'text-slate-600');
  });

  const target = document.getElementById(`portal-${tabName}-tab`);
  const activeBtn = document.getElementById(`btn-tab-${tabName}`);
  if (target) target.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('border-blue-600', 'text-blue-700', 'font-bold');
    activeBtn.classList.remove('border-transparent', 'text-slate-600');
  }
  if (window.lucide) window.lucide.createIcons();
}

// Quotations Rendering
function renderQuotationsList() {
  const tbody = document.getElementById('portal-quotes-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  quotations.forEach(q => {
    const subtotal = q.items.reduce((s, it) => s + (Number(it.amount) || (it.qty * it.rate)), 0);
    const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
    const total = subtotal + gst;

    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-50 transition-colors border-b border-slate-100";
    tr.innerHTML = `
      <td class="py-3 px-3 font-mono font-semibold text-slate-800 text-xs">
        <div>${q.refNo || q.id}</div>
        <div class="text-[10px] text-slate-400 font-normal">${q.date}</div>
      </td>
      <td class="py-3 px-3 text-xs">
        <div class="font-bold text-slate-900">${q.clientName}</div>
        <div class="text-slate-500 text-[11px]">${q.companyName} &middot; ${q.location}</div>
      </td>
      <td class="py-3 px-3 text-xs text-right font-mono">
        <div>${q.items[0]?.qty.toLocaleString()} ${q.items[0]?.unit}</div>
        <div class="text-[10px] text-slate-400">@ ₹${q.items[0]?.rate}</div>
      </td>
      <td class="py-3 px-3 text-xs text-right font-mono">
        <div class="font-bold text-blue-900">₹ ${formatINR(total)}</div>
        <div class="text-[10px] text-slate-400">GST: ₹${formatINR(gst)}</div>
      </td>
      <td class="py-3 px-3 text-center">
        <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          ${q.status}
        </span>
      </td>
      <td class="py-3 px-3 text-right">
        <div class="flex items-center justify-end gap-1">
          <button onclick="viewQuotationLetterhead('${q.id}')" title="Print Official Letterhead" class="p-1.5 text-blue-700 hover:bg-blue-50 rounded">
            <i data-lucide="printer" class="w-4 h-4"></i>
          </button>
          <button onclick="shareWhatsAppQuote('${q.id}')" title="Send WhatsApp" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
          </button>
          <button onclick="editQuotationData('${q.id}')" title="Edit" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded">
            <i data-lucide="edit-3" class="w-4 h-4"></i>
          </button>
          <button onclick="duplicateQuotationData('${q.id}')" title="Duplicate" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded">
            <i data-lucide="copy" class="w-4 h-4"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function viewQuotationLetterhead(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;

  document.getElementById('letterhead-client').innerText = q.clientName + ',';
  document.getElementById('letterhead-company').innerText = q.companyName + ',';
  document.getElementById('letterhead-location').innerText = q.location + '.';
  document.getElementById('letterhead-date').innerText = q.date;
  document.getElementById('letterhead-subject').innerText = q.subject;
  document.getElementById('letterhead-opening').innerText = q.opening || "With reference to all the drawings given by you and as per our discussion, we are pleased to submit our quotation.";

  const itemsBody = document.getElementById('letterhead-items-tbody');
  itemsBody.innerHTML = '';
  let subtotal = 0;

  q.items.forEach((it, idx) => {
    const amt = it.amount || (it.qty * it.rate);
    subtotal += amt;
    itemsBody.innerHTML += `
      <tr class="divide-x divide-slate-600">
        <td class="py-2 px-3 text-center font-mono">${idx + 1}</td>
        <td class="py-2 px-3 font-medium">${it.description}</td>
        <td class="py-2 px-3 text-right font-mono">${Number(it.qty).toLocaleString()}</td>
        <td class="py-2 px-3 text-right font-mono">${Number(it.rate).toLocaleString()}</td>
        <td class="py-2 px-3 text-center font-mono">${it.unit}</td>
        <td class="py-2 px-3 text-right font-mono font-bold">${formatINR(amt)}</td>
      </tr>
    `;
  });

  const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
  const total = subtotal + gst;

  document.getElementById('letterhead-subtotal').innerText = '₹ ' + formatINR(subtotal);
  document.getElementById('letterhead-gst-rate').innerText = `GST @ ${q.gstRate}%:`;
  document.getElementById('letterhead-gst-amount').innerText = '₹ ' + formatINR(gst);
  document.getElementById('letterhead-grand-total').innerText = '₹ ' + formatINR(total);
  document.getElementById('letterhead-words').innerText = numberToIndianWords(total);

  const notesEl = document.getElementById('letterhead-notes-list');
  notesEl.innerHTML = '';
  (q.notes || []).forEach((n, i) => notesEl.innerHTML += `<div>${i + 1}. ${n}</div>`);

  const scopeEl = document.getElementById('letterhead-scope-list');
  scopeEl.innerHTML = '';
  (q.scope || []).forEach(s => scopeEl.innerHTML += `<div>&gt; ${s}</div>`);

  document.getElementById('letterhead-modal').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeLetterheadModal() {
  document.getElementById('letterhead-modal').classList.add('hidden');
}

function shareWhatsAppQuote(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;
  const subtotal = q.items.reduce((s, it) => s + (it.amount || (it.qty * it.rate)), 0);
  const gst = Math.round(subtotal * (q.gstRate || 0) / 100);
  const total = subtotal + gst;

  const msg = `*AJAY SHAH & ASSOCIATES (Engineers & Contractors)*\n*Er. Ajay H. Shah (B.E. Civil)* | +91 98246 66003\n\n*Quotation Ref:* ${q.refNo || q.id}\n*Date:* ${q.date}\n*To:* ${q.clientName}, ${q.companyName}\n*Location:* ${q.location}\n*Subject:* ${q.subject}\n\n*Civil Scope:* ${q.items[0]?.description}\n*Quantity:* ${q.items[0]?.qty} ${q.items[0]?.unit} @ Rs. ${q.items[0]?.rate}\n*Subtotal:* Rs. ${formatINR(subtotal)}\n*GST (${q.gstRate}%):* Rs. ${formatINR(gst)}\n*TOTAL:* Rs. ${formatINR(total)}\n\n_In Words: ${numberToIndianWords(total)}_`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
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

function editQuotationData(quoteId) {
  const q = quotations.find(x => x.id === quoteId);
  if (!q) return;

  document.getElementById('modal-editor-title').innerText = "Edit Quotation (" + (q.refNo || q.id) + ")";
  document.getElementById('qedit-id').value = q.id;
  document.getElementById('qedit-client').value = q.clientName;
  document.getElementById('qedit-company').value = q.companyName;
  document.getElementById('qedit-location').value = q.location;
  document.getElementById('qedit-subject').value = q.subject;
  document.getElementById('qedit-date').value = q.date;
  document.getElementById('qedit-desc').value = q.items[0]?.description || "";
  document.getElementById('qedit-qty').value = q.items[0]?.qty || 0;
  document.getElementById('qedit-rate').value = q.items[0]?.rate || 0;
  document.getElementById('qedit-unit').value = q.items[0]?.unit || "S. FT";
  document.getElementById('qedit-gst').value = q.gstRate || 18;

  recalcEditorTotal();
  document.getElementById('quotation-editor-modal').classList.remove('hidden');
}

function openCreateQuotationModal() {
  document.getElementById('modal-editor-title').innerText = "Create New Quotation";
  document.getElementById('qedit-id').value = "";
  document.getElementById('qedit-client').value = "";
  document.getElementById('qedit-company').value = "";
  document.getElementById('qedit-location').value = "";
  document.getElementById('qedit-subject').value = "Quotation of civil work as per drawings provided.";
  
  const d = new Date();
  document.getElementById('qedit-date').value = `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`;
  document.getElementById('qedit-desc').value = "Industrial shed civil work up to plaster.";
  document.getElementById('qedit-qty').value = 10000;
  document.getElementById('qedit-rate').value = 900;
  document.getElementById('qedit-unit').value = "S. FT";
  document.getElementById('qedit-gst').value = 18;

  recalcEditorTotal();
  document.getElementById('quotation-editor-modal').classList.remove('hidden');
}

function closeQuotationEditorModal() {
  document.getElementById('quotation-editor-modal').classList.add('hidden');
}

function recalcEditorTotal() {
  const qty = parseFloat(document.getElementById('qedit-qty').value) || 0;
  const rate = parseFloat(document.getElementById('qedit-rate').value) || 0;
  const sub = qty * rate;
  const gstRate = parseFloat(document.getElementById('qedit-gst').value) || 0;
  const gst = Math.round(sub * gstRate / 100);
  const tot = sub + gst;

  document.getElementById('qedit-subtotal-disp').innerText = '₹ ' + formatINR(sub);
  document.getElementById('qedit-gst-disp').innerText = '₹ ' + formatINR(gst);
  document.getElementById('qedit-total-disp').innerText = '₹ ' + formatINR(tot);
}

function saveQuotationEditor(e) {
  e.preventDefault();
  const qId = document.getElementById('qedit-id').value;
  const qty = parseFloat(document.getElementById('qedit-qty').value) || 0;
  const rate = parseFloat(document.getElementById('qedit-rate').value) || 0;

  const quoteObj = {
    id: qId || ("QUO-" + Date.now()),
    refNo: qId ? (quotations.find(x => x.id === qId)?.refNo || `ASA/QUO/2026/0919`) : `ASA/QUO/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: document.getElementById('qedit-client').value.trim(),
    companyName: document.getElementById('qedit-company').value.trim(),
    location: document.getElementById('qedit-location').value.trim(),
    subject: document.getElementById('qedit-subject').value.trim(),
    date: document.getElementById('qedit-date').value.trim(),
    gstRate: parseFloat(document.getElementById('qedit-gst').value) || 18,
    status: "Sent",
    opening: "With reference to all the drawings given by you and as per our discussion, we are pleased to submit our quotation for the civil work.",
    items: [
      {
        description: document.getElementById('qedit-desc').value.trim(),
        qty: qty,
        rate: rate,
        unit: document.getElementById('qedit-unit').value,
        amount: qty * rate
      }
    ],
    notes: [
      "Depth of foundation is considered as 2.1 M for footing.",
      "Ground level is considered as 0 from road level.",
      "Aluminium, fabrication, electrical, plumbing and shutter work will be extra."
    ],
    scope: [
      "The rate is given for civil works up to plaster only.",
      "The rate excludes fabrication work, aluminium work, electrical work, plumbing work, shutter work, colour work, etc.",
      "Approximate estimate for fabricated shed, aluminium work, electrical work and plumbing work will be Rs. 1,000 per S. FT."
    ]
  };

  if (qId) {
    const idx = quotations.findIndex(x => x.id === qId);
    if (idx !== -1) quotations[idx] = quoteObj;
  } else {
    quotations.unshift(quoteObj);
  }

  savePortalData();
  renderQuotationsList();
  closeQuotationEditorModal();
  viewQuotationLetterhead(quoteObj.id);
}

// Vendors Rendering
function renderVendorsList() {
  const container = document.getElementById('portal-vendors-grid');
  if (!container) return;
  container.innerHTML = '';

  vendors.forEach(v => {
    container.innerHTML += `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit uppercase font-semibold">
            ${v.category}
          </div>
          <h4 class="font-bold text-slate-900 text-sm mt-2">${v.name}</h4>
          <div class="text-xs text-slate-600 mt-0.5">Contact: ${v.contact}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">${v.city}</div>
          <div class="mt-3 p-2 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-xs">
            <span class="text-slate-500 font-mono text-[10px] uppercase">Dues</span>
            <span class="font-bold font-mono text-amber-700">₹ ${formatINR(v.dues)}</span>
          </div>
        </div>
        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2">
          <a href="tel:${v.phone.replace(/[^0-9+]/g, '')}" class="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded text-center">
            Call
          </a>
          <a href="https://wa.me/${v.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello ' + v.contact + ', from Er. Ajay Shah (Ajay Shah & Associates).')}" target="_blank" class="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded text-center">
            WhatsApp
          </a>
        </div>
      </div>
    `;
  });
}

function openAddVendorModal() {
  const name = prompt("Vendor Company Name:");
  if (!name) return;
  const cat = prompt("Category (Cement & RMC / TMT Steel / Fabrication / Shuttering / Sand & Aggregate):", "Cement & RMC");
  const phone = prompt("Phone Number (+91...):", "+91 ");
  const city = prompt("Location / GIDC:", "Por GIDC");
  vendors.unshift({
    id: "V-" + Date.now(),
    name: name,
    category: cat || "Civil Materials",
    contact: "Contact Person",
    phone: phone || "+91 98246 66003",
    city: city || "Vadodara",
    dues: 0
  });
  savePortalData();
  renderVendorsList();
}

// Team Rendering
function renderTeamList() {
  const container = document.getElementById('portal-team-grid');
  if (!container) return;
  container.innerHTML = '';

  team.forEach(t => {
    container.innerHTML += `
      <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs">
            ${t.name.charAt(0)}
          </div>
          <div>
            <div class="font-bold text-slate-900 text-xs">${t.name}</div>
            <div class="text-[11px] text-blue-700 font-semibold">${t.role}</div>
          </div>
        </div>
        <div class="mt-3 text-[11px] text-slate-600 space-y-0.5">
          <div>Site: <span class="font-medium text-slate-800">${t.site}</span></div>
          <div>Phone: <span class="font-mono">${t.phone}</span></div>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono">
          <span class="text-emerald-600 font-bold">&bull; ${t.status}</span>
          <a href="tel:${t.phone}" class="text-blue-700 hover:underline">Call &rarr;</a>
        </div>
      </div>
    `;
  });
}

// Projects Rendering
function renderProjectsList() {
  const container = document.getElementById('portal-projects-grid');
  if (!container) return;
  container.innerHTML = '';

  projects.forEach(p => {
    container.innerHTML += `
      <div class="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-900 text-sm">${p.title}</h4>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">${p.progress}% Done</span>
        </div>
        <div class="text-xs text-slate-500">${p.type} &middot; ${p.location} (Client: ${p.client})</div>
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div class="bg-blue-600 h-2 rounded-full" style="width: ${p.progress}%"></div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-100">
          <div>
            <div class="text-[10px] text-slate-400 uppercase">Contract Value</div>
            <div class="font-bold text-slate-900">₹ ${formatINR(p.value)}</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 uppercase">Received R.A. Bills</div>
            <div class="font-bold text-emerald-700">₹ ${formatINR(p.received)}</div>
          </div>
        </div>
      </div>
    `;
  });
}

window.openPortal = openPortal;
window.closeAuthModal = closeAuthModal;
window.verifyPortalPin = verifyPortalPin;
window.closePortalDashboard = closePortalDashboard;
window.logoutPortal = logoutPortal;
window.switchPortalTab = switchPortalTab;
window.openCreateQuotationModal = openCreateQuotationModal;
window.closeQuotationEditorModal = closeQuotationEditorModal;
window.saveQuotationEditor = saveQuotationEditor;
window.recalcEditorTotal = recalcEditorTotal;
window.viewQuotationLetterhead = viewQuotationLetterhead;
window.closeLetterheadModal = closeLetterheadModal;
window.shareWhatsAppQuote = shareWhatsAppQuote;
window.duplicateQuotationData = duplicateQuotationData;
window.editQuotationData = editQuotationData;
window.openAddVendorModal = openAddVendorModal;
