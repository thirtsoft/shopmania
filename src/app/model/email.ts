import { Newsletter, NewsletterDto } from './newsletter';
import { Fournisseur, FournisseurDto } from './fournisseur';

export class Email {
  id: number;
  customerName: string;
  recipient: string;
  subject: string;
  message: string;
  createDate: Date;
  email: string;

  four: Fournisseur;

  newsletter: Newsletter;

}

export class EmailDto {
  id: number;
  customerName: string;
  recipient: string;
  subject: string;
  message: string;
  createDate: Date;

  fournisseurDto: FournisseurDto;

  newsletterDto: NewsletterDto;

}



