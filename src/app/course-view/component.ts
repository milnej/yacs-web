import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Course } from '../course-list/course/course';
import { YacsService } from '../services/yacs.service';


@Component({
  selector: 'course-view',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class CourseViewComponent implements OnInit {

  courses : Course[] = [];

  constructor (
    private yacsService : YacsService,
    private activatedRoute: ActivatedRoute) { }

  getCourses (params: Params) {
    let newParams : Object = {
      show_sections: true,
      show_periods: true
    };
    // add show_sections and show_periods to params
    Object.assign(newParams, params); // cannot directly modify params
    this.yacsService
        .get('courses', newParams)
        .then((data) => {
          this.courses = data['courses'] as Course[];
        });
  }

  ngOnInit () : void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.getCourses(params);
    });
  }
}