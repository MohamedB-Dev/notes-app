import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritingNotesComponent } from './components/writing-notes/writing-notes.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard, UnAuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: WritingNotesComponent, canActivate: [AuthGuard] },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [UnAuthGuard] 
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, UnAuthGuard]
})
export class AppRoutingModule { }
