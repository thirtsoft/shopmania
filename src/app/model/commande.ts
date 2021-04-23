import { Statuscommande } from './statuscommande';
import { Client } from './client';

export class Commande {
  idCommande: number;
  reference: string;
  numeroCommande: string;
  total: number;
  dateCommande: Date;

  statusCommande: Statuscommande;

  clientDto: Client;

}
