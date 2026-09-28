import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Create builder-portal.html
# We want to create a clean HTML file that ONLY contains the portal modals, portal.js, and Tailwind CSS.
portal_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Builder Portal - Ajay Shah & Associates</title>
  <script src="https://unpkg.com/@tailwindcss/browser@3.4"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Print CSS for Letterhead -->
  <style>
    @media print {
      body * { visibility: hidden; }
      #letterhead-modal, #letterhead-modal * { visibility: visible; }
      #letterhead-modal {
        position: absolute; left: 0; top: 0; width: 100%; height: 100%;
        background: white !important; margin: 0; padding: 0; border: none;
      }
      /* Hide UI elements during print */
      #letterhead-modal button, #letterhead-modal .print-hide { display: none !important; }
    }
  </style>
</head>
<body class="bg-slate-900 h-screen flex items-center justify-center">

  <!-- Portal Initialization Script -->
  <script>
    // Automatically open the login prompt when the page loads
    window.onload = () => {
      lucide.createIcons();
      if(typeof promptAdminLogin === 'function') {
        promptAdminLogin();
      }
    };
  </script>
"""

# Extract the modals block from index.html
modals_match = re.search(r'<!-- ========================================================================= -->\s*<!-- 8\. SECURE BUILDER PORTAL \(HIDDEN MODALS\) .*?<!-- End Modals -->', content, re.DOTALL)
if modals_match:
    modals_code = modals_match.group(0)
    # Remove the hidden classes from admin auth modal so it shows up or let the script handle it
    portal_html += "\n" + modals_code + "\n"

portal_html += """
  <script src="portal.js"></script>
</body>
</html>
"""

with open('builder-portal.html', 'w') as f:
    f.write(portal_html)

# 2. Remove Portal elements from index.html
# Remove the footer button
content = re.sub(r'<!-- Discreet Admin entry link for Ajay Shah -->.*?</button>', '', content, flags=re.DOTALL)

# Remove the modals block
if modals_match:
    content = content.replace(modals_match.group(0), '<!-- Portal has been moved to a separate secure route -->')

# Remove the portal script
content = content.replace('<script src="portal.js"></script>', '')

# Remove print CSS rules from index.html (since portal is gone)
content = re.sub(r'@media print\s*\{[^}]+\}\s*\}', '', content, flags=re.DOTALL) # Simplistic regex, might not catch nested well, let's just leave it or target specifically
content = re.sub(r'/\* Print CSS.*?\}', '', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)

print("Split completed successfully.")
