let entryCount = 1;
let entries = [];
let rowIDs = [];
let cols = [];
let tempEntries = [];

let emptyNoteEntries = "";
let defaultNoteEntries = emptyNoteEntries + "";
let colors = ["#61c6c0", "#cdc906", "#f86c75", "#f68eb1", "#ffa133" ,"#f13e42","#c890d1"];
let colorCount = 0;

function getInput(){
    let noteName = document.getElementById("note-title-text").value;
    let noteContent = document.getElementById("note-content").value;
    let noteTuple = [noteName, noteContent];
    getNote(noteTuple);
}

function getNote(noteTuple){
    entries.push(noteTuple);
    entryCount = entries.length;
    putNote(noteTuple);
    clearInput();
} 

function putNote(noteTuple){
    if ( getNoteEntriesInnerHTML()  === ""){
        addRow();
    }
    if ((entryCount % 3) === 1) addRow();
    addNote(entryCount, noteTuple);
}

function addRow(){
    var noteEntries = getNoteEntries();
    var row = document.createElement("div");
    row.class="row";
    rowID = "row" + (rowIDs.length + 1);
    row.id = rowID;
    rowIDs.push(rowID);
    noteEntries.appendChild(row);
    setClass(rowID, "row");
    addCols(rowID);
}

function addCols(rowID){
    let row = document.getElementById(rowID);
    for (let i = 0; i< 3; i++){
        let col = document.createElement("div");
        col.class="column";
        colID = "col" + (cols.length + 1);
        let colTuple = [colID,"empty"];
        col.id = colID;
        cols.push(colTuple);
        row.appendChild(col);
        setClass(colID, "column");
    }
}

function addNote(entryCount, noteTuple){
    let col = document.getElementById("col" + entryCount);
    let note = document.createElement("p");
    note.class="note";
    note.id = entryCount;
    note.innerHTML = "<h3>" + noteTuple[0] + "</h3><br>" + noteTuple[1] + getClearNoteButton(entryCount);
    col.appendChild(note); 
    setClass(entryCount, "note");
    setBackgroundColor(entryCount);
    cols[entryCount-1][1] = "notEmpty";
}

function clearNoteFromNotes(noteIDToRemove){
    entries = entries.filter(a => a !== entries[noteIDToRemove-1]);
    if (entries.length === 0){
        clearNotes();
    }else{
        var noteTable = getNoteEntries();
        noteTable.innerHTML = "";
        tempEntries = entries;
        clearArrays();
        colorCount = 0
        for(let i = 0; i < tempEntries.length; i++){
            let noteTuple = [tempEntries[i][0],tempEntries[i][1]];
            getNote(noteTuple);
        }
    }
}

// function exportNotes(){
//     let csvContent = "data:text/csv;charset=utf-8," + entries.toString();
//     var encodedUri = encodeURI(csvContent);
//     var link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "expense_data.csv");
//     document.body.appendChild(link);
//     link.click(); 
// }

let setBackgroundColor = (id) => {
    if (colorCount === 7) colorCount = 0;
    document.getElementById(id).style.backgroundColor = colors[colorCount];
    console.log(document.getElementById(id).style.backgroundColor);
    colorCount++;
}

let clearInput = () => {
    let notetitleInput = document.getElementById("note-title-text");
    notetitleInput.value = "Enter Note Title";
    document.getElementById("note-content").defaultValue ="Enter Note Content Here";
}

let clearNotes = () => {
    clearNoteEntriesInnerHTML();
    clearArrays();
}

let clearArrays = () =>{
    entries = [];
    rowIDs = [];
    cols = [];
}

let resetCols = (entryCount) => cols[entryCount][1] = "empty";

let clearAllNotesPressed = () => (confirm("Are you sure you want to clear the table?")) ? clearNotes(): null;

let setClass = (id, clssname) => document.getElementById(id).className = clssname;

let submitWithReturn = (event) => (event.keyCode === 13) ? getInput() : null ;

let getNoteEntries = () => document.getElementById("note-entries");

let getNoteEntriesInnerHTML = () => document.getElementById("note-entries").innerHTML;

let clearNoteEntriesInnerHTML = () => document.getElementById("note-entries").innerHTML = "";

let getClearNoteButton = (count) => "<button type='button' class='clear-note-item-button' id=" + count +" onclick='clearNoteFromNotes(" + count + ")'>x</button>";
