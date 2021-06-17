import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';

/* import { MatCarouselModule } from '@ngmodule/material-carousel'; */


import { FrontRoutingModule } from './front/front-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MaterialModule } from './shared/material.module';
import { DialogConfirmComponent } from './shared/dialog-confirm/dialog-confirm.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefautLayoutComponent } from './layouts/defaut-layout/defaut-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    DefautLayoutComponent,
    AdminLayoutComponent,
    DialogConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDialogModule,
    FrontRoutingModule,
    AdminRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),

    /* MatCarouselModule.forRoot(), */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
