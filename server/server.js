
  Meteor.startup(function () {

  });

Meteor.publish("notes", function(){
  return Notes.find({'uzytkownik': this.userId});
});
