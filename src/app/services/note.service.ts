import { Note } from '../models/note.model';
import { Subject } from 'rxjs';

export class NotesService {
    private notes: Note[] = [];
    private notesUpdated = new Subject<Note[]>();

    getNote() {
        return [...this.notes];
    }

    getNoteUpdateListener() {
        return this.notesUpdated.asObservable();
    }
    
    addNote(title: string, description: string) {
        const note: Note = {title: title,description: description};
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);

    }

    editNote(note){
        this.notesUpdated.next(note);
    }

    deleteNote(note){
        this.notesUpdated.next(note);
    }

}