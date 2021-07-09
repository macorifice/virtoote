import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Expert } from './../model/expert.model';

@Injectable()
export class ExpertService {
  conflictError = new Subject<any[]>();
  readonly experts$ = new BehaviorSubject<Expert[]>(null);
  readonly expert$ = new BehaviorSubject<Expert>(null);
  readonly selectedExpertId$ = new BehaviorSubject<string>(null);
  readonly selectedExpert$ = new BehaviorSubject<Expert>(null);

  constructor(private apiService: ApiService) {}

  async getExperts() {
    try {
      const experts = await this.apiService.get(`experts`);
      console.log(experts)
      this.experts$.next(experts);
    } catch (err) {
      console.log('Could not load experts.', err);
    }
  }
}
