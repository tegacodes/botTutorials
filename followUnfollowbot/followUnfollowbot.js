// The Twitter library
var Twit = require('twit');

// We need to include our configuration file
// Notice how we are setting up an instance of Twit called T. This means
// we can use functions from the Twit library by calling T.nameOfFunction(arguments)
var T = new Twit(require('./config.js'));
//get random entry in array
function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};
/*
 *  Choose a random follower of one of your followers, and follow that user
 */
mingle = function () {
//	var randScreenName = randIndex(T.screenNames);
console.log(T.screenNames);
	// console.log("Target is   @" + randScreenName);
  //
	// // Access to 'randScreenName' followers
  // twit.get('followers/ids', { screen_name: randScreenName }, function(err, reply) {
	// 		if(err){
  //       return err;
  //     }
  //
	// 		var followers = reply.ids;
  //     console.log(followers);
  //   }
  // )
}
	// 		var target  = randIndex(followers);
	// 		twit.post('friendships/create', { id: target }, function(err, reply) {
  //   			if(err){
  //           return err;
  //         }
  // }
//)
mingle = function (callback) {


  T.get('followers/ids', function(err, reply) {
      if(err) { return callback(err); }

      var followers = reply.ids
        , randFollower  = randIndex(followers);

      T.get('friends/ids', { user_id: randFollower }, function(err, reply) {
          if(err) { return callback(err); }

          var friends = reply.ids
            , target  = randIndex(friends);

          T.post('friendships/create', { id: target }, callback);
        })
    })
};



/*
 *  Prune your followers list; unfollow a friend that hasn't followed you back
 */
// prune = function () {
//   twit.get('followers/ids', function(err, reply) {
//       if(err) {
//         return err;
//       }
//
//       var followers = reply.ids;
//
//       twit.get('friends/ids', function(err, reply) {
//           if(err){
//           return err;
//         }
//
//           var friends = reply.ids
//             , pruned = false;
//
//           while(!pruned) {
//             var target = randIndex(friends);
//
//             if(!~followers.indexOf(target) && !~T.unfollowIds.indexOf(target)) {
//               pruned = true;
//               twit.post('friendships/destroy', { id: target }, function(err, reply) {
//                   if(err){
//                   return err;
//                 }
// 						}
// 					}
//         }
//       );
//   }
// );
// }




// mingle every minute
// prune every minute
// Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(mingle(function(err, reply) {
  if(err) return handleError(err);

  var name = reply.screen_name;
  console.log('\nMingle: followed @' + name);
})
,1000 * 3);
//setInterval(prune, 1000 * 60 * 60);
