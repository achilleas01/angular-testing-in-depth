import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_COURSES, MOCK_TABS } from '../testing/testing-data';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Course } from '../model/course';
import { Courses } from './courses';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { provideHttpClient } from '@angular/common/http';

describe('Courses', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;
  let de: DebugElement;
  
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courses],
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(Courses);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('it should load courses and filter by category', async () => {
    
    const request = httpMock.expectOne('/api/courses');
    request.flush({ payload: MOCK_COURSES });
    await fixture.whenStable();
    expect(component.allCourses()).toEqual(MOCK_COURSES);
    fixture.detectChanges();
    const titles  = de.queryAll(By.css(".course-card .card-header"));
    expect(titles.length).toBe(1);
    const titleEl = titles[0].nativeElement;
    expect(titleEl.textContent).toEqual('Beginner Course');

  });

  it('should show advanced tab when tab is clicked', async () => {
    const request = httpMock.expectOne('/api/courses');
    request.flush({ payload: MOCK_COURSES });
    await fixture.whenStable();

    const secondBtnLink = de.query(By.css('.tab-link:last-child'));
    secondBtnLink.nativeElement.click();
    fixture.detectChanges();

    const titles  = de.queryAll(By.css(".course-card .card-header"));
    expect(titles.length).toBe(1);
    const titleEl = titles[0].nativeElement;
    expect(titleEl.textContent).toEqual('Advanced Course');

  });

  afterEach(() => {
    // no further http requests should be pending
    httpMock.verify();
  });


});
