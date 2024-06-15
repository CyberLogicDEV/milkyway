import { BattleResult } from "../enums/battle.enum"

export interface Player {
    name: string,
    feature: string
    battleResult?: BattleResult,
}
