import re

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    id_str = match.group(1)
    return f'id: "{id_str}",\n                        label: {match.group(2)},\n                        internalDoc: "doc_{id_str}.md",'

# Regex to find id, label, and mainLink.
new_content = re.sub(
    r'id:\s*"([^"]+)",\s*\n\s*label:\s*([^,]+),\s*\n\s*mainLink:\s*\{[^}]+\},',
    replacer,
    content
)

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated data.js")
