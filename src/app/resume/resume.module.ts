import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { ResumeComponent } from './view/resume.component';
import { EducationComponent } from './view/education/education.component';
import { ExperienceComponent } from './view/experience/experience.component';
import { TestimonialComponent } from './view/testimonial/testimonial.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes:Routes = [
  { path: '', component: ResumeComponent },
  { path: 'edit', component: EditResumeComponent, canActivate: [AuthGuardGuard] },
]

@NgModule({
  declarations: [
    EditResumeComponent,
    ResumeComponent,
    EducationComponent,
    ExperienceComponent,
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    OwlModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ResumeModule { }
