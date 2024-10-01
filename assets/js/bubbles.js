class Bubble{
    constructor(){
        this.r = Math.random() * 10 + 3;
        this.x = this.r + Math.random() * (canvas.width-2*this.r);
        this.y = this.r + Math.random() * (canvas.height-2*this.r);
        this.dx = SPEED * (Math.random()-0.5);
        this.dy = SPEED * (Math.random()-0.5);
        this.ddx = 0;
        this.ddy = 0;
    }

    update(){

        // update velocities

        this.dx += this.ddx;
        this.dy += this.ddy;

        this.ddx =0; 
        this.ddy =0; 


        // update positions
        let newx = this.x + this.dx;
        let newy = this.y + this.dy;

        if(newx<this.r || newx+this.r>canvas.width){
            this.dx *=-1;
            newx = this.x + this.dx;
        }
        if(newy<this.r || newy+this.r>canvas.height){
            this.dy *=-1;
            newy = this.y + this.dy;
        }

        this.x = newx;
        this.y = newy;

        // // drag
        if(this.dx > 1){
        this.dx *=0.95;
        this.dy *=0.95;
        }

    }
    addForce(fx, fy){
        this.ddx += fx/this.r;
        this.ddy += fy/this.r;
    }
    steerForce(dirx, diry){
        this.ddx += (dirx- this.dx) / this.r;
        this.ddy += (diry- this.dy)/this.r;
    }

    dist(other){
        let diffx = this.x - other.x;
        let diffy = this.y - other.y;
        let dist = Math.sqrt(diffx*diffx + diffy*diffy);
        return {dirx: diffx/dist, diry: diffy/dist, dist};
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}

function draw(bubbles){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i=0; i<bubbles.length; i++){
        ctx.lineWidth = 1;
        bubbles[i].draw();
        for(let j=i+1; j<bubbles.length; j++){
            let {dirx, diry, dist} = bubbles[i].dist(bubbles[j]);
            if (dist < DIST_DRAW){
                ctx.lineWidth = (DIST_DRAW-dist)*Math.min(bubbles[i].r, bubbles[j].r)/DIST_DRAW;
                ctx.beginPath();
                ctx.moveTo(bubbles[i].x, bubbles[i].y);
                ctx.lineTo(bubbles[j].x, bubbles[j].y);
                ctx.stroke();

                if (dist < 1.2*(bubbles[i].r + bubbles[j].r)){
                    bubbles[i].addForce(dirx*BOUNCE_FORCE, diry*BOUNCE_FORCE);
                    bubbles[j].addForce(-dirx*BOUNCE_FORCE, -diry*BOUNCE_FORCE);
                }
                // else{
                //     bubbles[i].steerForce(dirx*REPEL_FORCE, diry*REPEL_FORCE);
                //     bubbles[j].steerForce(-dirx*REPEL_FORCE, -diry*REPEL_FORCE);

                // }

            }else if (dist < DIST_ATTRACT){
                // bubbles[i].steerForce(-dirx*ATTRACT_FORCE, -diry*ATTRACT_FORCE);
                // bubbles[j].steerForce(dirx*ATTRACT_FORCE, diry*ATTRACT_FORCE);
            }
        }
    }
    // bubbles.forEach(bbl => {
    //     bbl.draw();

    //     bubbles.forEach(other =>{
    //         if(bbl.dist(other) < DIST_THRESHOLD){

    //             // draw line and start pushing away force
    //             bbl.addForce()

    //             ctx.beginPath();
    //             ctx.moveTo(bbl.x, bbl.y);
    //             ctx.lineTo(other.x, other.y);
    //             ctx.stroke();
    //         }
    //     })
        
    // });
}

function animate(bubbles){
    requestAnimationFrame(()=>{animate(bubbles);});
    bubbles.forEach(bbl=>{
        bbl.update(bubbles);
    })
    draw(bubbles);
}

let DIST_DRAW = 100;
let DIST_ATTRACT = 15000;
let SPEED = 0.5;
let ATTRACT_FORCE = 0.5;
let REPEL_FORCE = 0.05;
let BOUNCE_FORCE = 5;
let ctx;
let canvas;


window.addEventListener('DOMContentLoaded', () => {
    canvas = document.querySelector("canvas");

    ctx = canvas.getContext('2d');

    // setTimeout(()=>{
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        // change colour after size change
        ctx.strokeStyle = '#6bfff4';
        ctx.fillStyle = '#6bfff4';    
        

        let bubbles = [];
        for (let i = 0; i < 50; i++) {
            bubbles.push(new Bubble());
        }
        
        animate(bubbles);

    // }, 1);


    

    window.onresize = (e)=>{
        console.log(e);
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;


        ctx.strokeStyle = '#6bfff4';
        ctx.fillStyle = '#6bfff4';    

        bubbles.forEach(bbl => {
            if (bbl.x > canvas.width){
                bbl.x = canvas.width - bbl.r;
            }
            if (bbl.y > canvas.height){
                bbl.y = canvas.height - bbl.r;
            }
        });
    }
});
