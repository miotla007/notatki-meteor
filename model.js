Notes = new Meteor.Collection("notes");

Notes.allow({
	'insert': function (userId, doc) {
		return false;
	},
	'update': function (userId, doc, fieldNames, modifier) {
		return false;
	},
	'remove': function (userId, doc) {
		if(doc.uzytkownik === userId){
			return true;
		}
		return false;
	}
});

Meteor.methods({
	'addNote': function (note, uzytkownik) {
		Notes.insert({'note': note, 'uzytkownik': uzytkownik});
	},
	'editNote': function (id, note) {
		Notes.update({_id: id},
          {$set: {note: note} }
          );
	},
	'removeNote': function (id) {
		Notes.remove({_id: id});
	}
})