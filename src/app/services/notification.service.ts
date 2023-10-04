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

  id: any;
  artId: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService,
              private artService: ArticleService
  ) {
  }

  public getTop3RatingOrderByCreatedDateDesc(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/search-top3-rating-order-by-createdDateDesc`);
  }

  public getTop4RatingOrderByCreatedDateDescByProduct(noteId: string): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/search-top4-rating-order-by-createdDateDesc-by-productId/${noteId}`);
  }

  public getAllActiveNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.apiServerUrl}/notifications/search-all-active-notifications`);
  }

  public getNotificationDtoById(notificationId: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.apiServerUrl}/notifications/findById/${notificationId}`);
  }

  public addNotificationDto(notificationDTO: NotificationDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiServerUrl}/notifications/create`, notificationDTO);
  }

  public addRatingToArticle(notificationDTO: NotificationDto, reference: string, userId:number): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.apiServerUrl}/notifications/create-rating-to-article?reference=${reference}&id=${userId}`, notificationDTO);
  }

  getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }

  public deleteNotificationById(ratingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notifications/delete-notification/${ratingId}`);
  }



}
