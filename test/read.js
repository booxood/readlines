'use strict'
var path = require('path');

var should = require('should');
var fd = require('../index.js');

var nullFilePath = path.join(__dirname, 'file/empty.txt');
var fiveFilePath = path.join(__dirname, 'file/five.txt');
var fiveWindowsFilePath = path.join(__dirname, 'file/five_windows.txt');
var spFilePath = path.join(__dirname, 'file/sp.txt');

describe('sync case', function(){

    describe('sync read file line as array', function(){
        before(function(){
        });

        it('should return null array, read a empty file', function(){
            var lines = fd.readlinesSync(nullFilePath);
            lines.should.be.an.instanceof(Array).and.have.lengthOf(0);
        });

        it('should return array of length equal 5, read five.txt', function(){
            var lines = fd.readlinesSync(fiveFilePath);
            lines.should.be.an.instanceof(Array).and.have.lengthOf(5);
            lines[4].should.equal('5');
        });

        it('should return array of length equal 5, read five_windows.txt', function(){
            var lines = fd.readlinesSync(fiveWindowsFilePath);
            lines.should.be.an.instanceof(Array).and.have.lengthOf(5);
            lines[4].should.equal('5');
        });

        it('should return array of length equal 1, read sp.txt', function(){
            var lines = fd.readlinesSync(spFilePath);
            lines.should.be.an.instanceof(Array).and.have.lengthOf(1);
        });

    });

    describe('sync read a line', function(){
        it('should return 3, read the 3 line', function(){
            var line = fd.readlineSync(fiveFilePath, 3);
            line.should.equal('3');
        });

        it('should return null, read the -1 line', function(){
            var line = fd.readlineSync(fiveFilePath, -1);
            should.strictEqual(null, line);
        });
    });
});

describe('async case', function(){

    describe('async read file line as array', function(){
        before(function(done){
            done();
        });

        it('should return null array, read a empty file', function(done){
            fd.readlines(nullFilePath, function(err, lines){
                lines.should.be.an.instanceof(Array).and.have.lengthOf(0);
                done();
            });
        });

        it('should return array of length equal 5, read five.txt', function(done){
            fd.readlines(fiveFilePath, function(err, lines){
                lines.should.be.an.instanceof(Array).and.have.lengthOf(5);
                lines[4].should.equal('5');
                done();
            });
        });
    });

    describe('async read a line', function(){
        it('should return 3, read the 3 line', function(done){
            fd.readline(fiveFilePath, 3, function(err, line){
                should.not.exist(err);
                line.should.equal('3');
                done();
            });
        });

        it('should return null, read the 6 line', function(done){
            fd.readline(fiveFilePath, 6, function(err, line){
                should.not.exist(err);
                console.log(line);
                should.strictEqual(null, line);
                done();
            });
        });
    });

});
