const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ADMIN\\OneDrive\\Desktop\\su hakathon\\SU-Hackathon\\frontend\\src\\pages\\Dashboard.js', 'utf8');

function checkTags(str) {
    let stack = [];
    const tags = ['div', 'main', 'header', 'nav', 'ul', 'li', 'button', 'span', 'h1', 'h2', 'h3', 'h4', 'section', 'footer', 'select', 'option', 'svg', 'path', 'AreaChart', 'Area', 'BarChart', 'Bar', 'XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'ResponsiveContainer'];
    
    // Simple regex to find <tag and </tag
    const regex = /<\/?([a-zA-Z0-9]+)(\s|>)/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
        const fullTag = match[0];
        const tagName = match[1];
        if (fullTag.startsWith('</')) {
            if (stack.length === 0) {
                console.log(`Extra closing tag: </${tagName}> at index ${match.index}`);
            } else {
                const last = stack.pop();
                if (last.name !== tagName) {
                    // Ignore some common mismatches if necessary, but for now log them
                    // React components might be different, but let's see.
                    if (['div', 'main', 'span', 'button', 'ul', 'li'].includes(tagName)) {
                        console.log(`Mismatch: <${last.name}> closed by </${tagName}> at index ${match.index}`);
                    }
                }
            }
        } else if (!fullTag.endsWith('/>')) {
            // Check if it's a self-closing tag like <img ... /> or <br />
            // Actually, in JSX, many things can be self-closing.
            // Let's refine the regex to catch />
            const tagContent = str.substring(match.index, str.indexOf('>', match.index) + 1);
            if (!tagContent.endsWith('/>') && !['input', 'img', 'br', 'hr'].includes(tagName)) {
                stack.push({ name: tagName, index: match.index });
            }
        }
    }
    
    if (stack.length > 0) {
        console.log('Unclosed tags:');
        stack.forEach(t => {
            const line = str.substring(0, t.index).split('\n').length;
            console.log(`<${t.name}> at line ${line}`);
        });
    } else {
        console.log('Balanced!');
    }
}

checkTags(content);
