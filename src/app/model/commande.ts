import { Utilisateur, UtilisateurDto } from './utilisateur';
import { LigneCommande } from './ligne-commande';
import { AddressLivraisonDto } from './address';
import { Statuscommande } from './statuscommande';
import { Client, ClientDto } from './client';

export class Commande {
  id: number;
  reference: string;
  totalQuantity: number;
  numeroCommande: string;
  totalCommande: number;
  total: number;
  dateCommande: Date;
  userId: number;
  username: string;

  statusCommande: Statuscommande;

  client: Client;

  utilisateur: Utilisateur;

}

export class CommandeDto {

  id: number;
  reference: string;
  numeroCommande: string;
  totalQuantity: number;
  total: number;
  totalCommande: number;
  dateCommande: Date;

  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;


  statusCommande: Statuscommande;

  status: string;

  clientDto: ClientDto;

  utilisateurDto: UtilisateurDto;
/*
  billingAddressDto: AddressDto;

  shippingAddressDto: AddressDto;*/

  billingAddressDto: AddressLivraisonDto;

  shippingAddressDto: AddressLivraisonDto;


  lcomms :Array<LigneCommande>=[];


}
