'use strict'
var should = require('should');
var fd = require('../index.js');

describe('sync read file into array',function(){
    before(function(){
    });

    it('should return null array, read a empty file', function(){
        var filePath = './file/empty.txt';
        var lines = fd.readlinesSync(filePath);
        lines.should.be.an.instanceof(Array).and.have.lengthOf(0);
    });

    it('should return array of length equal 5, read five.txt', function(){
        var filePath = './file/five.txt';
        var lines = fd.readlinesSync(filePath);
        lines.should.be.an.instanceof(Array).and.have.lengthOf(5);
        lines[4].should.equal('5');
    });
});

describe('async read file into array',function(){
    before(function(done){
        done();
    });

    it('should return null array, read a empty file', function(done){
        var filePath = './file/empty.txt';
        fd.readlines(filePath,function(err, lines){
            lines.should.be.an.instanceof(Array).and.have.lengthOf(0);
            done();
        });
    });

    it('should return array of length equal 5, read five.txt', function(done){
        var filePath = './file/five.txt';
        fd.readlines(filePath, function(err, lines){
            lines.should.be.an.instanceof(Array).and.have.lengthOf(5);
            lines[4].should.equal('5');
            done();
        });
    });
});


