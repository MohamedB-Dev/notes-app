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

  addNotes(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.notesService.addNotes(form.value.title, form.value.description);
    form.resetForm();
  }

}
