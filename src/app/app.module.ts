// predefined modules of angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

//user defined modules are lazily loaded at runtime

//services for data interchange,spinner,http request,authentication
import { UserserviceService } from './service/userservice.service'
import { HttpserviceService } from './service/httpservice.service';
import { AuthService } from './service/auth.service';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { ArrayOperationService } from './service/array-operation.service'

//default components to be loaded at app startup
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBtnComponent } from './navbar/navbar-btn/navbar-btn.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component'
import { NavbarMenuComponent } from './navbar/navbar-menu/navbar-menu.component';

// reducer import
import { userReducer } from './reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarBtnComponent,
    NavbarMenuComponent,
    HomeComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    StoreModule.forRoot({ userData: userReducer }),
  ],
  providers: [UserserviceService, HttpserviceService, AuthService, ArrayOperationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
