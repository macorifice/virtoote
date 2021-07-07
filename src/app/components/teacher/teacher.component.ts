import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Teacher {
  id: number;
  name: string;
}

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherIdFromRoute: number | undefined;
  teacher: any;
  teachers: Teacher[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  // First get the product id from the current route.
  const routeParams = this.route.snapshot.paramMap;
  this.teacherIdFromRoute = Number(routeParams.get('teacherId'));

  // Find the product that correspond with the id provided in route.
  this.teacher = this.teachers.find(teacher => teacher.id === this.teacherIdFromRoute);
  }

}
