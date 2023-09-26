import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {
  notes: Note[] =[];
  private notesSub: Subscription;

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getNote();
    this.notesSub = this.notesSub = this.notesService.getNoteUpdateListener()
    .subscribe((notes:Note[])=>{
      this.notes=notes;
    }); 
  }

  ngOnDestroy(): void {
    this.notesSub.unsubscribe();
  }

  editNote(note){
    this.notesService.editNote(note);
  }

  deleteNote(note){
    this.notesService.deleteNote(note);
  }
}
