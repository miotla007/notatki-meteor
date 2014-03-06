Notes = new Meteor.Collection("notes");

if (Meteor.isClient) {
  Template.notes.notes = function () {
    return Notes.find({'uzytkownik': Meteor.userId()}).fetch();
  };

  Template.addNote.events({
    'click button#addNoteBtn': function(event, template){
      var newNote = template.find('#addNoteTxt').value;
      if(newNote.length > 0){
        Notes.insert({'note': newNote, 'uzytkownik': Meteor.userId()});
        template.find('#addNoteTxt').value = "";
      }
    }
  });

  Template.notes.events({
    'click button.deleteNoteBtn': function(event, template){
      Notes.remove({_id: this._id});
    }
  })
  // Template.hello.events({
  //   'click input': function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {


  //   Template.notes.notes = function () {
  //     return Notes.find({'uzytkownik': this.userId}).fetch();
  // };


  });
}
