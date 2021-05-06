import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchChatSelectorComponent } from './twitch-chat-selector.component';

describe('TwitchChatSelectorComponent', () => {
  let component: TwitchChatSelectorComponent;
  let fixture: ComponentFixture<TwitchChatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwitchChatSelectorComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchChatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
