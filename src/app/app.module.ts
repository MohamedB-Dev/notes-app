import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { DragDropModule } from '@angular/cdk/drag-drop';

// Components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from './components/notes/notes.component';
import { ListComponent } from './components/list/list.component';

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
    NotesComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    DragDropModule
  ],
  
  providers: [
    NotesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
