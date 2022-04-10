import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-lik-hotspot',
  templateUrl: './lik-hotspot.component.html',
  styleUrls: ['./lik-hotspot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikHotspotComponent implements OnInit {
  @Input() public message = 'This is a message';
  @Input() public classes = 'relative-top';
  @Input() public shape = 'help-info';

  @Input() hidden = false;

  ngOnInit(): void {}

  onToggleHostpot(event: Event) {
    this.hidden = !this.hidden;
    event.preventDefault();
  }
}
