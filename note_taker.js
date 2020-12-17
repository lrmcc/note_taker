let entryCount = 1;
let entries = [];
let rowIDs = [];
let cols = [];
let tempEntries = [];
let modalTitle = "";
let modalBody = "";
let emptyNoteEntries = "";
let defaultNoteEntries = emptyNoteEntries + "";
let colors = ["#61c6c0", "#cdc906", "#f86c75", "#f68eb1", "#ffa133" ,"#f13e42","#c890d1"];
let colorCount = 0;

let openModalButtons = document.querySelectorAll('[data-modal-target]');
let closeModalButtons = document.querySelectorAll('[data-close-button]');
let overlay = document.getElementById('overlay');

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
    noteEntries.append(row);
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
        row.append(col);
        setClass(colID, "column");
    }
}

function addNote(entryCount, noteTuple){
    let col = document.getElementById("col" + entryCount);
    let note = createNote(entryCount, col)
    let noteTitleID = ("noteTitle" + entryCount);
    createNoteChild(noteTitleID,"h3", note, noteTuple[0], "note-title");
    note.innerHTML += "<br>";
    let noteContentID = ("noteContent" + entryCount);
    createNoteChild(noteContentID,"p", note, noteTuple[1], "note-content");
    note.innerHTML += getSeeModalButton() + getClearNoteButton(entryCount);
    setModal(entryCount);
    refreshButtons();
    buttonsEnable();
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


function createNote(entryCount, col){
    let noteID = entryCount;
    let note = createChildSetIDAppend("div", noteID, col);
    setClass(noteID, "note");
    setBackgroundColor(noteID);
    return note;
}

function createNoteChild(elemID, type, note, content, clssNme){
    let noteTitle = createChildSetIDAppend(type, elemID, note);
    setClass(elemID, clssNme);
    noteTitle.innerText = content;
}

function createChildSetIDAppend(elemType, elemID, appendToElem){
    let newElem = document.createElement(elemType);
    newElem.id = elemID;
    appendToElem.append(newElem);
    console.log
    return newElem;
}

function setModal(noteID){
    let modalTitle = document.querySelector(".title");
    let modalBody = document.querySelector(".modal-body");
    modalTitle.innerText =  entries[noteID - 1][0];
    modalBody.innerText =  entries[noteID - 1][1];
}

let setBackgroundColor = (id) => {
    if (colorCount === 7) colorCount = 0;
    document.getElementById(id).style.backgroundColor = colors[colorCount];
    console.log(document.getElementById(id).style.backgroundColor);
    colorCount++;
}

let changeColor = (element, colorChoice) => element.style.backgroundColor = colorChoice;

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

let setInnerText = (elementID, words) => document.getElementById(elementID).innerText = words;

let resetCols = (entryCount) => cols[entryCount][1] = "empty";

let clearAllNotesPressed = () => (confirm("Are you sure you want to clear the table?")) ? clearNotes(): null;

let setClass = (id, clssname) => document.getElementById(id).className = clssname;

let submitWithReturn = (event) => (event.keyCode === 13) ? getInput() : null ;

let getNoteEntries = () => document.getElementById("note-entries");

let clearNoteEntriesInnerHTML = () => document.getElementById("note-entries").innerHTML = "";

let getClearNoteButton = (noteID) => "<button type='button' class='clear-note-item-button' onclick='clearNoteFromNotes(" + noteID + ")'>&times;</button>";

let getSeeModalButton = () =>  "<button data-modal-target='#modal' '>Open Modal</button>";

function refreshButtons(){
    openModalButtons = document.querySelectorAll('[data-modal-target]');
    closeModalButtons = document.querySelectorAll('[data-close-button]');
    overlay = document.getElementById('overlay');
}

function buttonsEnable() {
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })
    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })
}

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}