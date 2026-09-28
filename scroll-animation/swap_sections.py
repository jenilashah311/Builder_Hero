import re

with open('index.html', 'r') as f:
    content = f.read()

# Define boundaries
services_start = content.find('<!-- ========================================================================= -->\n  <!-- 5. SERVICES & CAPABILITIES')
services_end = content.find('  <!-- ========================================================================= -->\n  <!-- 6. SELECTED PROJECTS SHOWCASE')

projects_start = services_end
projects_end = content.find('  <!-- ========================================================================= -->\n  <!-- 7. OUR 4-STAGE HOME & COMMERCIAL BUILDING PROCESS')

if services_start != -1 and projects_end != -1:
    before = content[:services_start]
    services = content[services_start:services_end]
    projects = content[projects_start:projects_end]
    after = content[projects_end:]
    
    # Update the comment numbering to reflect the swap
    projects = projects.replace('<!-- 6. SELECTED PROJECTS SHOWCASE', '<!-- 5. SELECTED PROJECTS SHOWCASE')
    services = services.replace('<!-- 5. SERVICES & CAPABILITIES', '<!-- 6. SERVICES & CAPABILITIES')
    
    new_content = before + projects + services + after
    
    with open('index.html', 'w') as f:
        f.write(new_content)
    print("Successfully swapped sections.")
else:
    print("Could not find section boundaries.")
