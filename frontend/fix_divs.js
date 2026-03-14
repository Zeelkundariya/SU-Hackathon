const fs = require('fs');

function checkDivBalance(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let stack = [];
    let i = 0;
    while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') {
            // Check if it's self-closing
            let j = i + 4;
            let selfClosing = false;
            while (j < content.length && content[j] !== '>') {
                if (content[j] === '/' && content[j+1] === '>') {
                    selfClosing = true;
                    break;
                }
                j++;
            }
            if (!selfClosing) {
                // Find line number
                const line = content.substring(0, i).split('\n').length;
                stack.push({ type: 'div', line });
            }
            i = j;
        } else if (content.substring(i, i + 6) === '</div>') {
            if (stack.length === 0 || stack[stack.length - 1].type !== 'div') {
                const line = content.substring(0, i).split('\n').length;
                console.log(`Extra </div> at line ${line}`);
            } else {
                stack.pop();
            }
            i += 6;
        } else if (content.substring(i, i + 5) === '<main') {
            const line = content.substring(0, i).split('\n').length;
            stack.push({ type: 'main', line });
            i += 5;
        } else if (content.substring(i, i + 7) === '</main>') {
            if (stack.length === 0 || stack[stack.length - 1].type !== 'main') {
                const line = content.substring(0, i).split('\n').length;
                console.log(`Extra </main> at line ${line}`);
            } else {
                stack.pop();
            }
            i += 7;
        } else {
            i++;
        }
    }
    if (stack.length > 0) {
        console.log('Unclosed tags:');
        stack.forEach(tag => console.log(`${tag.type} at line ${tag.line}`));
    } else {
        console.log('Balanced!');
    }
}

checkDivBalance('c:\\Users\\ADMIN\\OneDrive\\Desktop\\su hakathon\\SU-Hackathon\\frontend\\src\\pages\\Dashboard.js');
