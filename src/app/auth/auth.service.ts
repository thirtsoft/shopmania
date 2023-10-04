import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Register } from './register';
import { ProfilInfo, UpdatePasswordInfo, UpdateUsernameInfo, UpdateProfilInfo, UpdatePasswordUser, UpdateUsernameUser } from './profil-info';
import { UtilisateurDto } from './../model/utilisateur';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from './login';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;
  listData: UtilisateurDto;
  listDataUsername: UpdateUsernameInfo;

  listDataProfil: ProfilInfo;

  islogin = false ;

  profileInfo: ProfilInfo = {} as ProfilInfo;
  userId;
  user;
  currentUser = {};

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  signUp(info: Register): Observable<Register> { 
    return this.http.post<Register>(this.apiServerUrl + '/auth/signUp', info , httpOptions);
  }

  attemptAuth(credentials: Login): Observable<any> {
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };
    return this.http.post(this.apiServerUrl + '/auth/authenticated', loginData, httpOptions);
    this.islogin=true;
  }

  getCurrentUser(){
    return this.http.get(this.apiServerUrl + '/auth/currentUser');
  }

  getCurrentLogginUser(){
    return this.http.get(this.apiServerUrl + '/auth/currentLogginUser');
  }

  getUserProfile(id): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/${id}`, httpOptions).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/search-utilisateur-by-usernam/${username}`);
  }

  getUserById(id: any) {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/findById/${id}`);
  }

  public updateProfil(userId: number, userDTO: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    return this.http.put<UpdateProfilInfo>(`${this.apiServerUrl}/utilisateurs/update/${userId}`, userDTO);
  }


  updateCustomerProfil(item: UpdateProfilInfo): Observable<UpdateProfilInfo> {
    const urlUpdateUserProfile = (`${this.apiServerUrl}/utilisateurs/update-customer-profile-by-username/`);
    return this.http.patch<UpdateProfilInfo>(urlUpdateUserProfile, {
      id: item.id,
      oldUsername: item.oldUsername,
      name: item.name,
      username: item.username,
      email: item.email,
      mobile: item.mobile,
    }, httpOptions);

  }

  updateUsername(item: UpdateUsernameInfo): Observable<UpdateUsernameInfo> {
    const urlUpdateUsername = (`${this.apiServerUrl}/utilisateurs/update-username-of-user-by-username`);
    return this.http.patch<UpdateUsernameInfo>(urlUpdateUsername, {
      username: item.username,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updateUsernameByUserId(item: UpdateUsernameUser): Observable<UpdateUsernameUser> {
    const urlUpdateUsername = (`${this.apiServerUrl}/utilisateurs/update-username-of-user-byId`);
    return this.http.patch<UpdateUsernameUser>(urlUpdateUsername, {
      id: item.id,
      newUsername: item.newUsername
    }, httpOptions);

  }

  updatePassword(item: UpdatePasswordInfo): Observable<UpdatePasswordInfo> {
    const urlUpdatePassword = (`${this.apiServerUrl}/utilisateurs/update-password-by-username`);
    return this.http.patch<UpdatePasswordInfo>(urlUpdatePassword, {
      username: item.username,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }

  updatePasswordByUserId(item: UpdatePasswordUser): Observable<UpdatePasswordUser> {
    const urlUpdatePassword = (`${this.apiServerUrl}/utilisateurs/update-password-by-userId`);
    return this.http.patch<UpdatePasswordUser>(urlUpdatePassword, {
      userId: item.id,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword
    }, httpOptions);
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
