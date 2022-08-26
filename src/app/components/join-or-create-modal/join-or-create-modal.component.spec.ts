import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinOrCreateModalComponent } from './join-or-create-modal.component';

describe('JoinOrCreateModalComponent', () => {
  let component: JoinOrCreateModalComponent;
  let fixture: ComponentFixture<JoinOrCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinOrCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinOrCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
