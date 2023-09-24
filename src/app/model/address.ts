import { State, StateDto } from './state';

export class AddressLivraisonDto {
  id: number;
  reference: string;
  rue: string;
  city: string;
  state1: string;
  country: string;
  zipCode: string;
  phone: string;

 // commandeDto: CommandeDto;
  stateDto: StateDto;
 // state: StateDto;


}
