import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_service/auth.service';
import { ErrorInterceptorProvider } from './_service/error.interceptor';
import { AlertifyjsService } from './_service/alertifyjs.service';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_service/user.service';
import { MembersCardComponent } from './members/members-card/members-card.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MembersDetailResolver } from './_resolvers/members-detail.resolver';
import { MembersListResolver } from './_resolvers/members-list.resolver';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MembersEditResolver } from './_resolvers/members-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';



export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersListComponent,
    ListsComponent,
    MessagesComponent,
    MembersCardComponent,
    MembersDetailComponent,
    MembersEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
        config: {
          tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
    }),
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyjsService,
    AuthGuard,
    UserService,
    MembersDetailResolver,
    MembersListResolver,
    MembersEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
