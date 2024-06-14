import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BattleComponent } from './battle/battle.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonModule } from '../../shared/components/button/button.module';

const routes: Routes = [
  {
    path: '',
    component: BattleComponent,
  },
];

@NgModule({
  declarations: [BattleComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonToggleModule,
    ButtonModule,
  ],
})
export class GameModule {}