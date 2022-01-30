import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-lik-hotspot',
  templateUrl: './lik-hotspot.component.html',
  styleUrls: ['./lik-hotspot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikHotspotComponent implements OnInit {

  constructor() { }
  @Input() public message = "This is a message";
  @Input() public classes = "relative-top slide-up iterate-animation";

  ngOnInit(): void {
  }

}
