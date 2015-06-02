var express = require('express'),
		app = express(),
		port = process.env.port || 8080,
		morgan = require('morgan'),
		listing = require('./path.js');

app.use(morgan('dev'));

// app.get('/', listing.home);
app.get('/api', listing.getListings);

app.listen(port);
console.log('RUNNING ON 8080 YO');