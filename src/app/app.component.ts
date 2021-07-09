import { ExpertService } from './shared/services/expert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'virtoote';

  constructor(private expertService: ExpertService) {}

  ngOnInit(): void {
    this.expertService.getExperts();
  }
}
