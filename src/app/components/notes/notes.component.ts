import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent  {

  constructor(public notesService: NotesService) { }

  newNote(form: NgForm) {
    // if the form is empty, do nothing
    if (form.invalid) {
      return;
    }

    // add the note
    this.notesService.addNote(form.value.title, form.value.description);

    // reset the form
    form.resetForm();
  }

}
