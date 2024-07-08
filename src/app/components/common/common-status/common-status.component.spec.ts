import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStatusComponent } from './common-status.component';

describe('CommonStatusComponent', () => {
  let component: CommonStatusComponent;
  let fixture: ComponentFixture<CommonStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
