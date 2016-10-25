var express = require('express');
var dateConverter = require('./date-converter');
var app = express();
app.listen(process.env.PORT || 5000, process.env.IP);
app.use(express.static('view'));


app.get('/:value', function(req, res) {
   var urlParam = req.params.value.toLowerCase();
   
   res.send('<code>' +dateConverter(urlParam) + '</code>');
});