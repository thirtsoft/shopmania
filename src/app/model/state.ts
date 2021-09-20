import { CountryDto, Country } from './country';

export class State {
  idState: number;
  name: string;

  country: Country;
}

export class StateDto {
  idState: number;
  name: string;

  countryDto: CountryDto;
}
