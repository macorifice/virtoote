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
      console.log(experts);
      this.experts$.next(experts);
    } catch (err) {
      console.log('Could not load experts.', err);
    }
  }

  async getExpert(expertId: number) {
    return await this.apiService.get(`/experts/${expertId}`);
  }

  async selectExpert(expertId: number) {
    if (this.experts$.value && this.experts$.value.length > 0) {
      const expert = this.experts$.value.find((expert) => {
        return expert.id === expertId;
      });
      this.selectedExpert$.next(expert);
    }
  }

  async refetchExperts() {
    if (this.selectedExpert$.value) {
      await this.getExpert(this.selectedExpert$.value.id);
    }
  }

  async createExpert(expert: Expert) {
    try {
      const createdExpert = await this.apiService.post('experts', expert);
      return createdExpert;
    } catch (err) {
      console.log(`Could not Create Expert`, err);
      throw err;
    }
  }

  async deleteExpert(expertId: number) {
    const deletedExpert = await this.apiService.delete(`experts/${expertId}`);
    return deletedExpert;
  }
}
