import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BattleComponent } from './battle.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Player } from '../../../shared/interfaces/player.interface';
import { BattleResult, BattleType } from '../../../shared/enums/battle.enum';
import { of } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';

describe('BattleComponent', () => {
  const MOCK_BATTLE_TYPE = BattleType.People;
  const PLAYER1: Player = {
    name: 'player name',
    description: 'player description',
    feature: '123',
    type: BattleType.People,
    battleResult: BattleResult.Win,
    score: 1,
  }
  const PLAYER2: Player = {
    name: 'player name2',
    description: 'player description2',
    feature: '1234',
    type: BattleType.People,
    battleResult: BattleResult.Lose,
    score: 2,
  }
  const PLAYER_LIST: string[] = ['2', '3', '5'];
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleComponent],
      providers: [HttpClient, HttpHandler],
      imports: [MatButtonToggleModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo image', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    fixture.detectChanges();
    const img = fixture.debugElement.nativeElement.querySelector('[data-test="logo"]');
    expect(img['src']).toContain('logo.png');
  });

  it('should call "renderPlayerData" after "onFightClick" call', fakeAsync(() => {
    const toggleSpy = spyOn<any>(component, 'renderPlayerData');
    spyOn(apiService, 'getPlayer').and.returnValue(of(PLAYER1));
    component.peopleList = PLAYER_LIST;
    component.starshipsList = PLAYER_LIST;
    component.selectedBattleType = MOCK_BATTLE_TYPE;
    
    component.onFightClick();
    expect(toggleSpy).toHaveBeenCalled()
  }));

  it('should set "player1" and "player2" after "renderPlayerData" call', () => {
    component['renderPlayerData'](PLAYER1, PLAYER2);
    expect(component.players.length === 2).toBeTruthy();
  });

  it('should check battle result after "checkBattleResult" call', () => {
    let result = component['checkBattleResult'](PLAYER1, PLAYER2);
    expect(result).toBe(BattleResult.Lose);

    let result2 = component['checkBattleResult'](PLAYER2, PLAYER1);
    expect(result2).toBe(BattleResult.Win);
  });

  it('should get random player id after "getRandomPlayerId" call', () => {
    let result = component['getRandomPlayerId'](PLAYER_LIST);
    expect(PLAYER_LIST.includes(result)).toBeTruthy();;
  });
});
