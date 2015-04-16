// We can get command line arguments in a node program
// Here we're checking to make sure we've typed three things (the last being the filename)
if (process.argv.length < 3) {
  console.log('Oops, you forgot to pass in a text file.');
  process.exit(1);
}

//LIBRARIES
// Our Twitter library
var Twit = require('twit');

// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
var fs = require('fs');

// We need to include our configuration file
// Notice how we are setting up an instance of Twit called T. This means
// we can use functions from the Twit library by calling T.nameOfFunction(arguments)
var T = new Twit(require('./config.js'));

//pull file name from second argument
var filename = process.argv[2];

//some variables to hold our tweets
var tweets;
var currentTweet;

//FUNCTIONS
// This function posts a tweet with the POST status call.
function makeTweet(status) {
		T.post('statuses/update', { status: status }, function(error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have tweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		}
	)
}

// Function to get a random index number of an array
function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};

// Useful function that returns a random int
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//spit a string into an array at the character indicated
//returns the array
function splitSentences(text){
	//split at whatever character
	listSentences = text.split(".");
//	console.log("listSentences "+listSentences[46]);
	return listSentences;
}

//read file from within its folder
var auto_tweet = function() {
  console.log("auto_tweet");
	// tweets are only loaded once. If you change the file, restart
  fs.readFile(filename,"utf8", function(err,data) {
    if (err){
			throw err;
		}
	//	data= data.replace(/^\s*[\r\n]/gm,"");
		//split string into array
		tweets = splitSentences(data);
		//get a random index of the array
		currentTweet=randIndex(tweets);
		var editTweet;
		//get the first 140 characters
		for(var i=0;i<140;i++){
			if(i==0){
				editTweet = currentTweet.charAt(i);
			}else{
				editTweet = editTweet+currentTweet.charAt(i);
			}
		}
	//	console.log(currentTweet);
		console.log(editTweet);
		//call makeTweet function to make tweet
		makeTweet(editTweet);
  });
}


//call the auto_tweet function
auto_tweet();


// ...and then random interval between 1 minute and 10 minutes after that.
//Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(auto_tweet, getRandomInt(1000 * 60, 10000*60));