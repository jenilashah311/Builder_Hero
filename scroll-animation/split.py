import re

with open('index.html', 'r') as f:
    lines = f.readlines()

portal_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Builder Portal - Ajay Shah & Associates</title>
  <script src="https://unpkg.com/@tailwindcss/browser@3.4"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @media print {
      body * { visibility: hidden; }
      #letterhead-modal, #letterhead-modal * { visibility: visible; }
      #letterhead-modal {
        position: absolute; left: 0; top: 0; width: 100%; height: 100%;
        background: white !important; margin: 0; padding: 0; border: none;
      }
      #letterhead-modal button, #letterhead-modal .print-hide { display: none !important; }
    }
  </style>
</head>
<body class="bg-slate-900 h-screen overflow-hidden">
"""

# The modals are from line 739 to 1686. We need them as 0-indexed: 738 to 1686
modals = "".join(lines[738:1686])

# Make sure the auth modal is visible by default in the new page
modals = modals.replace('id="portal-auth-modal" class="fixed inset-0 z-50 hidden', 'id="portal-auth-modal" class="fixed inset-0 z-50 flex')
modals = modals.replace('id="portal-auth-modal" class="fixed inset-0 z-50 flex', 'id="portal-auth-modal" class="fixed inset-0 z-50 flex') # just in case

portal_html += modals

portal_html += """
  <script src="portal.js"></script>
  <script>
    window.onload = () => {
      lucide.createIcons();
    };
  </script>
</body>
</html>
"""

with open('builder-portal.html', 'w') as f:
    f.write(portal_html)

# Now to clean up index.html
new_lines = []
skip = False

i = 0
while i < len(lines):
    line = lines[i]
    
    # Remove footer button:
    if '<!-- Discreet Admin entry link for Ajay Shah -->' in line:
        i += 6 # skip the button block
        continue
    
    # Remove modals:
    if i == 738:
        i = 1686 # skip all modals
        continue
        
    # Remove portal script:
    if 'src="/portal.js' in line:
        i += 1
        continue
        
    # Remove the togglePasswordVisibility and verifyPortalPin functions (lines 1697 to 1751)
    if 'function togglePasswordVisibility()' in line:
        i += 54 # skip all that js
        continue
        
    # Remove updateAdminModeUI and promptAdminLogin
    if 'function updateAdminModeUI()' in line:
        i += 25 # skip all that js
        continue
        
    # Remove 'updateAdminModeUI();' call
    if 'updateAdminModeUI();' in line:
        i += 1
        continue

    new_lines.append(line)
    i += 1

with open('index.html', 'w') as f:
    f.writelines(new_lines)

print("Split logic done.")
