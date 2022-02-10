import { CountryDto, Country } from './country';

export class State {
  id: number;
  name: string;

  country: Country;
}

export class StateDto {
  id: number;
  name: string;

  countryDto: CountryDto;
}
