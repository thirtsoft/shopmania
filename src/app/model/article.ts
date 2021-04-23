import { Scategory } from './scategory';

export class Article {
  idArticle: number;
  reference: string;
  designation: string;
  quantity: number;
  price: number;
  currentPrice: number;
  promo: boolean;
  selected: boolean;
  description: string;
  photo: string;

  scategorie: Scategory;

}
