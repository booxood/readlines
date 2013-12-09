var fs = require('fs');

function fd(){

};

function linesStrToArray(linesStr){
    if(linesStr === ''){
        return [];
    };
    if(linesStr.slice(-1) === '\n'){
        linesStr = linesStr.slice(0, linesStr.length - 1);
    };

    var lines = linesStr.split('\n');
    console.dir(lines);
    return lines.map(function(line){
        //return line[2, line.length-1] === '\r' ? line.slice(0, line.length - 1) : line;
        return line.slice(-1) === '\r' ? line.slice(0, -1) : line;
    });
};

fd.readlinesSync = function(filePath, option){
    var linesStr = fs.readFileSync(filePath, option).toString();
    return linesStrToArray(linesStr);
};

fd.readlines = function(filePath, option, callback){
    if(arguments.length === 2){
        callback = option;
        option = {};
    };

    fs.readFile(filePath, option, function(err, data){
        if(err){
            callback(err, null);
        };

        callback(null, linesStrToArray(data.toString()));
    });
};

module.exports = fd;
