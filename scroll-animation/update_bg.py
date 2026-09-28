import re

with open('builder-portal.html', 'r') as f:
    content = f.read()

# 1. Update body background
content = content.replace(
    '<body class="bg-slate-900 h-screen overflow-hidden">',
    '<body class="bg-slate-900 h-screen overflow-hidden bg-cover bg-center" style="background-image: url(\'family_bg.jpg\');">'
)

# 2. Update auth modal background
content = content.replace(
    'class="fixed inset-0 z-50 flex flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print"',
    'class="fixed inset-0 z-50 flex flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md no-print"'
)

# 3. Update dashboard modal background
content = content.replace(
    'class="fixed inset-0 z-50 hidden flex flex-col md:flex-row bg-slate-50 no-print overflow-hidden"',
    'class="fixed inset-0 z-50 hidden flex flex-col md:flex-row bg-slate-900/40 backdrop-blur-lg no-print overflow-hidden"'
)

# 4. Update Sidebar styling to be slightly translucent
content = content.replace(
    '<aside class="hidden md:flex w-[280px] flex-col bg-white border-r border-slate-200 shadow-sm shrink-0 h-full relative z-10">',
    '<aside class="hidden md:flex w-[280px] flex-col bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-xl shrink-0 h-full relative z-10">'
)

# 5. Update Mobile Header styling
content = content.replace(
    '<header class="md:hidden bg-white border-b border-slate-200 shadow-xs shrink-0 flex items-center justify-between px-4 py-3">',
    '<header class="md:hidden bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xs shrink-0 flex items-center justify-between px-4 py-3">'
)

# 6. Update Mobile Tabs styling
content = content.replace(
    '<div class="md:hidden bg-white border-b border-slate-200 px-3 py-2 flex gap-1.5 overflow-x-auto text-xs shrink-0 no-scrollbar">',
    '<div class="md:hidden bg-white/95 backdrop-blur-xl border-b border-white/20 px-3 py-2 flex gap-1.5 overflow-x-auto text-xs shrink-0 no-scrollbar">'
)

# 7. Update Main content area styling
content = content.replace(
    '<main class="flex-1 h-full overflow-y-auto bg-slate-50 relative">',
    '<main class="flex-1 h-full overflow-y-auto bg-slate-100/80 relative z-0">'
)

# 8. Update all image tags from family_photo.jpg to family_bg.jpg
content = content.replace('family_photo.jpg', 'family_bg.jpg')

with open('builder-portal.html', 'w') as f:
    f.write(content)

print("Background updated.")
