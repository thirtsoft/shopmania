import { Utilisateur } from './utilisateur';
import { Article } from './article';

export class Notification {
  id: number;
  reference: string;
  nbreEtoile: string;
  observation: string;

  articleDto: Article;

  utilisateur: Utilisateur;

}
