let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteForm = document.querySelector('.note-form');
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    clearBtn = document.querySelector('.clear-btn');
    noteList = document.querySelectorAll('.list-container .list-group');
}
//Shows an element
const show = (elem) => {
    elem.style.display = 'inline';
};

// Hides an element
const hide = (elem) => {
    elem.style.display = 'none';
};

let activeNote = {};

const getNotes = async () => {
    console.log("getNotes")
    const res = await fetch('/api/notes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const respData = await res.json();
    return respData;
};

const saveNote = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });