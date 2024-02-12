import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface' ;
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
  constructor(private http: HttpClient) { }

  private baseUrl: string= environments.baseUrl;

  getHeros():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById(id: string):Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined)) //se pone el of para volver el undefined un observable .
    )
  }

  getSuggestions(query:string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero)
  }

  updateHero(hero: Hero): Observable<Hero>{
    if (!hero.id) {
      throw Error('Hero id is requiered')
    }
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
  }

  deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    )
  }
}
