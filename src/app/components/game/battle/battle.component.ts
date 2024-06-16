import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BattleResult, BattleType } from '../../../shared/enums/battle.enum';
import { ApiService } from '../../../shared/services/api.service';
import { combineLatest } from 'rxjs';
import { Player } from '../../../shared/interfaces/player.interface';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  battleType = BattleType;
  batttleResult = BattleResult;
  selectedBattleType: BattleType;
  peopleList: string[];
  starshipsList: string[];
  isLoading = true;
  players: Player[] = [];
  playersScores = [0, 0];

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    combineLatest([
      this.apiService.getPlayerIdList(BattleType.People),
      this.apiService.getPlayerIdList(BattleType.Starships),
    ]).subscribe(([people, starships]) => {
      this.isLoading = false;
      this.cd.markForCheck();
      this.peopleList = people;
      this.starshipsList = starships;
    });
  }

  public onFightClick(): void {
    this.isLoading = true;

    let selectedPlayersList: string[];
    switch(this.selectedBattleType) {
      case BattleType.People: {
        selectedPlayersList = this.peopleList;
        break;
      }
      case BattleType.Starships: {
        selectedPlayersList = this.starshipsList;
        break;
      }
      default: {
        selectedPlayersList = [];
      }
    }

    if (selectedPlayersList.length) {
      const randomPlayerId1 = this.getRandomPlayerId(selectedPlayersList);
      const randomPlayerId2 = this.getRandomPlayerId(selectedPlayersList);

      combineLatest([
        this.apiService.getPlayer(this.selectedBattleType, randomPlayerId1),
        this.apiService.getPlayer(this.selectedBattleType, randomPlayerId2),
      ]).subscribe(([player1, player2]) => {
        this.renderPlayerData(player1, player2);
        this.isLoading = false;
        this.cd.markForCheck();
      })
    }
  }

  public onBattleTypeChange(battleType: MatButtonToggleChange): void {
    this.selectedBattleType = battleType.value;
  }

  private renderPlayerData(player1: Player, player2: Player): void {
    this.players = [];

    let player1BattleResult = this.checkBattleResult(player1, player2);
    if (player1BattleResult === BattleResult.Win) {
      this.playersScores[0]++;
    }

    this.players.push({
      ...player1,
      battleResult: player1BattleResult,
    });

    let player2BattleResult = this.checkBattleResult(player2, player1);
    if (player2BattleResult === BattleResult.Win) {
      this.playersScores[1]++;
    }

    this.players.push({
      ...player2,
      battleResult: player2BattleResult,
    });
  }

  private checkBattleResult(player: Player, opponent: Player): BattleResult {
    let result: BattleResult;

    player.feature = player.feature.includes('-') ? player.feature.split('-')[1] : player.feature;
    opponent.feature = opponent.feature.includes('-') ? opponent.feature.split('-')[1] : opponent.feature;

    if (
      (player.feature === 'unknown' || opponent.feature === 'unknown') ||
      (player.feature === opponent.feature)
    ) {
      result = BattleResult.Draw;
    } else if (+player.feature.replace(',', '') > +opponent.feature.replace(',', '')) {
      result = BattleResult.Win;
    } else {
      result = BattleResult.Lose;
    }

    return result;
  }

  private getRandomPlayerId(playerList: string[]): string {
    return playerList[Math.floor(Math.random() * playerList.length)];
  }
}
