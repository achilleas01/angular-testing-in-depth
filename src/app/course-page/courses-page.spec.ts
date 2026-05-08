import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getMockLessonsPage, MOCK_COURSES } from '../testing/testing-data';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { CoursePage } from './course-page';
import { getTableContent } from '../testing/testing-utils';
import { By } from '@angular/platform-browser';

const FIRST_LESSONS_PAGE = getMockLessonsPage(1,"", "asc", 0, 3);
const SECOND_LESSONS_PAGE = getMockLessonsPage(1,"", "asc", 1, 3);
const SEARCH_LESSONS_PAGE = getMockLessonsPage(1,"Angular", "asc", 0, 3);



describe('CoursesPage', () => {
  let component: CoursePage;
  let fixture: ComponentFixture<CoursePage>;
  let de: DebugElement;
  let mockCoursesService: any;
  
  beforeEach(async () => {
    mockCoursesService = {
      findLessons: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CoursePage],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                course: MOCK_COURSES[0],
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursePage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('it should load lessons on init', async () => {
    mockCoursesService.findLessons.mockResolvedValue(FIRST_LESSONS_PAGE);

    // triggers initialization and ngOnInit of the component
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(mockCoursesService.findLessons).toHaveBeenCalledWith(1, "", "asc", 0, 3);
    const lessons = getTableContent(de, "tbody tr td.description-cell");
    expect(lessons).toHaveLength(3);
    expect(lessons[0]).toBe("Lesson 1");
    expect(lessons[1]).toBe("Lesson 2");
    expect(lessons[2]).toBe("Lesson 3");

  });

  it('should show loading spinner while fetching', async () => {
     // trigger ngOnInit
     fixture.detectChanges();
     
     const spinner = de.query(By.css('.loading-spinner'));
     expect(spinner).toBeTruthy();
     expect(component.loading()).toBe(true);

  });

  afterEach(() => {
  });


});