Parse.Cloud.define('getMessagesForUser', function(request, response) {
    var user = Parse.User.current();

    var query = new Parse.Query('Messages');
    query.equalTo('recipient', user);
    query.find()
        .then(function(messages) {
            response.success(messages);
        });
});