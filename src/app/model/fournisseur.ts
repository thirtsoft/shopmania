import { Article } from './article';

export class Fournisseur {
  idFournisseur: number;
  reference: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  telephoneFournisseur: string;
  city: string;
  country: string;

  article: Article;

}
