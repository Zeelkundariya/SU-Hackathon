const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\ADMIN\\OneDrive\\Desktop\\su hakathon\\SU-Hackathon\\frontend\\src\\pages\\Dashboard.js', 'utf8');

function checkBalance(str) {
    let braces = 0;
    let parens = 0;
    let mainOpen = false;
    let mainClosed = false;
    let divs = 0;

    const lines = str.split('\n');
    lines.forEach((line, i) => {
        const lineNum = i + 1;
        
        let lineBraces = 0;
        let lineParens = 0;
        let lineDivs = 0;

        for (let char of line) {
            if (char === '{') { braces++; lineBraces++; }
            if (char === '}') { braces--; lineBraces--; }
            if (char === '(') { parens++; lineParens++; }
            if (char === ')') { parens--; lineParens--; }
        }
        
        if (line.includes('<main')) { divs++; lineDivs++; }
        if (line.includes('</main')) { divs--; lineDivs--; }
        
        const openDivs = (line.match(/<div/g) || []).length;
        const closeDivs = (line.match(/<\/div/g) || []).length;
        divs += openDivs - closeDivs;
        lineDivs += openDivs - closeDivs;

        if (lineNum >= 1600 && lineNum <= 1800) {
            console.log(`L${lineNum}: b:${braces}(${lineBraces}) p:${parens}(${lineParens}) d:${divs}(${lineDivs}) | ${line.trim()}`);
        }
    });

    console.log(`Final Balance: braces=${braces}, parens=${parens}, divs=${divs}`);
}

checkBalance(content);
