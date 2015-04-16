#FileBot

This bot tweets strings stored in a text file.

_Note: you must be comfortable using your computer's command line interface to use this bot. If you've never used it, there are tutorials for [Mac OSX](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line) and [Windows](http://www.bleepingcomputer.com/tutorials/windows-command-prompt-introduction/)._

##Installation

If you don't already have have them, please install [Node.js](http://nodejs.org/). This will install two programs: `node`, which runs JavaScript from the command line, and `npm`, which helps you install software that Node.js can run.

Make an empty project directory somewhere convenient for you, [download this file](https://github.com/tegacodes/examplebot/archive/master.zip), and unzip the contents to your project directory. Go to your project directory in the command line. There should be four files there: `.gitignore`, `README.md`, `bot.js`In that directory type:

`npm install twit`

This installs some code to the `npm_modules` subdirectory, which you don't need to worry about. (It's [Twit, the javascript library](https://github.com/ttezel/twit) that lets us talk to Twitter.)

##Connecting to Twitter

At this point you need to register a Twitter account and also get its "app info".

So create a Twitter account for whatever account you want to tweet this stuff. Twitter doesn't allow you to register multiple twitter accounts on the same email address. I recommend you create a brand new email address (perhaps using Gmail) for the Twitter account. Once you register the account to that email address, wait for the confirmation email. Then go here and log in as the Twitter account for your bot:

[https://dev.twitter.com/apps/new](https://dev.twitter.com/apps/new)

Once you're there, fill in the required fields: name, description, website. None of it really matters at all to your actual app, it's just for Twitter's information. Do the captcha and submit.  

Next you'll see a screen with a "Details" tab. Click on the "Settings" tab and under "Application Type" choose "Read and Write", then hit the update button at the bottom.  

Then go back to the Details tab, and at the bottom click "create my access token". Nothing might happen immediately. Wait a minute and reload the page. then there should be "access token" and "access token secret", which are both long strings of letters and numbers.

Now use a text editor to open up the "config.js" file. It should look like this:

```javascript
module.exports = {
  consumer_key:         'blah',
  consumer_secret:      'blah',
  access_token:         'blah',
  access_token_secret:  'blah'
}
```

In between those quotes, instead of `'blah'`, paste the appropriate info from the Details page. This is essentially the login information for the app.  

Now type the following in the command line in your project directory:  

`node bot.js`  

Hopefully at this point you see a message like "Success! Check your bot, it should have retweeted something." Check the Twitter account for your bot, and it should have retweeted a tweet with the #mediaarts hashtag.  

#What does the Javascript code do?

The fileBot.js file uses the javascript Twitter library called Twit. Twit takes care of how we talk to the Twitter API.

##Process

First few lines of this bot check that when it is run, that it is passed a file name.

##Post Request

In the function makeTweet(), the twitter POST request (line 31) can be made in a few ways depending on what type of post you want to make. Here is is a status update post [status POST](https://dev.twitter.com/rest/reference/post/statuses/update). The first two arguments are `'statuses/update', { status: 'hello world!' }, `

POST requires 3 arguments, the first determines whether it is a status update or retweet and requires the user id if it is a retweet, the second passes the tweet which must be a string, and the third is an error function as before.  

##Other Useful Functions
There are many useful functions in here that are good for reuse.

###getRandomInt
Uses the node math library to generate a random integer. Requires two arguments, the min and mx range of the number you want to generate.

###randIndex
Returns a random index of an array. This is useful if you have a array of strings and want a random one. Pass the function the whole array `arr`.

###splitSentences
Spits a long string into an array of strings, split up at a specified character. The function returns the array called listSentences.

###setInterval
At the very end of the code, this gets a function to be called every time interval. The second argument is the time interval in milliseconds. [setInterval function.](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/timers)

'setInterval(auto_tweet, 1000);'

##auto_tweet

This function puts it all together.

It calls reads the file in.

`fs.readFile(filename,"utf8", function(err,data) {..}`

Puts the text into a string called data.

Splits it into an array called tweets.

Selects a random string from this array.

And then gets the first 140 characters of this string.
`for(var i=0;i<140;i++){
  if(i==0){
    editTweet = currentTweet.charAt(i);
  }else{
    editTweet = editTweet+currentTweet.charAt(i);
  }
}`
