import { Role } from './role';

export class Utilisateur {
  idUtilisateur: number;
  name: string;
  username: string;
  mobile: string;
  email: string;
  address: string;
  password: string;
  photo: string;
  activated: boolean = false;

  role: Role;


}
