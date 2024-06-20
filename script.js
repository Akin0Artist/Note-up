const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

document.addEventListener("DOMContentLoaded", loadNotes);

createBtn.addEventListener("click", () => {
    addNote();
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        saveNotes();
    }
});

function addNote(content = "") {
    let inputBox = document.createElement("div");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerHTML = content;
    img.src = "delete.png";
    img.className = "delete-btn";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    saveNotes();

    inputBox.addEventListener("input", saveNotes);
    inputBox.addEventListener("keydown", handleEnterKey);
    inputBox.addEventListener("input", restrictDimensions);
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".input-box").forEach(note => {
        notes.push(note.innerHTML);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
        savedNotes.forEach(noteContent => addNote(noteContent));
    }
}

function handleEnterKey(e) {
    if (e.key === "Enter") {
        document.execCommand('insertHTML', false, '<br><br>');
        e.preventDefault(); // Prevents the default action of the "Enter" key
    }
}

function restrictDimensions() {
    this.style.maxWidth = "250px";
    this.style.maxHeight = "150px";
    this.style.overflow = "hidden";
}
