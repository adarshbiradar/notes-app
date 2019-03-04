const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');

const notes=require('./notes');
const titleOptions={
    describe:'title of the note',
    demand:true,
    alias:'t',
};
var args = yargs
.command('add','Add a new Note',{
    title:titleOptions,
    body:
    {
        describe:'Body of the note',
        demand:true,
        alias:'b',
    }
})
.command('list','Lists all the Notes')
.command('read','Reads a note',{
    title:titleOptions,
})
.command('remove','Removes the note',{
    title:titleOptions,
})
.help()
.argv;
var command = process.argv[2];

if(command==='add'){
   var note=notes.addNote(args.title ,args.body);
   if(note)
   {
       console.log("Note created");
       notes.logNote(note);
   }
   else
   {
       console.log("Note name already in use");
   }
}else if(command ==='list'){
    allNotes=notes.getAll();
    console.log(`printing ${allNotes.length} node(s)`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
}else if(command==='read')
{
  var note=notes.getNote(args.title);
  if(note)
  {
    console.log("reading note");
    notes.logNote(note);
  }
  else{
      console.log('Note not found')
  }
}else if(command=='remove')
{
  var removedNote=notes.removeNote(args.title);
  var message=removedNote?"Note deleted":"Note not found";
  console.log(message);
}else{
    console.log('Command not recognized');
}