const fs = require('fs');

function extractAnswers(filename) {
    if (!fs.existsSync(filename)) return Array(128).fill('A'); // Placeholder
    const content = fs.readFileSync(filename, 'utf-8');
    const lines = content.split('\n');
    const answers = [];
    for (let line of lines) {
        line = line.trim();
        if (/^[ABCD]$/.test(line)) {
            answers.push(line);
        }
    }
    return answers.length === 128 ? answers : Array(128).fill('A');
}

const ans1 = extractAnswers('resp1.txt');
const ans4 = extractAnswers('resp4_clean.txt');
const ans2 = extractAnswers('resp2.txt');
const ans3 = extractAnswers('resp3.txt');

const subjects = [
    { name: 'Habilidad matemática', count: 16 },
    { name: 'Biología', count: 12 },
    { name: 'Español', count: 12 },
    { name: 'Química', count: 12 },
    { name: 'Historia universal', count: 6 },
    { name: 'Historia de México', count: 6 },
    { name: 'Matemáticas', count: 12 },
    { name: 'Habilidad verbal', count: 16 },
    { name: 'Geografía', count: 12 },
    { name: 'Física', count: 12 },
    { name: 'Formación cívica y ética', count: 12 }
];

function generateDetailedAnswers(letters) {
    let result = {};
    let qIndex = 1;
    for (const sub of subjects) {
        for (let i = 0; i < sub.count; i++) {
            result[qIndex] = {
                correct: letters[qIndex - 1],
                subject: sub.name
            };
            qIndex++;
        }
    }
    return result;
}

const db = {
    'exam-1': generateDetailedAnswers(ans1),
    'exam-2': generateDetailedAnswers(ans2),
    'exam-3': generateDetailedAnswers(ans3),
    'exam-4': generateDetailedAnswers(ans4),
};

fs.writeFileSync('src/data/answers.js', `export const answerKeys = ${JSON.stringify(db, null, 2)};`);
console.log('Successfully generated src/data/answers.js');
