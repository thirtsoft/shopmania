import { Statuscommande } from './statuscommande';
import { Client, ClientDto } from './client';

export class Commande {
  id: number;
  reference: string;
  numeroCommande: string;
  total: number;
  dateCommande: Date;

  statusCommande: Statuscommande;

  client: Client;

}

export class CommandeDto {

  id: number;
  reference: string;
  numeroCommande: string;
  total: number;
  dateCommande: Date;

  statusCommande: Statuscommande;

  clientDto: ClientDto;

}
