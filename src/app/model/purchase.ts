import { AddressLivraisonDto } from './address';
import { Utilisateur } from './utilisateur';
import { LigneCommande } from './ligne-commande';
import { Commande } from './commande';
import { Client } from './client';

export class Purchase {
  client: Client;
  /*
  shippingAddress: Address;
  billingAddress: Address;*/
  shippingAddress: AddressLivraisonDto;
  billingAddress: AddressLivraisonDto;
//  billingAddress: AddressDto;
  commande: Commande;
  lcomms: LigneCommande[];
  utilisateur: Utilisateur

}
