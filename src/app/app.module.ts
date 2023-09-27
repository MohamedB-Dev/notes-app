import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WritingNotesComponent } from './components/writing-notes/writing-notes.component';
import { NoteListComponent } from './components/note-list/note-list.component';

// Angular-Material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule  } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

// Services
import { NotesService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    WritingNotesComponent,
    NoteListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
  ],
  
  providers: [
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
