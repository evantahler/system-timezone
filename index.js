#!/usr/bin/env node

/***

- inspired by https://gist.github.com/numist/f34cb150e337a8b948d9
- we can also run this as both a module and shell script
- this currently only works on *NIX machines (no windows support)

***/

var fs     = require('fs');
var crypto = require('crypto');
var glob   = require("glob");

var trim = function(string){
  return string.replace(/^\/usr\/share\/zoneinfo\//, '');
};

var timezone = function(){
  var string;

  if(process.env.TZ){ 
    return process.env.TZ; 
  }

  else if( fs.existsSync('/etc/timezone') ){
    string = fs.readFileSync('/etc/timezone', 'utf8'); 
    return string.trim();
  }

  else if( fs.lstatSync('/etc/localtime').isSymbolicLink() ){
    return trim(fs.readlinkSync('/etc/localtime'));
  }

  else{
    var md5sum = crypto.createHash('md5');
    md5sum.update( fs.readFileSync('/etc/localtime') );
    var sourceMd5 = md5sum.digest('hex');
    var files = glob.sync('/usr/share/zoneinfo/**/*');
    for(var i in files){
      var file = files[i];
      if( fs.statSync(file).isFile() ){
        var localMd5Sum = crypto.createHash('md5');
        localMd5Sum.update( fs.readFileSync(file) );
        var localMd5 = localMd5Sum.digest('hex');
        if( localMd5 === sourceMd5 ){
          return trim(file);
        }
      }
    }
  }

  throw new Error('cannot determine this system\'s timezone');
};

///

module.exports = timezone;
if(!module.parent){ console.log( timezone() ); }
