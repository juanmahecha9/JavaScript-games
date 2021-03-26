document.addEventListener('keydown', keydown); /* Escuchar el evebti del teclado */

/* otras variables */
let anchoTubo = Math.floor((40 - 6) / 7);
let birdAlto = 2;
let birdAncho = 3;
let colorBird = 'yellow';
let colorPipe = 'green';
let colorBackground = 'black';

/* posiciones aleatorias */
function aleatorio(inferior, superior) {
    let numPosibilidades = superior - inferior; //cuantos numeros hay para generar
    let aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    //console.log(aleatorio+inferior)
    return inferior + aleatorio;
}

let state = {
    bird: {
        x: 3,
        y: 20,
        h: birdAlto,
        w: birdAncho,
        vy: 0,
        color: colorBird
    },
    pipes: [
        //  dibujo de un rectangulo con el cual: React(x,y,w,h,color), donde:
        //    1. x denota la posicion en el plano x (direccion horizontal) 
        //  2. w es el ancho de la barra (grosor del rectangulo)
        //3. y1 es la posicion inicial de la barra, en que parte del cuadrante inicia
        //4. y2 es la altura total, en que parte del cuadrante termina de graficarse
        //5, color es el color con ek que se pinta
        {
            x: 37,
            w: anchoTubo,
            y1: 0,
            y2: 6,
            color: colorPipe
        }
    ],
    time: 0,
}

function draw() {
    Rect(0, 0, 40, 40, colorBackground);
    Rect(state.bird.x, state.bird.y, state.bird.w, state.bird.h, state.bird.color);
    for (let i = 0; i <= state.pipes.length - 1; i++) {
        Rect(state.pipes[i].x, state.pipes[i].y1, state.pipes[i].w, state.pipes[i].y2, state.pipes[i].color);
    }
}

function colide() {
    // esperar x segundos y crear un nuevo pipe
    state.time++;

    if (state.time > 16) {
        state.time = 0;
        pipe1 = {
            x: 39,
            w: anchoTubo,
            y1: 0,
            y2: 10,
            color: colorPipe
        }
        /* pipe2 = {
            x: aleatorio(37, 9),
            w: anchoTubo,
            y1: aleatorio(22, 37),
            y2: 39,
            color: 'white'
        }  */
        state.pipes.push(pipe1);
        //state.pipes.push(pipe2);
    }
    //eliminar el pipe
    if (state.pipes[0].x < 0) {
        state.pipes.shift(); // eliminar el tubo
    }

    /* coliciones con los limites del tablero */
    if (state.bird.y <= 0) {
        state.bird.vy = 0.3
        state.bird.y = 1
    } else if (state.bird.y >= 39) {
        state.bird.vy = -.3
        state.bird.y = 38
    }

    /* colision con los tubos */
    for (i = 0; i < state.pipes.length; i++) {
        /* if (pipe.x > state.bird.x && pipe.x < (state.bird.x + state.bird.w)) {
            console.log('colision!')
        } */
        for(let j = state.pipes[i].y1; j<=state.pipes[i].y2; j++){
            /* crear otro ciclo for con el cual recorro la antura del tubo desde su origen hasta el final
            y dentro del ciclo if, recorro la altura y le sumo el conteo de veces que */
            if (state.pipes[i].x == state.bird.x && Math.round(state.bird.y) == state.pipes[i].y1 + j) {
                console.log(Math.round(state.bird.y))
            }
        }

    }

}

function update() {
    //dejar caer la pelota
    state.bird.y = state.bird.y + state.bird.vy;
    state.bird.vy = state.bird.vy + .2

    //mover la tuberia hacia la izquierda
    for (let i = 0; i <= state.pipes.length - 1; i++) {
        state.pipes[i].x = state.pipes[i].x - 1
    }
    colide()
    draw(); //dibujar
}

function keydown(evt) { /* movimientos por evento de teclas */
    key = evt.key;
    // console.log(key)
    if (key == " ") {
        // no le cambies la posicion, cambiale la velocidad
        state.bird.vy = state.bird.vy - 1;
    }
    draw();
};


ctx = canvas.getContext('2d');
scale = 15; /* escala del tablero */
nx = Math.floor(canvas.width / scale); /* cuantos pixeles caben en x */
ny = Math.floor(canvas.height / scale); /* cuantos pixeles caben en y  */
Rect = function (x, y, w, h, color) { /* dibujo del tablero, tamaño y color del canvas */
    ctx.fillStyle = color;
    ctx.fillRect(x * scale, y * scale, w * scale - 1, h * scale - 1) /* definir el tamaño del tablero */
};

//ciclo
function ciclo() {
    update();
    draw();
}

//llamar la funcion con un lapso de tiempo
setInterval(ciclo, 1000 / 10);