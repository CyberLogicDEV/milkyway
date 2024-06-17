import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../interfaces/player.interface';
import { BattleType } from '../enums/battle.enum';
import { of } from 'rxjs';
import { PersonDto } from '../interfaces/api-dto.interface';

class FakeHttp {
    get(url, options) {}
}

describe('ApiService', () => {
    const PLAYER_DTO: PersonDto = {
        "message": "ok",
        "result": {
            "properties": {
                "height": "96",
                "mass": "32",
                "hair_color": "n/a",
                "skin_color": "white, blue",
                "eye_color": "red",
                "birth_year": "33BBY",
                "gender": "n/a",
                "created": "2024-06-13T18:19:39.543Z",
                "edited": "2024-06-13T18:19:39.543Z",
                "name": "R2-D2",
                "homeworld": "https://www.swapi.tech/api/planets/8",
                "url": "https://www.swapi.tech/api/people/3"
            },
            "description": "A person within the Star Wars universe",
            "_id": "5f63a36eee9fd7000499be44",
            "uid": "3",
            "__v": 0
        }
    }
    const PLAYER: Player = {
        name: 'R2-D2',
        description: 'A person within the Star Wars universe',
        feature: '32',
        type: BattleType.People,
    }

    const PLAYER_LIST_DTO = {
        "message": "ok",
        "total_records": 82,
        "total_pages": 9,
        "previous": null,
        "next": null,
        "results": [
          {
            "uid": "2",
            "name": "Luke Skywalker",
            "url": "https://www.swapi.tech/api/people/1"
          },
          {
            "uid": "3",
            "name": "C-3PO",
            "url": "https://www.swapi.tech/api/people/2"
          },
          {
            "uid": "5",
            "name": "R2-D2",
            "url": "https://www.swapi.tech/api/people/3"
          }
        ]
    }
    const API_URL = 'https://www.swapi.tech/api/people';
    let apiService: ApiService, http: HttpClient;
    let playerList: string[] = ['2', '3', '5'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ApiService,
              { provide: HttpClient, useClass: FakeHttp }
            ]
          });
        apiService = TestBed.get(ApiService);
        http = TestBed.get(HttpClient);
    });

    it('should be created', () => {
        expect(apiService).toBeTruthy();
    });

    it('should getPlayer make GET request to API', () => {
        spyOn(http, 'get').and.returnValue(of(PLAYER_DTO));
        apiService.getPlayer(BattleType.People, '1');
        expect(http.get).toHaveBeenCalledWith(`${API_URL}/1`);
    });

    it('should getPlayer return player data from API', () => {
        spyOn(http, 'get').and.returnValue(of(PLAYER_DTO));

        apiService.getPlayer(BattleType.People, '1').subscribe((player) => {
            expect(player).toEqual(PLAYER);
        });
    });

    it('should getPlayerIdList make GET request to API', () => {
        spyOn(http, 'get').and.returnValue(of(PLAYER_LIST_DTO));
        apiService.getPlayerIdList(BattleType.People);
        const PAGE = 'page';
        const LIMIT = 'limit';
        const LIMIT_VALUE = 10;
        const PAGE_VALUE = 1;
        let params = new HttpParams().set(PAGE, PAGE_VALUE).set(LIMIT, LIMIT_VALUE);
        expect(http.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it('should getPlayerIdList return player list from API', () => {
        spyOn(http, 'get').and.returnValue(of(PLAYER_LIST_DTO));

        apiService.getPlayerIdList(BattleType.People).subscribe((list) => {
            expect(list).toEqual(playerList);
        });
    });
});
