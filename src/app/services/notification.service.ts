import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification, NotificationDto } from './../model/notification';
import { ArticleService } from './article.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiServerUrl = environment.apiBaseUrl;


  //apiServerUrl = "https://businesse-admin.herokuapp.com/shop-mania/v1";

  id: any;
  artId: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService,
              private artService: ArticleService
  ) {
  }

  public getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiServerUrl}/notifications/all`);
  }

  public getNotificationById(notificationId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiServerUrl}/notifications/${notificationId}`);
  }

  public addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiServerUrl}/notifications/create`, notification);
  }

  public updateNotification(notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiServerUrl}/notifications/create`, notification);
  }

  public deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notifications/delete/${notificationId}`);
  }

  /***************************** NotificationDTO */

  public getNotificationDtos(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/all`);
  }

  public getAllNotificationDtosOrderByIdDesc(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/searchAllNotificationsOrderByIdDesc`);
  }

  public getTop3RatingOrderByCreatedDateDesc(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/searchTop3RatingOrderByCreatedDateDesc`);
  }

  public getTop4RatingOrderByCreatedDateDescByProduct(noteId: string): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/searchTop4RatingOrderByCreatedDateDescByProductId/${noteId}`);
  }


  public getNotificationDtoById(notificationId: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiServerUrl}/notifications/findById/${notificationId}`);
  }

  public addNotificationDto(notificationDTO: NotificationDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiServerUrl}/notifications/create`, notificationDTO);
  }

  public addRatingToArticle(notificationDTO: NotificationDto, reference: string, userId:number): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiServerUrl}/notifications/createRatingToArticle?reference=${reference}&userId=${userId}`, notificationDTO);
  }

  public updateNotificationDto(notificationDTO: NotificationDto): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.apiServerUrl}/notifications/create`, notificationDTO);
  }

  public deleteNotificationDto(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notifications/delete/${notificationId}`);
  }

  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }



}
