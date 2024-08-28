class Bubble{
    constructor(){
        this.r = Math.random() * 3 + 1;
        this.x = this.r + Math.random() * (canvas.width-2*this.r);
        this.y = this.r + Math.random() * (canvas.height-2*this.r);
        this.dx = SPEED * (Math.random()-0.5);
        this.dy = SPEED * (Math.random()-0.5);
    }

    update(){
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
    }

    dist(other){
        let distx = this.x - other.x;
        let disty = this.y - other.y;
        return Math.sqrt(distx*distx + disty*disty);
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
    bubbles.forEach(bbl => {
        bbl.draw();

        bubbles.forEach(other =>{
            if(bbl.dist(other) < DIST_THRESHOLD){
                ctx.beginPath();
                ctx.moveTo(bbl.x, bbl.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        })
        
    });
}

function animate(bubbles){
    requestAnimationFrame(()=>{animate(bubbles);});
    bubbles.forEach(bbl=>{
        bbl.update(bubbles);
    })
    draw(bubbles);
}

let DIST_THRESHOLD = 50;
let SPEED = 0.5;
let ctx;
let canvas;


window.addEventListener('DOMContentLoaded', () => {
    canvas = document.querySelector("canvas");

    ctx = canvas.getContext('2d');
    setTimeout(()=>{
        ctx.strokeStyle = '#6bfff4';
        ctx.fillStyle = '#6bfff4';    
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;    
    }, 100);


    let bubbles = [];
    for (let i = 0; i < 100; i++) {
        bubbles.push(new Bubble());
    }

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
                bbl.x = canvas.height - bbl.r;
            }
        });
    }


    // let prevScrollPosition = window.scrollY;
    // let scrolling  = false;
    // window.onscroll = (ev)=>{
    //     let scrollPosition = window.scrollY;

    //     if (!scrolling) {
    //         window.requestAnimationFrame(() => {

    //             let dy = scrollPosition - prevScrollPosition;
    //             dy *= 0.01;
    //             console.log(dy);
    //             bubbles.forEach(bbl=>{
    //                 bbl.y += dy;
    //             });

    //     scrolling = false;
    //     });
    //     scrolling = true;
    // }

    // }


    animate(bubbles);


});
