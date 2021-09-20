import { LigneCommande } from './ligne-commande';
import { Commande } from './commande';
import { AddressLivraison } from './address-livraison';
import { Client } from './client';

export class Purchase {
  client: Client;
  shippingAddress: AddressLivraison;
  billingAddress: AddressLivraison;
  commande: Commande;
  lcomms: LigneCommande[];

}
