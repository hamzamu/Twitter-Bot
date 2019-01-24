// Packages
var twit = require('twit');
// Configuration
var config = require('./config.js');
var Twitter = new twit(config);
// Retweet
var retweet = function() {
    // Parameters
    var params = {
        q: '#github, #GitHub',
        result_type: 'recent',
        lang: 'en'
    }
    // Search
    Twitter.get('search/tweets', params, function(err, data) {
        // Success
        if (!err) {
            // Grab Tweet ID
            var retweetId = data.statuses[0].id_str;
            // Retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted : ', retweetId);
                }
                if (err) {
                    console.log('Duplicate : ', retweetId);
                }
                console.log('');
            });
        } else {
            console.log('Search Error');
        }
    });
}
// Date
const now = new Date();
console.log('\n', now ,'\n');
// Retweet Function
retweet();
setInterval(retweet, 60000);