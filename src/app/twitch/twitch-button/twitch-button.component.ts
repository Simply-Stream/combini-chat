import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-twitch-button',
  template: `
    <div [class]="position">
      <button class="btn btn-twitch-primary" (click)="onClick()">{{ label }}</button>
    </div>
  `,
  styleUrls: ['./twitch-button.component.scss'],
})
export class TwitchButtonComponent implements OnInit {
  @Input()
  /**
   * Valid positions:
   * - start
   * - center
   * - end
   */
  public position: string;

  @Input()
  public label: string;

  @Output()
  public clickAction: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    if (this.position) {
      this.position = `text-${ this.position }`;
    }
  }

  public onClick(): void {
    this.clickAction.emit();
  }
}
