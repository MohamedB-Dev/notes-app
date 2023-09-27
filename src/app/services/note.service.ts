import { Note } from '../models/note.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();
  private readonly BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getNote() {
    this.http.get<{ message: string; data: any[] }>(`${this.BASE_URL}/notes`)
      .pipe(map((response) => {
        return response.data.map(item => {
          return {
            noteId: item._id,
            title: item.title,
            description: item.description,
          };
        });
      }))
      .subscribe((noteData: Note[]) => {
        this.notes = noteData;
        this.notesUpdated.next([...this.notes]);
      });
  }

  addNotes(title: string, description: string) {
    const note: Note = { noteId: null, title: title, description: description };
    this.http.post<{ message: string; noteId: string }>(`${this.BASE_URL}/notes`, note)
      .subscribe((responseData) => {
        const id = responseData.noteId;
        note.noteId = id;
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);
      });
  }

  editNotes(noteId: string, title: string, description: string) {
    const note: Note = { noteId: noteId, title: title, description: description };
    this.http.put(`${this.BASE_URL}/notes/${noteId}`, note)
      .subscribe(() => {
        const updatedNotes = [...this.notes];
        const oldNoteIndex = updatedNotes.findIndex(p => p.noteId === note.noteId);
        updatedNotes[oldNoteIndex] = note;
        this.notes = updatedNotes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  deleteNote(noteId: string) {
    this.http.delete(`${this.BASE_URL}/notes/${noteId}`)
      .subscribe(() => {
        const updatedNotes = this.notes.filter(note => note.noteId !== noteId);
        this.notes = updatedNotes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }
}
