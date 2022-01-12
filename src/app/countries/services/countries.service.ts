import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountriesSmall, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  private base: string = 'https://restcountries.com/v2';
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(
    private http: HttpClient,
  ) { }


  get regions(): string[] {
    return [...this._regions];
  }

  countriesByRegion(region: string): Observable<CountriesSmall[]> {
    const url: string = `${this.base}/region/${region}?fields=alpha3Code,name`;
    
    return this.http.get<CountriesSmall[]>(url);
  }
    
  getCountryByCode(code: string): Observable<Country>  {
    const url: string = `${this.base}/alpha?codes=${code}`;    
    return this.http.get<Country>(url);
  }
    
}
