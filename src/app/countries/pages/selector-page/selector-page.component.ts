import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountriesSmall, Country } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  
  regions: string[] = [];
  countries: CountriesSmall[] = [];
  countryCharacters: any = [];
  borders: any;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  
  ) { }

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    //one way to disabled border field, untill the country is selected
    /* borders: [
      {
        value: '',
        disabled: true
      },
      Validators.required], */
    borders: ['', Validators.required]
  })

  

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    this.getCountries()    
  }

  getCountries() {
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap(() => {
          this.myForm.get('country')?.reset('');
          this.loading = true;
          //this.myForm.controls['borders'].disable(); //one way to disabled border field, untill the country is selected

        }),
        switchMap(region => this.countriesService.countriesByRegion(region))
      )
      .subscribe(countries => {
        this.countries = countries;
        this.loading = false;
      })
      
    this.myForm.get('country')?.valueChanges
        
      .pipe(
        tap(() => {
          this.borders = [];
          this.myForm.get('borders')?.reset('');
          this.loading = true;
          //this.myForm.controls['borders'].enable() //one way to disabled border field, untill the country is selected

        }),
        switchMap(code => this.countriesService.getCountryByCode(code))
      )
      .subscribe(country => {
        this.countryCharacters = country;
        this.borders = this.countryCharacters[0].borders
        this.loading = false;
      })
  }
    
  onSave() {
    console.log(this.myForm.value);
  }


}
