const fs = require('fs');

function checkDivBalance(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let stack = [];
    let i = 0;
    while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') {
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
                const line = content.substring(0, i).split('\n').length;
                stack.push({ type: 'div', line });
            }
            i = j;
        } else if (content.substring(i, i + 6) === '</div>') {
            const line = content.substring(0, i).split('\n').length;
            if (stack.length === 0) {
                console.log(`Extra </div> at line ${line} (Stack empty)`);
            } else if (stack[stack.length - 1].type !== 'div') {
                console.log(`Extra </div> at line ${line} (Top is ${stack[stack.length - 1].type} from line ${stack[stack.length - 1].line})`);
            } else {
                stack.pop();
            }
            i += 6;
        } else if (content.substring(i, i + 5) === '<main') {
            const line = content.substring(0, i).split('\n').length;
            stack.push({ type: 'main', line });
            i += 5;
        } else if (content.substring(i, i + 7) === '</main>') {
            const line = content.substring(0, i).split('\n').length;
            if (stack.length === 0 || stack[stack.length - 1].type !== 'main') {
                console.log(`Extra </main> at line ${line}`);
            } else {
                stack.pop();
            }
            i += 7;
        } else {
            i++;
        }
    }
}

checkDivBalance('c:\\Users\\ADMIN\\OneDrive\\Desktop\\su hakathon\\SU-Hackathon\\frontend\\src\\pages\\Dashboard.js');
