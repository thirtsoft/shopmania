import { Article, ArticleDto } from './article';
import { Commande, CommandeDto } from './commande';

export class LigneCommande {
  id: number;
  numero: number;
  price: number;
  quantity: number;

  commande: Commande;

  article: Article;

}

export class LigneCommandeDto {
  id: number;
  numero: number;
  price: number;
  quantity: number;

  commandeDto: CommandeDto;

  articleDto: ArticleDto;

}
