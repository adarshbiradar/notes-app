var fetchNotes=()=>
{
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
  }catch(e)
  {
    return [];
  }
}

var saveNotes=(notes)=>
{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

const fs=require('fs');
var addNote = (title,body)=>{
    notes=fetchNotes();
    note={
        title,
        body,
    }
    var duplicateNotes=notes.filter((note)=>title===note.title);
    if(duplicateNotes.length===0)
    {
    notes.push(note);
    saveNotes(notes);
    return note;
    }
};

var getAll=()=>{
    return fetchNotes();
}

var getNote=(title)=>{
    var notes=fetchNotes();
    var requiredNote=notes.filter((note)=>title===note.title);
    return requiredNote[0];
}

var removeNote=(title)=>{
    var notes=fetchNotes();
    var filteredNotes=notes.filter((note)=>title!==note.title);
    saveNotes(filteredNotes);
    return notes.length!==filteredNotes.length;
}


var logNote=(note)=>{
    console.log("---------------");
    console.log(`title: ${note.title}`);
    console.log(`Body:${note.body}`);
}

module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
}