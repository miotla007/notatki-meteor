Meteor.subscribe("notes");

Template.notes.notes = function () {
    return Notes.find().fetch();
  };

  Template.addNote.events({
    'click button#addNoteBtn': function(event, template){
      var newNote = template.find('#addNoteTxt').value;
      if(newNote.length > 0){
        Meteor.call("addNote", newNote, Meteor.userId());
        template.find('#addNoteTxt').value = "";
      }
    }
  });

  Template.notes.events({
    'click button.deleteNoteBtn': function(event, template){
      Meteor.call("removeNote", this._id);
    },
    'click .editNoteBtn': function (){
      Session.set("selectedEditNote", this._id);
      Session.set("showEditNoteModal", true);
    }
  });
  // Template.hello.events({
  //   'click input': function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });

  Template.editNoteModal.show = function () {
    return Session.get("showEditNoteModal");
  }

  Template.editNoteModal.events({
    'click .exit': function (){
      Session.set("showEditNoteModal", false);
    },
    'click .saveNoteBtn': function (events, template){
      var note = template.find('#editNoteName').value;
      if(note.length > 0){
        Meteor.call("editNote", Session.get("selectedEditNote"), note);
        Session.set("showEditNoteModal", false);
      }
    }
  });

  Template.editNoteModal.src = function () {
    return Notes.findOne({_id: Session.get("selectedEditNote")});
  }
