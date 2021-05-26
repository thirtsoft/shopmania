import { Client, ClientDto } from './client';

export class AddressClient {
  id: number;
  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;

  client: Client;

}

export class AddressClientDto {
  id: number;
  reference: string;
  quartier: string;
  phone: string;
  city: string;
  rue: string;
  country: string;

  clientDto: ClientDto;

}
