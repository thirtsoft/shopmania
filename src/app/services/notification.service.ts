import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Notification, NotificationDto } from './../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
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

  public getNotificationDtoById(notificationId: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiServerUrl}/notifications/${notificationId}`);
  }

  public addNotificationDto(notificationDTO: NotificationDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiServerUrl}/notifications/create`, notificationDTO);
  }

  public updateNotificationDto(notificationDTO: NotificationDto): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.apiServerUrl}/notifications/create`, notificationDTO);
  }

  public deleteNotificationDto(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notifications/delete/${notificationId}`);
  }


}
