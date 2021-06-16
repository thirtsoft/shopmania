import { ArticleDto } from './article';
export class CartItem {
  id: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;

  constructor (articleDTO: ArticleDto) {
    this.id = articleDTO.id;
    this.name = articleDTO.designation;
    this.image = articleDTO.photo;
    this.unitPrice = articleDTO.price;
    this.quantity = 1;
  }
}
