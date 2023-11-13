import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  username: string;


  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.username = this.authService.getUsername();
    });

    this.authService.autoAuthUser();

  }

  onLougout(){
    this.authService.logout();
    this.username = null;
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}

