import re

with open('index.html', 'r') as f:
    index_content = f.read()

with open('builder-portal.html', 'r') as f:
    portal_content = f.read()

# Extract head from index.html
head_match = re.search(r'<head>(.*?)</head>', index_content, re.DOTALL)
if head_match:
    index_head = head_match.group(1)
    
    # We want to use the exact same head, but remove GSAP which is not needed
    index_head = re.sub(r'<!-- GSAP 3 & ScrollTrigger via CDN -->.*?<script src="[^"]*ScrollTrigger\.min\.js"></script>', '', index_head, flags=re.DOTALL)
    
    # Update title
    index_head = index_head.replace(
        '<title>Ajay Shah &amp; Associates — Engineers &amp; Contractors | Er. Ajay H. Shah (B.E. Civil)</title>',
        '<title>Builder Portal - Ajay Shah & Associates</title>'
    )
    
    # Now replace the head in builder-portal.html
    portal_content = re.sub(r'<head>.*?</head>', f'<head>{index_head}</head>', portal_content, flags=re.DOTALL)
    
    with open('builder-portal.html', 'w') as f:
        f.write(portal_content)
    print("Fixed head in builder-portal.html")
else:
    print("Could not find head in index.html")
