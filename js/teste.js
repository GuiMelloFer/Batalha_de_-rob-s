var canvas = document.getElementById('minha-tela');
var ctx = canvas.getContext('2d');

const left = 37;
const up = 38;
const right = 39;
const down = 40;
const esq = 65;
const baixo = 83;
const cima = 87;
const dir = 68;

let moverLeft= false;
let moverRight= false;
let moverUp= false;
let moverDown= false;
let moverEsq= false;
let moverDir= false;
let moverCima= false;
let moverBaixo= false;
let batidas = 0;

const q1 = {
    x : 10,
    y : 300,
    w : 60,
    h : 60
}

const q2 = {
    x : 1275,
    y : 300,
    w : 60,
    h : 60
}

const vida1 = {
    x: 0,
    y: 20,
    w: 300,
    h: 30
}

const vida2 = {
    x: 0,
    y: 80,
    w: 300,
    h: 30
}

// const ob1 = {
//     X:600,
//     y:0,
//     w:30,
//     h:100
// }


function mover(){
    if (moverEsq) {
        q1.x-=5;
    }
    if (moverDir) {
        q1.x+=5;
    }
    if (moverCima) {
        q1.y-=5;
    }
    if (moverBaixo) {
        q1.y+=5;
    }

    if (moverLeft) {
        q2.x-=5;
    }
    if (moverRight) {
        q2.x+=5;
    }
    if (moverUp) {
        q2.y-=5;
    }
    if (moverDown) {
        q2.y+=5;
    }
    q1.x = Math.max(0, Math.min(canvas.width - q1.w, q1.x));
     q1.y = Math.max(0, Math.min(canvas.height - q1.h, q1.y));
     q2.x = Math.max(0, Math.min(canvas.width - q2.w, q2.x));
     q2.y = Math.max(0, Math.min(canvas.height - q2.h, q2.y));
}

function desenhaQuadrado(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //quadrados
    ctx.fillStyle = '#ADFF2F';
    ctx.fillRect(q1.x,q1.y,q1.w,q1.h);
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 3;
    ctx.strokeRect(q1.x,q1.y,q1.w,q1.h);

    ctx.fillStyle = '#20B2AA';
    ctx.fillRect(q2.x,q2.y,q2.w,q2.h);
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 3;
    ctx.strokeRect(q2.x,q2.y,q2.w,q2.h);

    //vidas
    ctx.fillStyle = '#ADFF2F';
    ctx.fillRect(vida1.x,vida1.y,vida1.w,vida1.h);
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1;
    ctx.strokeRect(vida1.x,vida1.y,vida1.w,vida1.h);
    ctx.fillStyle = '#000';
    ctx.font = "20px Arial";
    ctx.textBaseline = 'top';
    ctx.fillText(`Vida: ${Math.round(vida1.w)}`, vida1.x,vida1.y+5);

    ctx.fillStyle = '#20B2AA';
    ctx.fillRect(vida2.x,vida2.y,vida2.w,vida2.h);
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1;
    ctx.strokeRect(vida2.x,vida2.y,vida2.w,vida2.h);
    ctx.fillStyle = '#000';
    ctx.font = "20px Arial";
    ctx.textBaseline = 'top';
    ctx.fillText(`Vida: ${Math.round(vida2.w)}`, vida2.x,vida2.y+5);


    // //obstaculos
    // ctx.fillStyle = '#f00';
    // ctx.fillRect(ob1.x,ob1.y,ob1.w,ob1.h);
    // ctx.strokeStyle = '#000'
    // ctx.lineWidth = 1;
    // ctx.strokeRect(ob1.x,ob1.y,ob1.w,ob1.h);
}

window.addEventListener('keydown', pressionarTecla);
window.addEventListener('keyup', soltarTecla);

function pressionarTecla(tecla){
    let codigo = tecla.keyCode;
    
    if (codigo === left && codigo !== right) {
        moverLeft = true;
    }    
    if (codigo === right && codigo !== left) {
        moverRight = true;
    }    
    if (codigo === up && codigo !== down) {
        moverUp = true;
    }    
    if (codigo === down && codigo !== up) {
        moverDown = true;        
    }

    if (codigo === esq && codigo !== dir) {
        moverEsq = true;
    }    
    if (codigo === dir && codigo !== esq) {
        moverDir = true;
    }    
    if (codigo === cima && codigo !== baixo) {
        moverCima = true;
    }    
    if (codigo === baixo && codigo !== cima) {
        moverBaixo = true;        
    }

}


function soltarTecla(tecla){
    let codigo = tecla.keyCode;
    
    if (codigo === left && codigo !== right) {
        moverLeft = false;
    }    
    if (codigo === right && codigo !== left) {
        moverRight = false;
    }    
    if (codigo === up && codigo !== down) {
        moverUp = false;
    }    
    if (codigo === down && codigo !== up) {
        moverDown = false;        
    }

    if (codigo === esq && codigo !== dir) {
        moverEsq = false;
    }    
    if (codigo === dir && codigo !== esq) {
        moverDir = false;
    }    
    if (codigo === cima && codigo !== baixo) {
        moverCima = false;
    }    
    if (codigo === baixo && codigo !== cima) {
        moverBaixo = false;        
    }

}

function detectarColisao(){
    if(((q1.x + q1.w) > q2.x && q1.x < (q2.x + q2.w)) && ((q1.y + q1.h) > q2.y && q1.y < (q2.y + q2.h))){
            let perda1 = Math.floor(Math.random() * 20);
            let perda2 = Math.floor(Math.random() * 20);
            vida1.w = vida1.w - perda1;
            vida2.w = vida2.w - perda2;
            q1.x = 10;
            q1.y = 300;
            q1.w = 60;
            q1.h = 60;
            q2.x = 1275;
            q2.y = 300;
            q2.w = 60;
            q2.h = 60;
            
            batidas++; 
            if(batidas == 5){
                moverLeft= false;
                moverRight= false;
                moverUp= false;
                moverDown= false;
                moverEsq= false;
                moverDir= false;
                moverCima= false;
                moverBaixo= false;
                batidas=0;
                
                
               if(vida1.w>vida2.w){
                   alert('O robô verde ganhou!!');
                   vida1.x = 0;
                   vida1.y = 20;
                      vida1.w = 300;
                      vida1.h = 30;
                      vida2.x = 0;
                      vida2.y = 80;
                      vida2.w = 300;
                      vida2.h = 30;
                    
               }else{
                   alert('O robô azul ganhou!!');
                   vida1.x = 0;
                   vida1.y = 20;
                   vida1.w = 300;
                   vida1.h = 30;
                   vida2.x = 0;
                   vida2.y = 80;
                   vida2.w = 300;
                   vida2.h = 30;
               }
            }
        }

    //     if((q1.x + q1.w) >= 1300){
    //         moverDir = false;
    //     }if((q1.y+q1.h) >= 600){
    //         moverBaixo = false;
    //     }if(q1.x<=0){
    //         moverEsq = false;
    //     }if(q1.y<=0){
    //         moverCima = false;
    //     }
    // }
    }



function atualizarTela() {
    requestAnimationFrame(atualizarTela, canvas);
    mover();
    desenhaQuadrado();
    detectarColisao();
}

atualizarTela();
