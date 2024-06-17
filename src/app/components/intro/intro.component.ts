import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {

}
