'use strict'; // Stricter syntax for JavaScript to prevent errors

var express = require('express'), // Can use express variable to access all methods and properties of Express module
	posts = require('./mock/posts.json');

var postList = Object.keys(posts).map(function(value) {
	return posts[value]; // keys() generates an array of keys for posts object, now we can use the .map() array method with callback function that returns an object that corresponds to value, key of the current position in array
});

var app = express();

app.use('/static', express.static(__dirname + '/public')) // Use method defines middleware, in between when a request is made by client and when a request reaches a route, for authentication or serving static files. Here we are accessing express module directly to start a static server with directory to serve. First parameter optional, sets prefix

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates'); // ./templates relative to Node process rather than relative file directory from app so we use __dirname

// Create root route, get listens for HTTP get requests at given route
app.get('/', function(req, res) {
	//res.send("<h1>I am in love with Treehouse!</h1>");
	var path = req.path;
	res.locals.path = path; // Same as res.render('index' { path: path });
	res.render('index') // The view argument is a string that is the file path of the view file to render. .jade optional since view engine already set to jade
});

// :title is a parameter which we can access with req.params in Node Inspector console, /blog/100 => req.params.id == 100, ? tells us that parameter is optional
app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	if (title === undefined) {
		//res.status(503); // Tells browser network console and search engines that it's not response code 200
		//res.send("This page is under construction")
		res.render('blog', { posts: postList });
	} else {
		var post = posts[title] || {}; // /blog/I like to run! will return first element in mock JSON file, otherwise empty object if title doesn't exist
		// res.send(post);
		res.render('post', { post: post }); // Can send in { posts: posts } too! The locals object, post: post, is what gets rendered in the 'post' template
		}
});

// A REST API server serving JSON for front-end use
app.get('/posts', function(req, res) {
	if (req.query.raw) {
		res.json(posts); // If localhost:3000/posts?raw=true
	} else {
		res.json(postList);
	}
})

app.listen(3000, function() {
	console.log("The frontend server is running on port 3000!")
});
