import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})

export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private notesSub: Subscription;
  editStates: { [noteId: string]: boolean } = {};
  editedTitles: { [noteId: string]: string } = {};
  editedDescriptions: { [noteId: string]: string } = {};

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNote();
    this.notesSub = this.notesService.getNoteUpdateListener()
      .subscribe((notes: Note[]) => {
        this.notes = notes;
      });
  }

  onEdit(noteId: string) {
    this.editStates[noteId] = true;
    this.editedTitles[noteId] = this.notes.find(note => note.noteId === noteId)?.title || '';
    this.editedDescriptions[noteId] = this.notes.find(note => note.noteId === noteId)?.description || '';
  }

  onSave(noteId: string) {
    this.notesService.editNotes(noteId, this.editedTitles[noteId], this.editedDescriptions[noteId]);
    this.editStates[noteId] = false;
    this.notes.find(note => note.noteId === noteId).title = this.editedTitles[noteId];
    this.notes.find(note => note.noteId === noteId).description = this.editedDescriptions[noteId];
  }

  onDelete(noteId: string) {
    this.notesService.deleteNote(noteId);
  }

  ngOnDestroy(): void {
    this.notesSub.unsubscribe();
  }

}
