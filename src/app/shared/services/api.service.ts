import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, expand, map, reduce, takeWhile } from 'rxjs/operators';
import { PersonDto, PlayerListDto, StarshipDto } from '../interfaces/api-dto.interface';
import { BattleType } from '../enums/battle.enum';
import { Player } from '../interfaces/player.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://www.swapi.tech/api/';

    constructor(private http: HttpClient) { }

    getPlayer(battleType: BattleType, id: string): Observable<Player> {
        return this.http.get<PersonDto | StarshipDto>(this.apiUrl + `${battleType}/${id}`).pipe(
            map((player: PersonDto | StarshipDto) => {
                return {
                    name: player.result.properties.name,
                    feature: battleType === BattleType.People ?
                        (player as PersonDto).result.properties.mass :
                        (player as StarshipDto).result.properties.crew
                }
            }),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(() => new Error(error.message));
            })
        );
    }

    getPlayerIdList(battleType: BattleType): Observable<string[]> {
        const PAGE = 'page';
        const LIMIT = 'limit';
        const LIMIT_VALUE = 10;
        let page = 1;
        let params = new HttpParams().set(PAGE, page).set(LIMIT, LIMIT_VALUE);

        return this.http.get<PlayerListDto>(this.apiUrl + battleType, { params }).pipe(
            expand(response => {
                page++;
                params = new HttpParams().set(PAGE, page).set(LIMIT, LIMIT_VALUE);
                return this.http.get<PlayerListDto>(this.apiUrl + battleType, { params });
            }),
            takeWhile(response => !!response.next, true),
            reduce((arr, item) => {
                item.results.forEach(result => {
                    arr.push(result.uid);
                });
                return arr;
            }, [] as string[]),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(() => new Error(error.message));
            })
        );
    }
}
