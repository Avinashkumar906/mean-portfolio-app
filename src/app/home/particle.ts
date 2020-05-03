export class Particle{
    color: any;
    canvas: any;
    h: number;
    w: number;
    a: number;
    s: number;
    y: number;
    x: number;
    radius: number;
    progress: number;
    center: { x: number; y: number; };
    point_of_attraction: { x: number; y: number; };

    constructor(canvas,container){
        let random = Math.random()
        this.progress = 0;
        this.canvas = canvas;
        this.center = {
          x: container.offsetWidth/2,
          y: container.offsetHeight/2
        }
        this.point_of_attraction = {
          x: container.offsetWidth/2,
          y: container.offsetHeight/2
        }
    
    
    
        if( Math.random() > 0.5){
          this.x = window.innerWidth*Math.random()
          this.y = Math.random() > 0.5 ? -Math.random() - 100 : window.innerHeight + Math.random() + 100
        }else{
          this.x = Math.random() > 0.5 ? -Math.random() - 100 : window.innerWidth + Math.random() + 100
          this.y = window.innerHeight*Math.random()
    
        }
    
        this.s = Math.random() * 2;
        this.a = 0
        this.w = window.innerWidth
        this.h = window.innerHeight
        this.radius = random > .2 ? Math.random()*1 : Math.random()*3
        this.color  = random > .2 ? "#694FB9" : "#9B0127"
        this.radius = random > .8 ? Math.random()*2.2 : this.radius
        this.color  = random > .8 ? "#3CFBFF" : this.color
      }
    
      calculateDistance(v1, v2){
        let x = Math.abs(v1.x - v2.x);
        let y = Math.abs(v1.y - v2.y);
        return Math.sqrt((x * x) + (y * y));
      }
    
      render(){
        this.canvas.beginPath();
        this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.canvas.lineWidth = 2;
        this.canvas.fillStyle = this.color;
        this.canvas.fill();
        this.canvas.closePath();
      }
    
      move(){
    
        let p1 = {
          x: this.x,
          y: this.y
        }
    
        let distance = this.calculateDistance(p1, this.point_of_attraction)
        let force = Math.max(100, (1 + distance));
    
        let attr_x = (this.point_of_attraction.x - this.x)/force;
        let attr_y = (this.point_of_attraction.y - this.y)/force;
    
        this.x += (Math.cos(this.a) * (this.s)) + attr_x;
        this.y += (Math.sin(this.a) * (this.s)) + attr_y;
        this.a += (Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2);
    
        if( distance < (30 + Math.random()*100) ){
          return false;
        }
    
        this.render();
        this.progress++;
        return true;
      }
}