//Yo yo. JS gets confusing as it doesn't strictly follow the order that you call things in.
//Thats why Ive made a big function called retweet for you rather than break it
//up into smaller function


//LOAD MODULES
var Twit = require('twit');

//load in your config information
var T = new Twit(require('./config.js'));

//set options for getting tweets,
//{search by user name: "username, count is how many tweets you want"}
var options1 = { screen_name: 'tegabrain', count: 3 };
var options2 = { screen_name: 'irl', count: 3 };
var lastTweet = " ";//variable to hold tweet
var retweetId = " ";//variable to get tweet ID
var secondTweet = " ";//variable to hold tweet
var retweetId2 = " ";//variable to get tweet ID
var halfTweet =" ";


//function to retweet a user directly
function makeRetweet(){
  //first we go get some tweets
  //make the get call with the options as set above
  //(this is getting whosever username you have entered after screen_name: 'someName')
  T.get('statuses/user_timeline', options1 , function(error, data) {
    //if we get the data:
    if(data){
    //run through the array called data
    for (var i = 0; i < data.length ; i++) {
      //print the last 3 tweets
      console.log("data: "+data[i].text);
    }

    //put the last tweet into a variable called lastTweet
    lastTweet = data[1].text;
  }
  // console.log("Last tweet: "+lastTweet);
   console.log("Last tweet: "+data);

    //If we get an error we print out here
    if(error){
      console.log('There was an error getting the retweet:', error);
    }
    //if you want to carve up the tweet. Play with the string lastTweet here.
    //can call substring to get only a part of it. (see the string tutorials)
    //Now we tweet
    T.get('statuses/user_timeline', options2, function(error, data2) {
      //if we get the data:
      if(data2){
      //run through the array called data
      for (var i = 0; i < data2.length ; i++) {
        //print the last 3 tweets
        console.log("data: "+data2[i].text);
      }

      //put the last tweet into a variable called lastTweet
      secondTweet = data2[1].text;
    }
    // console.log("Last tweet: "+lastTweet);
     console.log("Second tweet: "+data2);
    halfTweet = secondTweet.substring(0,40); //40 characters from first account
    console.log("Half tweet: "+halfTweet);
      //If we get an error we print out here
      if(error){
        console.log('There was an error getting the retweet:', error);
      }

    //post with (yourstatus +retweetId, leave blank, error functions)
    //to post just with a string (and not with a status ID), call the following.
    //the variable lastTweet should contain your string.
    T.post('statuses/update', {status: secondTweet}, function(error,response){

      //  If we get a reponse and therefore a sucessful post:
		   if (response) {
			      console.log('Success! Check your bot, it should have tweeted something.')
			        }
			 // If there was an error with our Twitter call, we print it out here.
			 if (error) {
				console.log('There was an error posting the retweet:', error);
			   }
		 })  //close post function

    })  //close get function
  })  //close 2nd get function

}//close the makeRetweet function


//run function
makeRetweet();

//set repeat interval for your function.
setInterval(makeRetweet, 180 *1000);
