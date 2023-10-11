import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/note.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})

export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  editStates: { [noteId: string]: boolean } = {};
  editedTitles: { [noteId: string]: string } = {};
  editedDescriptions: { [noteId: string]: string } = {};
  notesSub;
  notesPerPage = 6;
  currentPage = 1;
  totalNotes = 0;
  constructor(public notesService: NotesService) { }

  ngOnInit() {
    // Get the notes
    this.notesService.getNote(this.notesPerPage, this.currentPage).subscribe((notes: Note[]) => {
      this.notes = notes;
    });

    // Get the total number of notes
    this.notesService.getTotalNotes().subscribe((totalNotes: {data: number}) => {
      this.totalNotes = totalNotes.data;
    });

    // Update the notes
    this.notesSub = this.notesService.getNoteUpdateListener()
    .subscribe((notes: Note[]) => {
      this.notes = notes;
      this.loadNotes();
    });
  }

  loadNotes() {  
    // Get the notes
    this.notesService.getNote(this.notesPerPage, this.currentPage).subscribe((notes: Note[]) => {
      this.notes = notes;
    });

    // Get the total number of notes
    this.notesService.getTotalNotes().subscribe((totalNotes: {data: number}) => {
      this.totalNotes = totalNotes.data;
    });

    // Update the notes
    this.notesSub = this.notesService.getNoteUpdateListener()
    .subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.notesPerPage = pageData.pageSize;
    this.loadNotes();
  }

  onEdit(noteId: string) {
    this.editStates[noteId] = true;
    this.editedTitles[noteId] = this.notes.find(note => note.noteId === noteId)?.title;
    this.editedDescriptions[noteId] = this.notes.find(note => note.noteId === noteId)?.description;
  }

  onSave(noteId: string) {
    const editedTitle = this.editedTitles[noteId];
    const editedDescription = this.editedDescriptions[noteId];
    this.notesService.editNotes(noteId, editedTitle, editedDescription);
      const noteToUpdate = this.notes.find(note => note.noteId === noteId);
    if (noteToUpdate) {
      noteToUpdate.title = editedTitle;
      noteToUpdate.description = editedDescription;
    }
    this.editStates[noteId] = false;
  }

  onDelete(noteId: string) {
    const noteIndex = this.notes.findIndex(note => note.noteId === noteId);
    if (noteIndex !== -1) {
      const noteTitle = this.notes[noteIndex].title;
      const confirmDelete = confirm('Are you sure you want to delete this note: ' + noteTitle);
      if (confirmDelete) {
        this.notesService.deleteNote(noteId).subscribe(() => {
          this.notes.splice(noteIndex, 1);
          this.loadNotes();
        });
      }
    }
  }

}
