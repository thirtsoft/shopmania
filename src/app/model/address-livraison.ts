import { State, StateDto } from './state';
import { Commande, CommandeDto } from './commande';

export class AddressLivraison {
  id: number;
  reference: string;
  /* quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string; */

  street: string;
  country: string;
  city: string;
//  state: string;
  zipCode: string;

  commande: Commande;
  state: State;

}

export class AddressLivraisonDto {
  id: number;
 /*  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;
  street: string;*/
  rue: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  commandeDto: CommandeDto;
  stateDto: StateDto;

}
