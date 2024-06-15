import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BattleType } from '../../../shared/enums/battle.enum';
import { ApiService } from '../../../shared/services/api.service';
import { combineLatest } from 'rxjs';
import { Player } from '../../../shared/interfaces/player.interface';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {
  battleType: BattleType;
  peopleList: string[];
  starshipsList: string[];
  isLoading = true;
  players: Player[];

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    combineLatest([
      this.apiService.getPlayerIdList(BattleType.People),
      this.apiService.getPlayerIdList(BattleType.Starships),
    ]).subscribe(([people, starships]) => {
      this.isLoading = false;
      this.peopleList = people;
      this.starshipsList = starships;
    });
  }

  public onFightClick(): void {
    this.isLoading = true;

    let selectedOpponentsList: string[];
    switch(this.battleType) {
      case BattleType.People: {
        selectedOpponentsList = this.peopleList;
        break;
      }
      case BattleType.Starships: {
        selectedOpponentsList = this.starshipsList;
        break;
      }
      default: {
        selectedOpponentsList = [];
      }
    }

    if (selectedOpponentsList.length) {
      const randomPlayerId1 = selectedOpponentsList[Math.floor(Math.random() * selectedOpponentsList.length)];
      const randomPlayerId2 = selectedOpponentsList[Math.floor(Math.random() * selectedOpponentsList.length)];

      combineLatest([
        this.apiService.getPlayer(this.battleType, randomPlayerId1),
        this.apiService.getPlayer(this.battleType, randomPlayerId2),
      ]).subscribe(([player1, player2]) => {
        this.isLoading = false;
        this.renderPlayerCard(player1, player2);
      })
    }
  }

  public onBattleTypeChange(battleType: MatButtonToggleChange): void {
    this.battleType = battleType.value;
  }

  private renderPlayerCard(player1: Player, player2: Player): void {

  }
}
