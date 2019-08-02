const fs = require('fs');
const path = require('path');
const dirs = [
    'Editors',
    'FilterOperators',
    'Filters',
    'Labels',
    'CollectionOperators',
    'DocumentOperators',
    'Views',
];

function resolve (...args) {
    return path.join(__dirname, '..', ...args);
}

function initModel () {
    var fileName = process.argv[2] || 'template';
    if (!fileName.endsWith('Model')) {
        fileName += 'Model';
    }

    const modelName = fileName.slice(0, -5);

    fs.writeFileSync(resolve(`src/models/${fileName}.js`), fs.readFileSync(resolve('scripts/_template.js'), 'utf8'));

    dirs.forEach((dir) => {
        fs.mkdirSync(resolve(`src/components/${modelName}/${dir}`), {
            recursive: true,
        });
        // .gitkeep 传空目录
        fs.writeFileSync(resolve(`src/components/${modelName}/${dir}/.gitkeep`), '');
    });
}

initModel();
