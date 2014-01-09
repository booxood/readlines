# Readlines


[![Build Status](https://travis-ci.org/booxood/readlines.png?branch=master)](https://travis-ci.org/booxood/readlines)

Read file line as array.

## Install

```
npm install readlines

or

npm install -g readlines
```

Example:
```javascript
  var fd = require('readlines');
  var lines = fd.readlinesSync('example.txt');
  for(var line in lines){
    console.log(lines[line]);
  };
```


## API

### readlinesSync(filename, [options])
Sync read file by line return an array.
```javascript
  var lines = fd.readlinesSync(filePath);
```

### readlines(filename, [options], callback)
**Async** read file by line return an array.
```javascript
  fd.readlines(filePath, function(err, lines){
      console.log(lines);
  });
```

### readlineSync(filename, [options], lineNum)
Sync read file by line return specific line.
```javascript
  var line = fd.readlinSync(filePath, 3);
```

### readline(filename, [options], lineNum, callback)
**Async** read file by line return specific line.
```javascript
  fd.readline(filePath, 3, function(err, line){
      console.log(line);
  });
```

## License
[The MIT License](https://github.com/booxood/readlines/blob/master/LICENSE)

  
