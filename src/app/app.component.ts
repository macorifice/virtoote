import { ExpertService } from './shared/services/expert.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/auth.service';
import { User } from './shared/model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'virtoote';
  currentUser: User;

  constructor(
    private expertService: ExpertService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
    this.expertService.getExperts();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
