import { AddressDto } from './address';
import { Utilisateur } from './utilisateur';
import { LigneCommande } from './ligne-commande';
import { Commande } from './commande';
import { Client } from './client';

export class Purchase {
  client: Client;
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  commande: Commande;
  lcomms: LigneCommande[];
  utilisateur: Utilisateur

}
