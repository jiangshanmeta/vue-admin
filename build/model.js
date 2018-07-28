var path = require("path");
var fs = require("fs");

function resolve(dir){
    return path.join(__dirname,'..','src/models/' + dir)
}

function str_supplant(str,obj){
    return str.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = obj[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
}

function initModel(){
    var modelName = process.argv[2] || 'template';
    if(!modelName.endsWith('Model')){
        modelName += 'Model';
    }

    var src = resolve("_template.js");
    var dst = resolve(modelName+'.js');

    let template = fs.readFileSync(src,"utf8");
    // template = str_supplant(template,{name:modelName});

    fs.writeFileSync(dst,template);
}

initModel();