var express=require('express');
var app = express();
var router = express.Router();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


mongoose.connect("mongodb://localhost:27017/Splitwise_db", function(err)
{
	if(err)
	{
		console.log("not connected" + err);
	}
	else
	{
		console.log("connected");
	}
});

app.get('/*', function(req,res)
	{
		res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
	});

	



app.listen(8080, function()
{
console.log("Server Running at port 8080");
});
