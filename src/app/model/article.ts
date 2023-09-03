import { Scategory, ScategoryDto } from './scategory';
export class Article {
  id: number;
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

export class ArticleDto {
  id: number;
  reference: string;
  designation: string;
  quantity: number;
  price: number;
  currentPrice: number;
  promo: boolean;
  selected: boolean;
  description: string;
  manufactured: string;
  photo: string;
  quantite: number = 1;

  scategoryDto: ScategoryDto;

}
