const fs = require('fs');

function checkBalance(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let divStack = [];
    let state = 'normal'; // normal, tag, string, template, comment

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let j = 0;
        while (j < line.length) {
            const char = line[j];
            const nextChar = line[j+1];

            if (state === 'normal') {
                if (char === '<' && nextChar === 'd' && line.substring(j, j + 4) === '<div') {
                    divStack.push({ line: i + 1, type: 'div' });
                    j += 4;
                } else if (char === '<' && nextChar === '/' && line.substring(j, j + 6) === '</div>') {
                    if (divStack.length === 0 || divStack[divStack.length - 1].type !== 'div') {
                        console.log(`Extra </div> at line ${i + 1}`);
                    } else {
                        divStack.pop();
                    }
                    j += 6;
                } else if (char === '<' && nextChar === 'm' && line.substring(j, j + 5) === '<main') {
                    divStack.push({ line: i + 1, type: 'main' });
                    j += 5;
                } else if (char === '<' && nextChar === '/' && line.substring(j, j + 7) === '</main') {
                    if (divStack.length === 0 || divStack[divStack.length - 1].type !== 'main') {
                        console.log(`Extra </main> at line ${i + 1}`);
                    } else {
                        divStack.pop();
                    }
                    j += 7;
                } else {
                    j++;
                }
            } else {
                j++;
            }
        }
    }

    if (divStack.length > 0) {
        console.log('Unclosed tags:');
        divStack.forEach(tag => console.log(`${tag.type} at line ${tag.line}`));
    } else {
        console.log('Balanced!');
    }
}

checkBalance('c:\\Users\\ADMIN\\OneDrive\\Desktop\\su hakathon\\SU-Hackathon\\frontend\\src\\pages\\Dashboard.js');
