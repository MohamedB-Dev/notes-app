import { Note } from '../models/note.model';
import { Observable, Subject } from 'rxjs';
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

  getNote(notesPerPage: number, currentPage: number): Observable<Note[]> {
    const queryParams = `?pagesize=${notesPerPage}&page=${currentPage}`;
    return this.http.get<{ data: any[] }>(`${this.BASE_URL}/notes` + queryParams)
      .pipe(
        map((response) => {
          return response.data.map(item => {
            return {
              noteId: item._id,
              title: item.title,
              description: item.description,
              creator: item.creator
            };
          });
        })
      );
  }

  getTotalNotes() {
    return this.http.get<{ data: number }>(`${this.BASE_URL}/notes/count`)
      .pipe(
        map((response) => {
          return {data: response.data};
        })
      );
  }

  addNotes(title: string, description: string) {
    const note: Note = { noteId: null, title: title, description: description, creator: null };
    this.http.post<{ message: string; noteId: string }>(`${this.BASE_URL}/notes`, note)
      .subscribe((responseData) => {
        const id = responseData.noteId;
        note.noteId = id;
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);
      });
  }

  editNotes(noteId: string, title: string, description: string) {
    const note: Note = { noteId: noteId, title: title, description: description, creator: null };
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
    return this.http.delete(`${this.BASE_URL}/notes/${noteId}`)
  }

  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }
}
