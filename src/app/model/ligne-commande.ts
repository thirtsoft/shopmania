import { Article } from './article';
import { Commande } from './commande';

export class LigneCommande {
  id: number;
  numero: number;
  price: number;
  quantity: number;

  commande: Commande;

  article: Article;

}
