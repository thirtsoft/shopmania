import { Statuscommande } from './statuscommande';
import { Client } from './client';

export class Commande {
  id: number;
  reference: string;
  numeroCommande: string;
  total: number;
  dateCommande: Date;

  statusCommande: Statuscommande;

  clientDto: Client;

}
