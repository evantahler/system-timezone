var system_timezone = require('../index.js');

describe('system tiemzone', function(){
  it('should not crash', function(){
    var timezone = system_timezone();
    console.log('  timezone -> ' + timezone);
  }); 
});