import { Utilisateur } from './utilisateur';
import { Article } from './article';

export class Notification {
  idNotification: number;
  reference: string;
  nbreEtoile: string;
  observation: string;

  articleDto: Article;

  utilisateur: Utilisateur;

}
