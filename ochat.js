Players = new Meteor.Collection('players');
var player = function () {
  return Players.findOne(Session.get('player_id'));
};

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to ochat.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

Template.lobby.disabled = function () {
  var me = player();
console.log("aaa", me);

  if (me && me.name)
    return '';
  return 'disabled';
};
  Meteor.startup(function () {
  var player_id = Players.insert({name: '', idle: false});
  Session.set('player_id', player_id);
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
