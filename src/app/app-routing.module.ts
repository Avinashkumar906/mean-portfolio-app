import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'index', component:  HomeComponent},
  { path: 'about', loadChildren:'./about/about.module#AboutModule'},
  { path: 'resume', loadChildren:'./resume/resume.module#ResumeModule'},
  { path: 'portfolio', loadChildren:'./portfolio/portfolio.module#PortfolioModule'},
  { path: 'contact', loadChildren:'./contact/contact.module#ContactModule'},
  { path: '**' , redirectTo: 'index'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
