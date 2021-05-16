import { Commande } from './commande';

export class AddressLivraison {
  id: number;
  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;

  commandeDto: Commande;

}
