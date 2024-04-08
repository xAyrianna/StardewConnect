import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse, Event, Town } from '@StardewConnect/libs/data';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TownService {
  BASE_URL = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAllTowns(): Observable<Town[]>{
    const townUrl = this.BASE_URL + '/town';

    return this.http.get<ApiResponse<Town[]>>(townUrl).pipe(
      map((response: ApiResponse<Town[]>) => response.results),
      tap((towns: Town[]) => {
        return towns;
      })
    );
  }


  getTownByName(name: string): Observable<Town> {
    const townUrl = this.BASE_URL + '/town/' + name;
    return this.http
      .get<ApiResponse<Town>>(townUrl)
      .pipe(map((response: ApiResponse<Town>) => response.results));
  }

  getTownById(id: string): Observable<Town> {
    const townUrl = this.BASE_URL + '/town/id/' + id;
    return this.http
      .get<ApiResponse<Town>>(townUrl)
      .pipe(map((response: ApiResponse<Town>) => response.results));
  }

  addTown(newTown: Town): Observable<Town> {
    const townUrl = this.BASE_URL + '/town';
    return this.http.post<Town>(townUrl, newTown);
  }

  updateTown(updatedTown: Town): Observable<Town> {
    const townUrl = this.BASE_URL + '/town';
    return this.http.put<Town>(townUrl, updatedTown);
  }

  deleteTown(deletedTown: Town) {
    // delete town
    const townUrl = this.BASE_URL + '/town';
    const options = {
      body: deletedTown,
    };
    return this.http.delete<Town>(townUrl, options);
  }
}

