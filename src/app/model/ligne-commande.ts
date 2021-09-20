import { CartItem } from './cartItem';
import { Article, ArticleDto } from './article';
import { Commande, CommandeDto } from './commande';

export class LigneCommande {
  id: number;
  imageUrl: string;
  numero: number;
  price: number;
  quantity: number;
  productId: number;

  commande: Commande;

  article: Article;

  constructor(cartItem: CartItem){
    this.imageUrl = cartItem.image;
    this.price = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
}

}

export class LigneCommandeDto {
  id: number;
  imageUrl: string;
  numero: number;
  price: number;
  quantity: number;
  productId: number;

  commandeDto: CommandeDto;

  articleDto: ArticleDto;

  constructor(cartItem: CartItem){
    this.imageUrl = cartItem.image;
    this.price = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }

}
