import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { PortfolioComponent } from './view/portfolio.component';
import { ProjectModalComponent } from './../modal/project-modal/project-modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes:Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'edit', component: PortfolioComponent, canActivate: [AuthGuardGuard] },
]

@NgModule({
  declarations: [
    PortfolioComponent,
    ProjectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxSmartModalModule
  ]
})
export class PortfolioModule { }
