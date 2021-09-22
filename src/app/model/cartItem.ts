import { ArticleDto, Article } from './article';
export class CartItem {
  id: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;

  /* constructor (article: Article) {
    this.id = article.id;
    this.name = article.designation;
    this.image = article.photo;
    this.unitPrice = article.price;
    this.quantity = 1;
  }
 */
   constructor (articleDTO: ArticleDto) {
    this.id = articleDTO.id;
    this.name = articleDTO.designation;
    this.image = articleDTO.photo;
    this.unitPrice = articleDTO.price;
    this.quantity = 1;
  }


}
