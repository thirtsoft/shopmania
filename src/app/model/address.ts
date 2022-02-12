import { State, StateDto } from './state';
import { Commande, CommandeDto } from './commande';

export class Address {
  id: number;
  reference: string;

  street: string;
  country: string;
  city: string;
//  state: string;
  zipCode: string;

  commande: Commande;

  state: State;

}

export class AddressDto {
  id: number;
  rue: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  commandeDto: CommandeDto;
  stateDto: StateDto;

}
