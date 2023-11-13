import { NgModule } from "@angular/core";
import { RouterModule , Route } from "@angular/router";

import { WritingNotesComponent } from "./components/writing-notes/writing-notes.component";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes = [
    { path: '', component: WritingNotesComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: 
    [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule { }

