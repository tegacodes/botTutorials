//LOAD MODULES
var Twit = require('twit');

// The 'fs' (file system) module allows us to read and write files
// Use it whenever you need to load in external files
// http://nodejs.org/api/fs.html
var fs = require('fs');

//load in your config information
var T = new Twit(require('./config.js'));

//c is a counter for constructing the image file name
var c=0;
//construct a string to the image file path
var imagePath = "images/telephone"+c+".jpg";
//check that it is a string to avoid errors
imagePath = String(imagePath);

//use fs to read in the file.
var tweetImage = fs.readFileSync(imagePath, { encoding: 'base64' });



// Send a tweet function!
function sendTweet(send_msg) {
  T.post('statuses/update', {status: send_msg},  function(error, tweet, response){
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

//update which image you are loading into tweetImage which is the name of your image variable
function updateImage(){
          //increase counter by 1
          c++;
          //create image path with new c
          imagePath = "images/telephone"+(c%3)+".jpg";
          //read file with that image path
          tweetImage = fs.readFileSync(imagePath, { encoding: 'base64' })
}

//A function to post the image
function postMedia(){


  // first we must post the media to Twitter
  T.post('media/upload', { media: tweetImage }, function (err, data, response) {

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: 'hello? #telephone', media_ids: [mediaIdStr] }
//post the text
    T.post('statuses/update', params, function (err, data, response) {
      console.log(data)
    })
  })
  //update for the next image
updateImage();
}

//A function to generate a random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//make post
//sendTweet("hello world");
postMedia();


//set random interval until next post (in milliseconds)

setInterval(postMedia,getRandomInt(1000 * 60, 10000*60));
