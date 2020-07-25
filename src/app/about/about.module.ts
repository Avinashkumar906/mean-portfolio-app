import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AboutComponent } from './view/about.component';
import { IntroComponent } from './view/intro/intro.component';
import { ServiceComponent } from './view/service/service.component';
import { SkillComponent } from './view/skill/skill.component';
import { PricingComponent } from './view/pricing/pricing.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes:Routes = [
  { path: '', component: AboutComponent },
  { path: 'edit', component: AboutComponent, canActivate: [AuthGuardGuard] },
]

@NgModule({
  declarations: [
    AboutComponent,
    IntroComponent,
    ServiceComponent,
    SkillComponent,
    PricingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AboutModule { }
