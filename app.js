if (Meteor.isClient) {

  chatCollection = new Meteor.Collection(null);

  chatCollection.insert({
    instagramUserName: "colonelmeow",
    message: "Hello, comrades.",
    timeStamp: new Date()
  });

  Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).fromNow();
  });

  Template.chat_component.messages = function() {
    return chatCollection.find();
  };

  Template.chat_component.rendered = function() {
    var conversation = this.find('.conversation');
    conversation.scrollTop = conversation.scrollHeight;
  };

  Template.chat_component.events({
    'click .send-btn': function(event, template) {
      event.preventDefault();
      var message = template.find('#message').value;

      if (message.length) {
        chatCollection.insert({
          instagramUserName: "hamilton_the_hipster_cat",
          message: message,
          timeStamp: new Date()
        });

        $('#message').val('');

      }
    }
  });

  Template.chat_message.rendered = function() {
    $('.avatar').tooltipster({
      animation: 'fade'
    });
  };

  Template.chat_message.avatarUrl = function() {
    var username = this.instagramUserName;
    return 'http://avatars.io/instagram/' + username;
  }

}

if (Meteor.isServer) {

}