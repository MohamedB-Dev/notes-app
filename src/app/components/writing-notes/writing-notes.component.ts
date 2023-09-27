import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-writing-notes',
  templateUrl: './writing-notes.component.html',
  styleUrls: ['./writing-notes.component.css']
})

export class WritingNotesComponent  {

  constructor(public notesService: NotesService) { }

  addNotes(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.notesService.addNotes(form.value.title, form.value.description);
    form.resetForm();
  }

}
