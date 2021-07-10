import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expert } from 'src/app/shared/model/expert.model';
import { ExpertService } from 'src/app/shared/services/expert.service';

export interface Tile {
  id: number;
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {
  tiles: Tile[] = [
    {id: 1, cols: 3, rows: 1, color: 'transparent'},
    {id: 2, cols: 1, rows: 3, color: 'transparent'},
    {id: 3, cols: 1, rows: 3, color: 'transparent'},
    {id: 4, cols: 2, rows: 3, color: 'transparent'},
  ];

  expertIdFromRoute: string;
  expert: any;
  experts: Expert[] = [];

  loading: boolean = true;
  subscriptions: Subscription[] = [];

  isMobile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private expertService: ExpertService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    this.expertIdFromRoute = routeParams.get('expertId');

    this.expertService.selectExpert(this.expertIdFromRoute);

    this.expertService.selectedExpert$.subscribe((expert) => {
      this.expert = expert;
    });
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
