import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  isExpert: boolean = false;

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.isLoggedIn = true;
    }

    if (this.authenticationService.currentUserValue[0].expert) {
      this.isExpert = true;
    }
  }

  ngOnInit(): void {}
}
