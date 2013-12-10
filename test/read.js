'use strict'
var path = require('path');

var should = require('should');
var fd = require('../index.js');

var nullFilePath = path.join(__dirname, 'file/empty.txt');
var fiveFilePath = path.join(__dirname, 'file/five.txt');

describe('sync read file into array',function(){
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
});

describe('async read file into array',function(){
    before(function(done){
        done();
    });

    it('should return null array, read a empty file', function(done){
        fd.readlines(nullFilePath,function(err, lines){
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


