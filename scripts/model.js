var path = require("path");
var fs = require("fs");

function resolve(dir){
    return path.join(__dirname,'..','src/models/' + dir)
}


function initModel(){
    var modelName = process.argv[2] || 'template';
    if(!modelName.endsWith('Model')){
        modelName += 'Model';
    }

    var src = resolve("_template.js");
    var dst = resolve(modelName+'.js');

    let template = fs.readFileSync(src,"utf8");

    fs.writeFileSync(dst,template);
}

initModel();