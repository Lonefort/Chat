import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });    

Meteor.methods({
  'messages.insert'(message) {
    check(message,{
    text : String,
    room : String,
    });
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Messages.insert({
      text: message.text,
      room: message.room,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  }
});
}