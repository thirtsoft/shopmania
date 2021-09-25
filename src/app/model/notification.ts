import { Utilisateur, UtilisateurDto } from './utilisateur';
import { Article, ArticleDto } from './article';

export class Notification {
  id: number;
  nbreEtoile: string;
  observation: string;

  createdDate: Date;

  article: Article;

  utilisateur: Utilisateur;

}

export class NotificationDto {
  id: number;
  nbreEtoile: number;
  observation: string;

  createdDate: Date;

  articleDto: ArticleDto;

  utilisateurDto: UtilisateurDto;


}
