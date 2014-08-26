Players = new Meteor.Collection('players');
var player = function () {
  return Players.findOne(Session.get('player_id'));
};

Messages = new Meteor.Collection('messages');

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

  Template.history.messages = function () {
    return Messages.find({}, {sort: {cdate: -1}, limit: 30});
  }

// Meteor.isClient を条件とする if 文の中に下記を追加します
  Template.history.events({
    'click .modify': function () {
        var newmessage = window.prompt('メッセージの修正', this.message);

        if (newmessage !== null) {
            Messages.update({_id: this._id},
                {$set: {message: newmessage}}
            );
        }
    },
// history テンプレートに対する events 関数の引数となるイベントマップ(オブジェクト) 
// キー 'click .modify' に続く形で以下の内容となります。'click .modify' の値の最後にコンマ(,)
// を追加する事をお忘れなく(以下1行)。
    'click .delete': function () {
      if (window.confirm('メッセージ ' + this.message + ' を削除します。よろしいですか?')) {
        Messages.remove({_id: this._id});
      }
    }
  });

  Template.send.events({
    'click #send': function (evt, tmpl) {
       Messages.insert({
         user_name: tmpl.find('#user_name').value,
         message: tmpl.find('#message').value,
         cdate: new Date()
       });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
    if(Messages.find().count() === 0) {
      // Messages コレクションの内容が0件だった場合、Messages コレクションにドキュメントを追加します。
      Messages.insert(
        {user_name: 'TT_kawa', message: 'こんにちは。', cdate: new Date()}
      );
    }
}
