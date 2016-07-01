var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var EXCHANGE_FILE = path.join(__dirname, 'exchangeData.json');

app.set('port', (process.env.PORT || 3333));

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/api/exchange', function(req, res){
  fs.readFile(EXCHANGE_FILE, function(err, data){
    if(err) {
      console.error(err);
      process.exit(1);
    }

    res.json(JSON.parse(data));
  });
});

app.listen(app.get('port'), function(){
  console.log('Server started http://localhost:' + app.get('port') + '/');
});