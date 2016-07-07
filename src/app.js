'use strict'; // Stricter syntax for JavaScript to prevent errors

var express = require('express'), // Can use express variable to access all methods and properties of Express module
	posts = require('./mock/posts.json');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates'); // ./templates relative to Node process rather than relative file directory from app so we use __dirname

// Create root route, get listens for HTTP get requests at given route
app.get('/', function(req, res) {
	//res.send("<h1>I am in love with Treehouse!</h1>");e
	res.render('index') // .jade optional since view engine already set to jade
});

// :title is a parameter which we can access with req.params in Node Inspector console, /blog/100 => req.params.id == 100, ? tells us that parameter is optional
app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	if (title === undefined) {
		res.status(503); // Tells browser network console and search engines that it's not response code 200
		res.send("This page is under construction")
	} else {
	var post = posts[title] || {}; // /blog/I like to run! will return first element in mock JSON file, otherwise empty object if title doesn't exist
	//res.send(post);
	res.render('post', { post: post }); // can send in { posts: posts } too!
}
});

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!")
});