import { Commande, CommandeDto } from './commande';

export class AddressLivraison {
  id: number;
  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;

  commande: Commande;

}

export class AddressLivraisonDto {
  id: number;
  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;

  commandeDto: CommandeDto;

}
