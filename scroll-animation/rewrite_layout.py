import re

with open('builder-portal.html', 'r') as f:
    content = f.read()

# We need to find the block from <div id="portal-dashboard-modal"... down to <div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">

# Since we know the exact lines (around 100 to 155), we can use regex to replace it.
pattern = r'<div id="portal-dashboard-modal" class="fixed inset-0 z-50 hidden flex flex-col bg-slate-100 no-print overflow-hidden">.*?<!-- Dashboard Body Area -->\s*<div class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">'

replacement = """<div id="portal-dashboard-modal" class="fixed inset-0 z-50 hidden flex flex-col md:flex-row bg-slate-50 no-print overflow-hidden">
    
    <!-- Left Sidebar (Desktop) -->
    <aside class="hidden md:flex w-[280px] flex-col bg-white border-r border-slate-200 shadow-sm shrink-0 h-full relative z-10">
      <div class="p-6 border-b border-slate-200 text-center">
        <div class="aspect-square rounded-2xl overflow-hidden mb-4 border-[3px] border-slate-50 shadow-sm mx-auto w-32 h-32">
          <img src="family_photo.jpg" alt="Er. Ajay H. Shah & Son" class="w-full h-full object-cover" />
        </div>
        <h2 class="text-[17px] font-serif font-black text-slate-900 leading-tight mb-1">Ajay Shah & Associates</h2>
        <div class="text-[10px] text-slate-500 font-mono mb-3">Er. Ajay H. Shah (B.E. Civil)</div>
        <span class="px-2.5 py-1 rounded text-[10px] font-mono bg-[#F5E6D3] text-[#8C6239] font-bold uppercase tracking-widest">Verified Session</span>
      </div>
      
      <div class="flex-1 overflow-y-auto p-4 space-y-1.5">
        <div class="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest pl-3 mb-3 mt-2">Portal Menu</div>
        <button onclick="switchPortalTab('quotations')" id="btn-tab-quotations" class="portal-nav-btn w-full text-left px-4 py-3 rounded-xl bg-[#C49A6C] text-white font-bold transition-all flex items-center gap-3 shadow-xs">
          <i data-lucide="file-text" class="w-4 h-4"></i> Quotations
        </button>
        <button onclick="switchPortalTab('vendors')" id="btn-tab-vendors" class="portal-nav-btn w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all flex items-center gap-3">
          <i data-lucide="truck" class="w-4 h-4"></i> Vendors & Materials
        </button>
        <button onclick="switchPortalTab('team')" id="btn-tab-team" class="portal-nav-btn w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all flex items-center gap-3">
          <i data-lucide="users" class="w-4 h-4"></i> Site Team
        </button>
        <button onclick="switchPortalTab('projects')" id="btn-tab-projects" class="portal-nav-btn w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all flex items-center gap-3">
          <i data-lucide="building" class="w-4 h-4"></i> Projects & Budgets
        </button>
      </div>

      <div class="p-4 border-t border-slate-200 bg-slate-50/50">
        <button onclick="logoutPortal()" class="w-full px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer">
          <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i> Lock & Exit Portal
        </button>
      </div>
    </aside>

    <!-- Mobile Header -->
    <header class="md:hidden bg-white border-b border-slate-200 shadow-xs shrink-0 flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
          <img src="family_photo.jpg" alt="Family" class="w-full h-full object-cover" />
        </div>
        <div>
          <div class="text-sm font-bold text-slate-900 leading-tight">Ajay Shah & Assoc.</div>
          <div class="text-[10px] text-slate-500 font-mono">Builder Portal</div>
        </div>
      </div>
      <button onclick="logoutPortal()" class="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-transparent">
        <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i>
      </button>
    </header>

    <!-- Mobile Tabs -->
    <div class="md:hidden bg-white border-b border-slate-200 px-3 py-2 flex gap-1.5 overflow-x-auto text-xs shrink-0 no-scrollbar">
      <button onclick="switchPortalTab('quotations')" id="mob-btn-tab-quotations" class="mob-portal-nav-btn px-3 py-2 rounded-lg bg-[#C49A6C] text-white font-bold whitespace-nowrap text-xs transition-all shadow-xs">Quotations</button>
      <button onclick="switchPortalTab('vendors')" id="mob-btn-tab-vendors" class="mob-portal-nav-btn px-3 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium whitespace-nowrap text-xs transition-all border border-slate-200">Vendors</button>
      <button onclick="switchPortalTab('team')" id="mob-btn-tab-team" class="mob-portal-nav-btn px-3 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium whitespace-nowrap text-xs transition-all border border-slate-200">Site Team</button>
      <button onclick="switchPortalTab('projects')" id="mob-btn-tab-projects" class="mob-portal-nav-btn px-3 py-2 rounded-lg bg-slate-50 text-slate-600 font-medium whitespace-nowrap text-xs transition-all border border-slate-200">Projects</button>
    </div>

    <!-- Dashboard Main Content Area -->
    <main class="flex-1 h-full overflow-y-auto bg-slate-50 relative">
      <div class="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto pb-32">"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('builder-portal.html', 'w') as f:
    f.write(new_content)

# We also need to fix portal.js to update the vertical tab styling instead of the border-b-2
with open('portal.js', 'r') as f:
    js_content = f.read()

# Currently portal.js does:
# btn.classList.add('text-[#C49A6C]', 'border-[#C49A6C]', 'font-bold');
# btn.classList.remove('text-slate-600', 'border-transparent', 'hover:text-slate-900');
# Let's replace that with the new active classes:
# bg-[#C49A6C] text-white font-bold shadow-xs
# And inactive: text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold

js_content = js_content.replace(
    "btn.classList.add('text-[#C49A6C]', 'border-[#C49A6C]', 'font-bold');",
    "btn.classList.add('bg-[#C49A6C]', 'text-white', 'font-bold', 'shadow-xs');"
)
js_content = js_content.replace(
    "btn.classList.remove('text-slate-600', 'border-transparent', 'hover:text-slate-900');",
    "btn.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900', 'font-semibold');"
)
js_content = js_content.replace(
    "btn.classList.remove('text-[#C49A6C]', 'border-[#C49A6C]', 'font-bold');",
    "btn.classList.remove('bg-[#C49A6C]', 'text-white', 'font-bold', 'shadow-xs');"
)
js_content = js_content.replace(
    "btn.classList.add('text-slate-600', 'border-transparent', 'hover:text-slate-900');",
    "btn.classList.add('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900', 'font-semibold');"
)

# Mobile styling changes
js_content = js_content.replace(
    "mobBtn.classList.add('bg-[#C49A6C]', 'text-white', 'font-bold');",
    "mobBtn.classList.add('bg-[#C49A6C]', 'text-white', 'font-bold', 'shadow-xs');\n        mobBtn.classList.remove('border', 'border-slate-200');"
)
js_content = js_content.replace(
    "mobBtn.classList.remove('bg-slate-100', 'text-slate-700', 'font-medium');",
    "mobBtn.classList.remove('bg-slate-50', 'text-slate-600', 'font-medium');"
)
js_content = js_content.replace(
    "mobBtn.classList.remove('bg-[#C49A6C]', 'text-white', 'font-bold');",
    "mobBtn.classList.remove('bg-[#C49A6C]', 'text-white', 'font-bold', 'shadow-xs');\n        mobBtn.classList.add('border', 'border-slate-200');"
)
js_content = js_content.replace(
    "mobBtn.classList.add('bg-slate-100', 'text-slate-700', 'font-medium');",
    "mobBtn.classList.add('bg-slate-50', 'text-slate-600', 'font-medium');"
)


with open('portal.js', 'w') as f:
    f.write(js_content)

print("Layout updated.")
