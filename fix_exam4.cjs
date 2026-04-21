const fs = require('fs');

const content = fs.readFileSync('resp4.txt', 'utf-8');
const lines = content.split('\n').map(l => l.trim());

const answers = [];
let capture = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === 'Respuesta Correcta') {
        capture = true;
        continue;
    }
    if (capture) {
        if (/^[ABCD]$/.test(line)) {
            answers.push(line);
        } else if (line === 'Tu respuesta' || line === '') {
            capture = false;
        }
    }
}

console.log("Extracted exam 4 answers:", answers.length);

if (answers.length === 128) {
    fs.writeFileSync('resp4_clean.txt', answers.join('\n'));
    console.log("Saved to resp4_clean.txt");
} else {
    console.log(answers);
}
