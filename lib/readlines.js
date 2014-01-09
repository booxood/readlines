var fs = require('fs');
var BR = require('os').EOL;

function fd(){

};

function linesStrToArray(linesStr){
    if(linesStr === ''){
        return [];
    };
    var lines = linesStr.split(BR);
    return lines;
};

fd.readlinesSync = function(filePath, options){
    var linesStr = fs.readFileSync(filePath, options).toString();
    return linesStrToArray(linesStr);
};

fd.readlines = function(filePath, options, callback){
    if(arguments.length === 2){
        callback = options;
        options = null;
    };

    fs.readFile(filePath, options, function(err, data){
        if(err){
            callback(err, null);
        };

        callback(null, linesStrToArray(data.toString()));
    });
};

fd.readlineSync = function(filePath, options, line){
    if(arguments.length === 2){
        line = options;
        options = null;
    };

    var lines = fd.readlinesSync(filePath, options);

    return lines[line - 1] || null;
};

fd.readline = function(filePath, options, line, callback){
    if(arguments.length === 3){
        callback = line;
        line = options;
        options = null;
    }

    var frs = fs.createReadStream(filePath, options);

    var linesStr = '';

    frs.on('data', function(chunk){
        linesStr += chunk;
        if(linesStrToArray(linesStr).length > line){
            frs.emit('end');
        };
    });

    frs.on('end', function(){
        frs.emit('over');
    });
    //确保只会被执行一次
    frs.once('over', function(){
        var lines = linesStrToArray(linesStr);
        callback(null, lines[line - 1] || null);
    });

    frs.on('error', function(err){
        callback(err, null);
    });
}

module.exports = fd;
