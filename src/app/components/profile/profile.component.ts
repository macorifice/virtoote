import { User } from 'src/app/shared/model/user.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  panelServicesOpenState = false;
  panelSiteOpenState = false;
  panelSocialOpenState = false;
  profiles: Section[] = [
    {
      name: 'I miei servizi',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Il mio sito',
      updated: new Date('1/17/16'),
    },
    {
      name: 'I miei social',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Guida sulla lead generation',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Estratto della guida profilo efficace',
      updated: new Date('1/18/16'),
    }
  ];
  
  isLoggedIn: boolean = false;
  isExpert: boolean = false;
  user: User;

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.isLoggedIn = true;
    }

    if (this.authenticationService.currentUserValue[0].expert) {
      this.isExpert = true;
    }
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
  }
}
