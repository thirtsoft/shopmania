import { Role } from './role';

export class Utilisateur {
  id: number;
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

export interface IUser {
  id?: any;
  name?: string;
  username?: string;
  genre?: string;
  cni?: string;
  address?: string;
  mobile?: string;
  email?: string;
  roles?: Role[];
  photo?: string;
  password?: string;
  confirmPassword?: string;
  active?: boolean;
}

export class UtilisateurDto implements IUser {
  /* id: number;
  name: string;
  username: string;
  mobile: string;
  email: string;
  address: string;
  password: string;
  photo: string;
  activated: boolean = false; */

  constructor(
    public id?: any,
    public name?: string,
    public username?: string,
    public genre?: string,
    public cni?: string,
    public address?: string,
    public mobile?: string,
    public email?: string,
    public roles?: Role[],
    public photo?: string,
    public password?: string,
    public confirmPassword?: string,
    public active?: boolean
) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.username = username ? username : null;
    this.genre = genre ? genre : null;
    this.cni = cni ? cni : null;
    this.address = address ? address : null;
    this.mobile = mobile ? mobile : null;
    this.email = email ? email : null;
    this.roles = roles ? roles : null;
    this.photo = photo ? photo : null;
    this.password = password ? password : null;
    this.confirmPassword = confirmPassword ? confirmPassword : null;
    this.active = active ? active : null;
  }


}
