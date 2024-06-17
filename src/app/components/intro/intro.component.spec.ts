import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroComponent } from './intro.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { BattleComponent } from '../game/battle/battle.component';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroComponent, ButtonComponent],
      imports: [RouterModule.forRoot([
        { path: 'battle', component: BattleComponent }
       ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo image', () => {
    const img = fixture.debugElement.nativeElement.querySelector('[data-test="logo"]');
    expect(img['src']).toContain('logo.png');
  });

  it('should render introduction', () => {
    const intro = fixture.debugElement.nativeElement.querySelector('[data-test="introduction"]');
    expect(intro).toBeTruthy();
  });

  it('should render "play game" button', () => {
    const button = fixture.debugElement.nativeElement.querySelector('[data-test="play-button"]');
    expect(button.textContent).toContain('Play game');
  });
});
