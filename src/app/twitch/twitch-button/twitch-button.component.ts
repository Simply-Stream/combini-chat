import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-twitch-button',
  template: `
    <div [class]="position">
      <button [class.btn-twitch-disabled]="disabled"
              [disabled]="disabled"
              (click)="onClick()"
              class="btn btn-twitch-primary">
        <fa-icon *ngIf="icon" [icon]="icon"></fa-icon>
        {{ label }}
      </button>
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

  @Input()
  public icon: IconProp;

  @Input()
  public disabled: boolean = false;

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
