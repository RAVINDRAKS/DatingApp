import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MembersDetailResolver } from './_resolvers/members-detail.resolver';
import { MembersListResolver } from './_resolvers/members-list.resolver';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MembersEditResolver } from './_resolvers/members-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MembersListComponent, resolve: {users: MembersListResolver}},
      {path: 'members/:id', component: MembersDetailComponent, resolve: {user: MembersDetailResolver}},
      {path: 'member/edit', component: MembersEditComponent, resolve: {user: MembersEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
      {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
