import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';
import { PortfolioComponent } from './view/portfolio.component';
import { ProjectModalComponent } from './../modal/project-modal/project-modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes:Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'edit', component: EditPortfolioComponent, canActivate: [AuthGuardGuard] },
]

@NgModule({
  declarations: [
    EditPortfolioComponent,
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
