import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expert } from 'src/app/shared/model/expert.model';
import { ExpertService } from 'src/app/shared/services/expert.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
})
export class ExpertComponent implements OnInit {
  expertIdFromRoute: string;
  expert: any;
  experts: Expert[] = [];

  loading: boolean = true;
  subscriptions: Subscription[] = [];

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

  ngOnInit(): void {}
}
