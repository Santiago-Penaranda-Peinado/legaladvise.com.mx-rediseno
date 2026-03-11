const fs = require('fs');
const path = 'd:\\WDE diseños\\paginas web\\legaladvise.com.mx\\site\\legaladvise.com.mx-rediseno\\src\\scss\\sections\\_contacto.scss';
let text = fs.readFileSync(path, 'utf8');

const patternStr = '\\\\.oficinas__grid[\\\\s\\\\S]*?(?=\\\\.office-card\\\\s*\\\\{)';
const pattern = new RegExp(patternStr);

const replacement = .oficinas__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;

    .office-card {
        width: calc(33.333% - 16px);
    }

    @media (max-width: \\-desktop) {
        .office-card {
            width: calc(50% - 12px);
        }
    }

    @media (max-width: \\-mobile) {
        .office-card {
            width: 100%;
        }
    }
}

;
text = text.replace(pattern, replacement.replace(/\\\\\\$/g, 'd:\WDE diseños\paginas web\legaladvise.com.mx\site\legaladvise.com.mx-rediseno'));
fs.writeFileSync(path, text, 'utf8');
console.log('Replaced grid with flexbox');
