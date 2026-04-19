import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TabsComponent } from './tabs';
import { TabData } from './tabs.model';
import { MOCK_TABS } from '../testing/testing-data';
import { By } from '@angular/platform-browser';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  const mockTabs: TabData[] = MOCK_TABS;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
        fixture.componentRef.setInput('tabs', mockTabs);
        fixture.detectChanges();
  });

  it('should create the component', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show correct number of tab buttons', () => {
    const buttons = de.queryAll(By.css(".tab-link"));
    expect(buttons.length).toBe(mockTabs.length);
    expect(buttons[0].nativeElement.textContent.trim()).toEqual(mockTabs[0].label);
    expect(buttons[1].nativeElement.textContent.trim()).toEqual(mockTabs[1].label);    
  });


});
