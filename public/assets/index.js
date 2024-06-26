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

const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

const renderActiveNote = () => {
    hide(saveNoteBtn);
    hide(clearBtn);
    console.log(activeNote)
    if (activeNote.id) {
        show(newNoteBtn);
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
    } else {
        hide(newNoteBtn);
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
    }
};

const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value
    };
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Deletes the note
const handleNoteDelete = (e) => {
    // Prevents the click listener from being called when the inside button is clicked
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
    console.log("something")
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
    activeNote = {};
    show(clearBtn);
    renderActiveNote();
};

// Render Buttons Based on Form State
const handleRenderBtns = () => {
    show(clearBtn);
    if (!noteTitle.value.trim() && !noteText.value.trim()) {
        hide(clearBtn);
    } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
    console.log(notes)
    let jsonNotes = notes;
    console.log(jsonNotes)
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems = [];

    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.classList.add('list-item-title');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );
            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }

        return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListItems.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);

        noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListItems.forEach((note) => noteList[0].append(note));
    }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
    getNotes()
        .then(response => {
            // Check if response is valid JSON
            if (response && response.length) {
                renderNoteList(response);
            } else {
                console.error('Invalid response from server:', response);
                // Display a user-friendly error message
                // For example: renderNoteList([]) to clear the list
            }
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
            // Display a user-friendly error message
        });
};

if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    clearBtn.addEventListener('click', renderActiveNote);
    noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();