import { ExpertService } from './../../shared/services/expert.service';
import { Component, OnInit } from '@angular/core';
import { Expert } from 'src/app/shared/model/expert.model';
import { Subscription } from 'rxjs';

export interface Tile {
  id: number;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  tiles: Tile[] = [
    { id: 1, cols: 3, rows: 2, color: 'transparent' },
    // {id: 2, cols: 3, rows: 4, color: 'transparent'},
    // {id: 3, cols: 1, rows: 1, color: 'transparent'},
    // {id: 4, cols: 1, rows: 1, color: 'transparent'},
    // {id: 5, cols: 1, rows: 1, color: 'transparent'},
  ];

  loading: boolean = true;
  isMobile: boolean = false;

  subscriptions: Subscription[] = [];
  expertsList: Expert[];

  constructor(private expertService: ExpertService) {
    const expertSub = this.expertService.experts$.subscribe((experts) => {
      this.expertsList = experts;
      this.loading = false;
    });
    this.subscriptions.push(expertSub);
  }

  ngOnInit(): void {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      this.isMobile = true;
    } else {
      // false for not mobile device
      this.isMobile = false;
    }
  }
}
