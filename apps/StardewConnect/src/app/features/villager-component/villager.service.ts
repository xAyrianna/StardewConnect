import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Villager } from '@StardewConnect/libs/data';

@Injectable({
  providedIn: 'root'
})
export class VillagerService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllVillagers(): Observable<Villager[]> {
    const villagerUrl = this.BASE_URL + '/villager';

    console.log('get ' + villagerUrl);
    return this.http.get<ApiResponse<Villager[]>>(villagerUrl).pipe(
      map((response: ApiResponse<Villager[]>) => response.results),
      tap((villagers: Villager[]) => {
        console.log(villagers);
        return villagers;
      })
    );
  }

  getVillagerByName(name: string): Observable<Villager> {
    const villagerUrl = this.BASE_URL + '/villager/' + name;
    return this.http
      .get<ApiResponse<Villager>>(villagerUrl)
      .pipe(map((response: ApiResponse<Villager>) => response.results));
  }

  addVillager(newvillager: Villager): Observable<Villager> {
    const villagerUrl = this.BASE_URL + '/villager';
    return this.http.post<Villager>(villagerUrl, newvillager);
  }

  updateVillager(updatedvillager: Villager): Observable<Villager> {
    console.log('Updating ' + updatedvillager);
    const villagerUrl = this.BASE_URL + '/villager';
    return this.http.put<Villager>(villagerUrl, updatedvillager);
  }

  deleteVillager(deletedvillager: Villager) {
    // delete villager
    const villagerUrl = this.BASE_URL + '/villager';
    const options = {
      body: deletedvillager,
    };
    console.log(options);
    return this.http.delete<Villager>(villagerUrl, options);
  }

  befriendVillager(villager: Villager) {
    const villagerUrl = this.BASE_URL + '/villager/' + villager._id;
    return this.http.post<Villager>(villagerUrl, {});
  }

  unfriendVillager(villager: Villager) {
    const villagerUrl = this.BASE_URL + '/villager/' + villager._id;
    return this.http.delete<Villager>(villagerUrl);
  }

  updateVillagerHearts(villager: Villager) {
    const villagerUrl = this.BASE_URL + '/villager/hearts/' + villager._id;
    return this.http.put<Villager>(villagerUrl, {});
  }

  getFriends(): Observable<Villager[]> {
    const villagerUrl = this.BASE_URL + '/villager/friends';
    return this.http.get<ApiResponse<Villager[]>>(villagerUrl).pipe(
      map((response: ApiResponse<Villager[]>) => response.results),
      tap((villagers: Villager[]) => {
        console.log(villagers);
        return villagers;
      })
    );
  }

  checkIfFriends(villager: Villager): Observable<boolean> {
    const villagerUrl = this.BASE_URL + '/villager/check/' + villager._id;
    return this.http.get<boolean>(villagerUrl);
  }

  getHearts(villager: Villager): Observable<number> {
    const villagerUrl = this.BASE_URL + '/villager/hearts/' + villager._id;
    return this.http.get<number>(villagerUrl);
  }
}