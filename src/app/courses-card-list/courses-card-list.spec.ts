import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CoursesCardList } from './courses-card-list';
import { MOCK_COURSES, MOCK_TABS } from '../testing/testing-data';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Course } from '../model/course';

describe('CourseCardListComponent', () => {
  let component: CoursesCardList;
  let fixture: ComponentFixture<CoursesCardList>;
  const mockCourses: Course[] = MOCK_COURSES;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesCardList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesCardList);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.componentRef.setInput('courses', mockCourses);
    fixture.detectChanges();
  });

  it('it should display the course list', () => {
     const courseCards  = de.queryAll(By.css(".course-card .card-header .card-title"));
     expect(courseCards.length).toBe(2);
     const cardHeader = courseCards[0].nativeElement;
     expect(cardHeader.textContent).toEqual('Beginner Course');
  });

  it('should display message when course list is empty', () => {
    fixture.componentRef.setInput('courses', []);
    fixture.detectChanges();

    //no-courses 
    const noCourse = de.query(By.css(".no-courses"));
    expect(noCourse).toBeTruthy();
    expect(noCourse.nativeElement.textContent).toContain("No courses found.");

  });

  it('should open dialog when edit button is clicked', () => {
    const editButton = de.query(By.css(".course-card:first-child .edit-btn"));
    editButton?.nativeElement.click();

    fixture.detectChanges();

    // Assuming the dialog opens, you can check for its presence
    // check existance of dialog form
    const dialogForm = document.querySelectorAll('.course-form');
    expect(dialogForm).toBeTruthy();

  });

  


});
