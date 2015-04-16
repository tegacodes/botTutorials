#RetweetBot

This bot retweets the latest tweet using the "#mediaarts" hashtag. It attempts to retweet once per hour.

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

The bot.js file uses the javascript Twitter library called Twit. Twit takes care of how we talk to the Twitter API. If you have a look in bot.js, all the GET and POST requests are arranged in a function called `retweetLatest()`. In this function there is a:

##Get Request

The twitter [GET request](https://dev.twitter.com/rest/reference/get/search/tweets) is called to search for tweets.

`//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011  
//  print them out in the console.  
//  
T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {  
  //make whatever you want to happen when you get an error here!  
  console.log(data)  
})`  

The get request (which is called via out library) requires three arguments, it requires a string, a query object and an error function. You can guess that the query is q: and needs the search term and the amount of tweets you want back.

This request returns the tweets from the search in JSON format.

You can see that the error function that is called as the third argument is a long thing with more function in it. In here is says that if there is no error:
` if (!error) {...`

a post request is made to twitter.

##Post Request

The twitter POST request can be made in a few ways depending on what type of post you want to make. It can be a [retweet POST](https://dev.twitter.com/rest/reference/post/statuses/retweet/%3Aid) (as is used here). But it can also just update status (you would replace the first two arguments with `'statuses/update', { status: 'hello world!' }, `

From our code the POST request is a retweet request:

`//  retweet a tweet with id '343360866131001345'  

//  
T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {  \n

  //whatever you want to happen when an error happens go here  \n

  console.log(data)  \n
})`  

POST requires 3 arguments, the first determines whether it is a status update or retweet and requires the user id if it is a retweet, the second can be left blank, and the third is an error function as before.  

Finally the last two lines in bot.js are calling the retweetLatest() function which will run this function once. Then a timer is set that will call this function every hour. You can call functions at time intervals by using the javascript [setInterval function.](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/timers)

'setInterval(function () {alert("Hello")}, 3000);'
