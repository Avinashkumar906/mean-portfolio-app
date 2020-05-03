import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';
import { User } from '../class/user';
import { Subscription } from 'rxjs';
import { Particle } from './particle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  bgImageUrl:string = 'url(./assets/img/asquarecf.jpg)';
  
  constructor(
    private userService: UserserviceService,
  ) {}
  
  private userSubscription:Subscription;
  user:User = this.userService.getUser() ? this.userService.getUser(): undefined ;

  ngOnInit() {  
    this.userSubscription = this.userService.userData.subscribe(
      (user) => { 
        this.user = user;
      },
      (err)=>console.log(err),
    )
    // this.particle()
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
  

  // particle(){
  //   let max_particles    = 500;
  //   let particles        = [];
  //   let frequency        = 10;
  //   let init_num         = max_particles;
  //   let max_time         = frequency*max_particles;
  //   let time_to_recreate = false;

  //   var container = document.getElementById('canvas');
  //   var tela = document.createElement('canvas');
  //   tela.width = container.offsetWidth;
  //   tela.height = container.offsetHeight;
  //   tela.setAttribute('style','position: absolute;top: 0;left:0;height:100%;width:100%;')
  //   container.appendChild(tela);
    
  //   var canvas = tela.getContext('2d');
    
  //   setTimeout(function(){
  //     time_to_recreate = true;
  //   }.bind(this), max_time)

  //   popolate(max_particles);
    
  //   function popolate(num){
  //     for (var i = 0; i < num; i++) {
  //       setTimeout(
  //         function(x){
  //           return function(){
  //             // Add particle
  //             particles.push(new Particle(canvas,container))
  //           };
  //         }(i)
  //         ,frequency*i);
  //     }
  //     return particles.length
  //   }

  //   function createSphera(){
  //     let radius = 180
  //     let center = {
  //       x: container.offsetWidth/2,
  //       y: container.offsetHeight/2
  //     }
  //   }

  //   function clear(){
  //     canvas.globalAlpha=0.08;
  //     canvas.fillStyle='#110031';
  //     canvas.fillRect(0, 0, tela.width, tela.height);
  //     canvas.globalAlpha=1;
  //   }

  //   function update(){
  //     particles = particles.filter(function(p) { return p.move() })
  //     // Recreate particles
  //     if(time_to_recreate){
  //       if(particles.length < init_num){ popolate(1);}
  //     }
  //     clear();
  //     requestAnimationFrame(update.bind(this))
  //   }

  //   update()
  // }
}
