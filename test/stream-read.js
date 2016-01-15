'use strict';
var path = require('path');
var fs = require('fs');
var os = require('os');

var should = require('should');
var rl = require('../index.js');

var emptyFilePath = path.join(__dirname, 'file/empty.txt');
var fiveFilePath = path.join(__dirname, 'file/five.txt');
var fiveWindowsFilePath = path.join(__dirname, 'file/five_windows.txt');
var spFilePath = path.join(__dirname, 'file/sp.txt');
var errorPath = 'file/error';

var filePath = os.platform() === 'win32' ? fiveWindowsFilePath : fiveFilePath;

describe('stream case', function() {

    describe('line event', function() {
        before(function() {});

        it('should return null, read a empty file', function(done) {
            var liner = rl.readlineStream();
            fs.createReadStream(emptyFilePath)
                .pipe(liner)
                .on('readable', function() {
                    var line;
                    while (line = liner.read()) {
                        should.not.exist(line);
                    }
                })
                .on('end', done);
        });

        it('should each time return a line', function(done) {
            var liner = rl.readlineStream();
            var i = 0;
            fs.createReadStream(filePath)
                .pipe(liner)
                .on('readable', function() {
                    var line;
                    while (line = liner.read()) {
                        line.toString().should.equal(++i + '');
                    }
                })
                .on('end', done);
        });


    });
});
