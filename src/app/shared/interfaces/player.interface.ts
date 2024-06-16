import { BattleResult, BattleType } from "../enums/battle.enum"

export interface Player {
    name: string;
    description: string;
    feature: string;
    type: BattleType;
    score?: number;
    battleResult?: BattleResult;
}
