
let entryCount = 1;
let entries = [];
let rowIDs = [];
let cols = [];

let emptyNoteEntries = "";
let defaultNoteEntries = emptyNoteEntries + "";
colors = ["#61c6c0", "#cdc906", "#f86c75", "#f68eb1", "#ffa133" ,"#f13e42"];
colorCount = 0;

function getNote(){
    let noteName = document.getElementById("note-title-text").value;
    let noteContent = document.getElementById("note-content").value;
    let noteTuple = [noteName, noteContent];
    entries.push(noteTuple);
    putNote(noteTuple);
    clearInput();
} 

function putNote(noteTuple){
    entryCount = entries.length;
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
    addcols(rowID);
}

function addcols(rowID){
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
    col.appendChildcol.appendChild(); 
    setClass(entryCount, "note");
    setBackgroundColor(entryCount);
    cols[entryCount-1][1] = "notEmpty";
}

function setClass(id, clssname){
    document.getElementById(id).className = clssname;
}
function setBackgroundColor(id){
    if (colorCount === 6) colorCount = 0;
    document.getElementById(id).style.backgroundColor = colors[colorCount];
    colorCount++;
}

function getNoteEntries(){
    return document.getElementById("note-entries");
}

function clearNoteFromNotes(itemEntryCount){
    entries = entries.filter(a => a !== entries[itemEntryCount-1]);
    entryCount = entries.length;
    var noteEntries = document.getElementById("expense-table");
    if (entryCount === 0){
        noteEntries.innerHTML = defaultTable;
    }
    else{
        noteEntries.innerHTML = emptyTable;
        for (let i = 0; i < entries.length; i++){
            let noteTuple = [entries[i][0], entries[i][1]];
            addNote((i+1), noteTuple, noteEntries);
        }
    }
}

function exportNotes(){
    let csvContent = "data:text/csv;charset=utf-8," + entries.toString();
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_data.csv");
    document.body.appendChild(link);
    link.click(); 
}

function clearNotes(){
    let choice = confirm("Are you sure you want to clear the table?");
    if (choice){
        var noteTable = document.getElementById("note-entries");
        entries = [];
        rowIDs = [];
        cols = [];
        entryCount = 1;
        noteTable.innerHTML = "";
    }
}

function submitWithReturn(event) {
    if (event.keyCode === 13) {
        getNote();
       }
  }

function clearInput(){
    let notetitleInput = document.getElementById("note-title-text");
    notetitleInput.value = "Enter Note Title";
    document.getElementById("note-content").defaultValue ="Enter Note Content Here";
}

function getClearNoteButton(count){
    return "<button type='button' class='clear-note-item-button' id=" + count +" onclick='clearNoteFromNotes(" + count + ")'>x</button>";
}