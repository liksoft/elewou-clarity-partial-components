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
  @Input() public message = '';
  @Input() public classes = '';
  @Input() public shape = 'help-info';
  @Input() public close = 'times';

  @Input() hidden = true;

  ngOnInit(): void {}

  onToggleHostpot(event: Event) {
    this.hidden = !this.hidden;
    event.preventDefault();
  }
}
