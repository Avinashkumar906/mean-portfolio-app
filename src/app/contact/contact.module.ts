import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ContactComponent } from './view/contact.component';
import { EditComponent } from './edit/edit.component';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes:Routes = [
  { path: '', component: ContactComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuardGuard] },
]

@NgModule({
  declarations: [
    ContactComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
