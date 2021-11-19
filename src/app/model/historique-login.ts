import { UtilisateurDto } from './utilisateur';
export class HistoriqueLogin {
  id: number;
  createdDate: Date;
  status: string;
  action: string;

  utilisateurDto: UtilisateurDto;
}

export class HistoriqueLoginDto {
  id: number;
  createdDate: Date;
  status: string;
  action: string;

  utilisateurDto: UtilisateurDto;
}

